"use client";

import * as React from "react";

const STORAGE_KEY = "altfreestack:stack-builder:v1";
const DEFAULT_STACK_ID = "default";

export interface BuilderStack {
  id: string;
  name: string;
  /** slugs de OpenSourceTool, en el orden en que se añadieron. */
  toolSlugs: string[];
  createdAt: number;
  updatedAt: number;
}

interface StoredState {
  activeStackId: string;
  stacks: BuilderStack[];
}

function makeDefaultStack(name: string): BuilderStack {
  const now = Date.now();
  return { id: DEFAULT_STACK_ID, name, toolSlugs: [], createdAt: now, updatedAt: now };
}

function makeDefaultState(defaultStackName: string): StoredState {
  const stack = makeDefaultStack(defaultStackName);
  return { activeStackId: stack.id, stacks: [stack] };
}

function genId(): string {
  return `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Store externo mínimo (patrón `useSyncExternalStore`) en vez de cargar
 * localStorage dentro de un `useEffect` con su propio `setState`: así el
 * primer render del cliente coincide exactamente con el HTML del servidor
 * (snapshot por defecto), y solo después de hidratar se lee el valor real de
 * localStorage — sin el "cascading render" que un `setState` en un efecto
 * dispararía en el primer paint.
 */
class StackBuilderStore {
  private state: StoredState | null = null;
  private serverState: StoredState | null = null;
  private listeners = new Set<() => void>();
  private defaultStackName = "My Stack";

  setDefaultStackName(name: string) {
    this.defaultStackName = name;
  }

  private load(): StoredState {
    if (typeof window === "undefined") return makeDefaultState(this.defaultStackName);
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return makeDefaultState(this.defaultStackName);
      const parsed = JSON.parse(raw) as StoredState;
      if (!parsed.stacks || parsed.stacks.length === 0) return makeDefaultState(this.defaultStackName);
      return parsed;
    } catch {
      return makeDefaultState(this.defaultStackName);
    }
  }

  private persist() {
    if (!this.state) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      // localStorage puede no estar disponible (modo privado, cuota llena...) —
      // el stack sigue funcionando en memoria durante la sesión, solo no persiste.
    }
  }

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  /** Snapshot para el cliente ya montado — lee (y cachea) localStorage la primera vez que se pide. */
  getSnapshot = (): StoredState => {
    if (!this.state) this.state = this.load();
    return this.state;
  };

  /**
   * Snapshot para SSR y para el primer render del cliente antes de hidratar
   * — nunca toca localStorage. Cacheado: useSyncExternalStore exige que este
   * snapshot mantenga la misma referencia entre llamadas mientras nada haya
   * cambiado, o React lo interpreta como un cambio constante y advierte de
   * un bucle infinito.
   */
  getServerSnapshot = (): StoredState => {
    if (!this.serverState) this.serverState = makeDefaultState(this.defaultStackName);
    return this.serverState;
  };

  private update(updater: (prev: StoredState) => StoredState) {
    const prev = this.state ?? this.load();
    this.state = updater(prev);
    this.persist();
    for (const listener of this.listeners) listener();
  }

  setActiveStackId(id: string) {
    this.update((prev) => (prev.stacks.some((s) => s.id === id) ? { ...prev, activeStackId: id } : prev));
  }

  createStack(name: string): string {
    const id = genId();
    const now = Date.now();
    this.update((prev) => ({
      activeStackId: id,
      stacks: [...prev.stacks, { id, name, toolSlugs: [], createdAt: now, updatedAt: now }],
    }));
    return id;
  }

  renameStack(id: string, name: string) {
    this.update((prev) => ({
      ...prev,
      stacks: prev.stacks.map((s) => (s.id === id ? { ...s, name, updatedAt: Date.now() } : s)),
    }));
  }

  deleteStack(id: string) {
    this.update((prev) => {
      const remaining = prev.stacks.filter((s) => s.id !== id);
      if (remaining.length === 0) {
        const fresh = makeDefaultStack(this.defaultStackName);
        return { activeStackId: fresh.id, stacks: [fresh] };
      }
      return {
        activeStackId: prev.activeStackId === id ? remaining[0].id : prev.activeStackId,
        stacks: remaining,
      };
    });
  }

  addTool(stackId: string, toolSlug: string) {
    this.update((prev) => ({
      ...prev,
      stacks: prev.stacks.map((s) =>
        s.id === stackId && !s.toolSlugs.includes(toolSlug)
          ? { ...s, toolSlugs: [...s.toolSlugs, toolSlug], updatedAt: Date.now() }
          : s
      ),
    }));
  }

  removeTool(stackId: string, toolSlug: string) {
    this.update((prev) => ({
      ...prev,
      stacks: prev.stacks.map((s) =>
        s.id === stackId ? { ...s, toolSlugs: s.toolSlugs.filter((slug) => slug !== toolSlug), updatedAt: Date.now() } : s
      ),
    }));
  }

  replaceActiveStackTools(toolSlugs: string[]) {
    this.update((prev) => ({
      ...prev,
      stacks: prev.stacks.map((s) => (s.id === prev.activeStackId ? { ...s, toolSlugs, updatedAt: Date.now() } : s)),
    }));
  }
}

const store = new StackBuilderStore();

interface StackBuilderContextValue {
  /** false hasta que el snapshot real (post-hidratación) sustituye al snapshot por defecto del servidor. */
  hydrated: boolean;
  stacks: BuilderStack[];
  activeStack: BuilderStack;
  activeStackId: string;
  setActiveStackId: (id: string) => void;
  createStack: (name: string) => string;
  renameStack: (id: string, name: string) => void;
  deleteStack: (id: string) => void;
  addTool: (stackId: string, toolSlug: string) => void;
  removeTool: (stackId: string, toolSlug: string) => void;
  toggleTool: (toolSlug: string) => void;
  isInActiveStack: (toolSlug: string) => boolean;
  /** Reemplaza el stack activo por una lista concreta de slugs (usado al importar un stack compartido por URL). */
  replaceActiveStackTools: (toolSlugs: string[]) => void;
}

const StackBuilderContext = React.createContext<StackBuilderContextValue | null>(null);

export function StackBuilderProvider({ children, defaultStackName }: { children: React.ReactNode; defaultStackName: string }) {
  store.setDefaultStackName(defaultStackName);
  const state = React.useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const hydrated = React.useSyncExternalStore(
    store.subscribe,
    () => true,
    () => false
  );

  const activeStack = state.stacks.find((s) => s.id === state.activeStackId) ?? state.stacks[0];

  const toggleTool = React.useCallback((toolSlug: string) => {
    const current = store.getSnapshot();
    const stack = current.stacks.find((s) => s.id === current.activeStackId) ?? current.stacks[0];
    if (stack.toolSlugs.includes(toolSlug)) store.removeTool(stack.id, toolSlug);
    else store.addTool(stack.id, toolSlug);
  }, []);

  const isInActiveStack = React.useCallback((toolSlug: string) => activeStack.toolSlugs.includes(toolSlug), [activeStack]);

  const value: StackBuilderContextValue = {
    hydrated,
    stacks: state.stacks,
    activeStack,
    activeStackId: state.activeStackId,
    setActiveStackId: React.useCallback((id: string) => store.setActiveStackId(id), []),
    createStack: React.useCallback((name: string) => store.createStack(name), []),
    renameStack: React.useCallback((id: string, name: string) => store.renameStack(id, name), []),
    deleteStack: React.useCallback((id: string) => store.deleteStack(id), []),
    addTool: React.useCallback((stackId: string, toolSlug: string) => store.addTool(stackId, toolSlug), []),
    removeTool: React.useCallback((stackId: string, toolSlug: string) => store.removeTool(stackId, toolSlug), []),
    toggleTool,
    isInActiveStack,
    replaceActiveStackTools: React.useCallback((toolSlugs: string[]) => store.replaceActiveStackTools(toolSlugs), []),
  };

  return <StackBuilderContext.Provider value={value}>{children}</StackBuilderContext.Provider>;
}

export function useStackBuilder(): StackBuilderContextValue {
  const ctx = React.useContext(StackBuilderContext);
  if (!ctx) throw new Error("useStackBuilder must be used within a StackBuilderProvider");
  return ctx;
}
