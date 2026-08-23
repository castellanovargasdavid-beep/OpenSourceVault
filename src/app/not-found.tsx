import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-medium text-emerald-600">404</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">No encontramos esa página</h1>
      <p className="mt-4 text-slate-600">
        Puede que la herramienta que buscas todavía no esté en nuestro catálogo, o el enlace esté
        roto.
      </p>
      <Link href="/" className={buttonVariants({ className: "mt-8" })}>
        Volver al inicio
      </Link>
    </div>
  );
}
