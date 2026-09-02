import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  UserPlus,
  Rocket,
  Terminal,
  Package,
  FileCode,
  CheckCircle2,
  Globe,
  RefreshCw,
  Clock,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  FolderPlus,
  Power,
  AlertTriangle,
  MousePointerClick,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import { getDeployGuideHref } from "@/lib/routes";
import type { Locale } from "@/i18n/config";

export type HostingProviderId = "digitalocean" | "vultr" | "railway";

interface GuideStep {
  icon: LucideIcon;
  title: string;
  time: string;
  body: React.ReactNode;
}

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-200">
    <code>{children}</code>
  </pre>
);

const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">{children}</code>
);

const Callout = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-2 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-800">
    <AlertTriangle size={14} className="mt-0.5 shrink-0" />
    <span>{children}</span>
  </div>
);

// ---------------------------------------------------------------------------
// DigitalOcean
// ---------------------------------------------------------------------------

const digitaloceanEs: GuideStep[] = [
  {
    icon: UserPlus,
    title: "1. Crea tu cuenta en DigitalOcean",
    time: "~3 min",
    body: (
      <>
        <p>
          Antes de empezar necesitas: una cuenta en DigitalOcean (suelen ofrecer créditos gratuitos de bienvenida para empezar), tu
          ordenador (Windows, Mac o Linux) y la ficha de la herramienta que quieras instalar abierta en otra pestaña de tu navegador
          en AltFreeStack.
        </p>
        <p className="mt-2">
          Entra en tu navegador a digitalocean.com. Arriba a la derecha, haz clic en <strong>Sign Up</strong>. Elige registrarte con
          Google, GitHub o correo electrónico y confirma el enlace de verificación en tu bandeja de entrada.
        </p>
        <p className="mt-2">
          Añade un método de pago o PayPal — no te cobran al instante, solo facturan por las horas que el servidor esté encendido.
        </p>
      </>
    ),
  },
  {
    icon: Rocket,
    title: "2. Crea tu Droplet (servidor)",
    time: "~4 min",
    body: (
      <>
        <p>
          En el panel principal de DigitalOcean, haz clic arriba a la derecha en el botón verde <strong>Create</strong> y selecciona{" "}
          <strong>Droplets</strong>.
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Choose Region:</strong> elige el centro de datos más cercano a ti o a tus usuarios (ej. Frankfurt, Ámsterdam,
            Nueva York).
          </li>
          <li>
            <strong>Choose an Image:</strong> haz clic en la pestaña <strong>Marketplace</strong> (esto es dentro de DigitalOcean, no
            toques AltFreeStack aún). En la barra de búsqueda escribe <InlineCode>Docker</InlineCode>. Verás una tarjeta que dice{" "}
            <em>Docker on Ubuntu</em> — haz clic sobre ella para que quede marcada con un recuadro azul (así el servidor ya viene con
            Docker de fábrica).
          </li>
          <li>
            <strong>Droplet Type / CPU:</strong> elige la pestaña <strong>Shared CPU</strong> y la opción <strong>Basic</strong>. En
            la lista de precios, pulsa en la flecha izquierda o en <strong>Regular</strong> hasta ver la opción económica: $6/mes (1
            GB RAM / 1 vCPU / 25 GB SSD).
          </li>
          <li>
            <strong>Authentication Method:</strong> selecciona la casilla <strong>Password</strong>. Escribe una contraseña fuerte
            para el usuario root (mayúsculas, números y al menos 8 caracteres) y anótala en un bloc de notas — la necesitarás en el
            paso 4.
          </li>
        </ul>
        <p className="mt-2">
          Baja al final de la página, ignora las opciones adicionales por ahora y haz clic en el botón verde grande{" "}
          <strong>Create Droplet</strong>. Espera 1 minuto a que la barra de progreso se complete y aparezca la dirección IP junto al
          nombre de tu servidor.
        </p>
      </>
    ),
  },
  {
    icon: KeyRound,
    title: "3. Copia la IP de tu Droplet",
    time: "~1 min",
    body: (
      <>
        <p>
          En el listado de Droplets verás una columna que dice <strong>IPv4</strong>. Pon el ratón sobre los 4 números separados por
          puntos (ej. <InlineCode>165.22.10.45</InlineCode>) y haz clic en <strong>Copy</strong>. Esta es la IP que usarás en toda la
          guía.
        </p>
      </>
    ),
  },
  {
    icon: Terminal,
    title: "4. Conéctate desde tu ordenador",
    time: "~3 min",
    body: (
      <>
        <p>Abre la consola en tu equipo:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <strong>En Windows:</strong> pulsa la tecla Windows, escribe <InlineCode>cmd</InlineCode> o &quot;Terminal&quot; y
            presiona Enter.
          </li>
          <li>
            <strong>En Mac:</strong> pulsa Comando + Espacio, escribe &quot;Terminal&quot; y presiona Enter.
          </li>
        </ul>
        <p className="mt-3">Escribe el comando sustituyendo TU_IP por la IP que copiaste:</p>
        <CodeBlock>ssh root@TU_IP</CodeBlock>
        <p className="mt-2">
          (Ejemplo real: <InlineCode>ssh root@165.22.10.45</InlineCode>) y pulsa Enter. Si te aparece una pregunta en inglés con
          (yes/no), escribe <InlineCode>yes</InlineCode> y presiona Enter. Te pedirá <InlineCode>password:</InlineCode> — pega la
          contraseña que definiste en el paso 2 (en Windows se pega con clic derecho; en Mac con Comando + V) y pulsa Enter.
        </p>
        <Callout>
          Recuerda que la consola no moverá el cursor ni mostrará asteriscos al pegar la contraseña. Parece que no escribe, pero sí
          lo hace — pégala una sola vez y dale a Enter.
        </Callout>
        <p className="mt-2">
          Al ver el mensaje <InlineCode>root@ubuntu-docker:~#</InlineCode>, ya estás conectado a DigitalOcean.
        </p>
      </>
    ),
  },
  {
    icon: FolderPlus,
    title: "5. Crea la carpeta de trabajo",
    time: "~1 min",
    body: (
      <>
        <p>En esa misma ventana de consola, pega esto y pulsa Enter:</p>
        <CodeBlock>mkdir app && cd app</CodeBlock>
        <p className="mt-2">Esto crea la carpeta app y te coloca dentro de ella.</p>
      </>
    ),
  },
  {
    icon: FileCode,
    title: "6. Crea el archivo y pega el código de AltFreeStack",
    time: "~3 min",
    body: (
      <>
        <p>En la consola, copia, pega y pulsa Enter:</p>
        <CodeBlock>nano docker-compose.yml</CodeBlock>
        <p className="mt-2">
          Se abrirá una pantalla negra vacía. Ve a la pestaña de AltFreeStack, busca tu herramienta y haz clic en{" "}
          <strong>Copiar docker-compose.yml</strong>. Vuelve a tu terminal y pega el contenido (clic derecho en Windows o Comando + V
          en Mac).
        </p>
        <p className="mt-2">
          <strong>Configura tus contraseñas:</strong> revisa las líneas que dicen <InlineCode># CAMBIAR</InlineCode> o{" "}
          <InlineCode>change-me</InlineCode>, desplázate con las flechas del teclado y cámbialas por contraseñas seguras inventadas
          por ti (o generadas con el botón &quot;Generar secretos seguros&quot; de la ficha de la herramienta).
        </p>
        <p className="mt-2">
          <strong>Guardar y salir:</strong> pulsa <InlineCode>Ctrl + O</InlineCode> y luego Enter (guarda el archivo). Pulsa{" "}
          <InlineCode>Ctrl + X</InlineCode> (sale del editor y vuelve a la consola normal).
        </p>
      </>
    ),
  },
  {
    icon: Power,
    title: "7. Enciende la herramienta",
    time: "~2 min",
    body: (
      <>
        <p>En la misma consola, copia y pega:</p>
        <CodeBlock>docker compose up -d</CodeBlock>
        <p className="mt-2">
          Presiona Enter. El servidor descargará e iniciará todo automáticamente (verás <InlineCode>Pulling</InlineCode>,{" "}
          <InlineCode>Downloaded</InlineCode>, <InlineCode>Started</InlineCode>). Cuando vuelva a salir la línea{" "}
          <InlineCode>root@...:~/app#</InlineCode>, la app estará encendida.
        </p>
      </>
    ),
  },
  {
    icon: Globe,
    title: "8. Abre tu herramienta en el navegador",
    time: "~1 min",
    body: (
      <>
        <p>Abre tu navegador web y escribe en la barra de direcciones:</p>
        <CodeBlock>http://TU_IP:PUERTO</CodeBlock>
        <p className="mt-2">
          Sustituye TU_IP por la IP de tu Droplet y PUERTO por el número indicado en la ficha de AltFreeStack (ej.{" "}
          <InlineCode>http://165.22.10.45:3000</InlineCode>). Pulsa Enter y verás la pantalla de configuración inicial de tu
          herramienta.
        </p>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: "¿Cómo gestionarla en el futuro?",
    time: "recurrente",
    body: (
      <>
        <p>
          Si algún día necesitas hacer mantenimiento, conéctate como en el paso 4, entra a la carpeta (<InlineCode>cd app</InlineCode>
          ) y usa estos comandos:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            Ver si sigue funcionando o revisar errores: <InlineCode>docker compose ps</InlineCode> o{" "}
            <InlineCode>docker compose logs -f</InlineCode>
          </li>
          <li>
            Apagar la herramienta: <InlineCode>docker compose down</InlineCode>
          </li>
          <li>
            Actualizar a la versión más reciente: <InlineCode>docker compose pull && docker compose up -d</InlineCode>
          </li>
        </ul>
      </>
    ),
  },
];

const digitaloceanEn: GuideStep[] = [
  {
    icon: UserPlus,
    title: "1. Create your DigitalOcean account",
    time: "~3 min",
    body: (
      <>
        <p>
          Before you start you need: a DigitalOcean account (they often offer free welcome credit to get started), your computer
          (Windows, Mac or Linux), and the tool&apos;s page open in another browser tab on AltFreeStack.
        </p>
        <p className="mt-2">
          Go to digitalocean.com in your browser. In the top right, click <strong>Sign Up</strong>. Choose to sign up with Google,
          GitHub or email, and confirm the verification link in your inbox.
        </p>
        <p className="mt-2">
          Add a payment method or PayPal — you&apos;re not charged instantly, they only bill for the hours your server is running.
        </p>
      </>
    ),
  },
  {
    icon: Rocket,
    title: "2. Create your Droplet (server)",
    time: "~4 min",
    body: (
      <>
        <p>
          On DigitalOcean&apos;s main dashboard, click the green <strong>Create</strong> button in the top right and pick{" "}
          <strong>Droplets</strong>.
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Choose Region:</strong> pick the data center closest to you or your users (e.g. Frankfurt, Amsterdam, New York).
          </li>
          <li>
            <strong>Choose an Image:</strong> click the <strong>Marketplace</strong> tab (this is inside DigitalOcean, not
            AltFreeStack yet). In the search bar type <InlineCode>Docker</InlineCode>. You&apos;ll see a card that says{" "}
            <em>Docker on Ubuntu</em> — click it so it gets marked with a blue outline (this way the server ships with Docker
            pre-installed).
          </li>
          <li>
            <strong>Droplet Type / CPU:</strong> pick the <strong>Shared CPU</strong> tab and the <strong>Basic</strong> option. In
            the pricing list, click the left arrow or <strong>Regular</strong> until you see the cheap option: $6/mo (1 GB RAM / 1
            vCPU / 25 GB SSD).
          </li>
          <li>
            <strong>Authentication Method:</strong> select the <strong>Password</strong> checkbox. Type a strong password for the
            root user (uppercase letters, numbers and at least 8 characters) and write it down — you&apos;ll need it in step 4.
          </li>
        </ul>
        <p className="mt-2">
          Scroll to the bottom of the page, ignore the extra options for now, and click the large green <strong>Create Droplet</strong>{" "}
          button. Wait about a minute for the progress bar to finish and the IP address to appear next to your server&apos;s name.
        </p>
      </>
    ),
  },
  {
    icon: KeyRound,
    title: "3. Copy your Droplet's IP",
    time: "~1 min",
    body: (
      <>
        <p>
          In the Droplets list you&apos;ll see a column labeled <strong>IPv4</strong>. Hover over the 4 numbers separated by dots
          (e.g. <InlineCode>165.22.10.45</InlineCode>) and click <strong>Copy</strong>. This is the IP you&apos;ll use throughout the
          guide.
        </p>
      </>
    ),
  },
  {
    icon: Terminal,
    title: "4. Connect from your computer",
    time: "~3 min",
    body: (
      <>
        <p>Open the console on your machine:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <strong>On Windows:</strong> press the Windows key, type <InlineCode>cmd</InlineCode> or &quot;Terminal&quot; and press
            Enter.
          </li>
          <li>
            <strong>On Mac:</strong> press Cmd + Space, type &quot;Terminal&quot; and press Enter.
          </li>
        </ul>
        <p className="mt-3">Type the command, replacing YOUR_IP with the IP you copied:</p>
        <CodeBlock>ssh root@YOUR_IP</CodeBlock>
        <p className="mt-2">
          (Real example: <InlineCode>ssh root@165.22.10.45</InlineCode>) and press Enter. If you&apos;re asked a (yes/no) question,
          type <InlineCode>yes</InlineCode> and press Enter. It&apos;ll prompt for <InlineCode>password:</InlineCode> — paste the
          password you set in step 2 (right-click to paste on Windows; Cmd + V on Mac) and press Enter.
        </p>
        <Callout>
          Remember the console won&apos;t move the cursor or show asterisks while you paste the password. It looks like nothing is
          being typed, but it is — paste it once and press Enter.
        </Callout>
        <p className="mt-2">
          Once you see <InlineCode>root@ubuntu-docker:~#</InlineCode>, you&apos;re connected to DigitalOcean.
        </p>
      </>
    ),
  },
  {
    icon: FolderPlus,
    title: "5. Create the working folder",
    time: "~1 min",
    body: (
      <>
        <p>In that same console window, paste this and press Enter:</p>
        <CodeBlock>mkdir app && cd app</CodeBlock>
        <p className="mt-2">This creates the app folder and puts you inside it.</p>
      </>
    ),
  },
  {
    icon: FileCode,
    title: "6. Create the file and paste AltFreeStack's code",
    time: "~3 min",
    body: (
      <>
        <p>In the console, copy, paste and press Enter:</p>
        <CodeBlock>nano docker-compose.yml</CodeBlock>
        <p className="mt-2">
          An empty black screen will open. Go to the AltFreeStack tab, find your tool, and click{" "}
          <strong>Copy docker-compose.yml</strong>. Back in your terminal, paste the content (right-click on Windows or Cmd + V on
          Mac).
        </p>
        <p className="mt-2">
          <strong>Set your passwords:</strong> look for lines marked <InlineCode># CHANGE-ME</InlineCode> or{" "}
          <InlineCode>change-me</InlineCode>, use the arrow keys to move there, and replace them with real, secure passwords (or
          generate one with the &quot;Generate secure secrets&quot; button on the tool&apos;s page).
        </p>
        <p className="mt-2">
          <strong>Save and exit:</strong> press <InlineCode>Ctrl + O</InlineCode> then Enter (saves the file). Press{" "}
          <InlineCode>Ctrl + X</InlineCode> (exits the editor back to the regular console).
        </p>
      </>
    ),
  },
  {
    icon: Power,
    title: "7. Start the tool",
    time: "~2 min",
    body: (
      <>
        <p>In the same console, copy and paste:</p>
        <CodeBlock>docker compose up -d</CodeBlock>
        <p className="mt-2">
          Press Enter. The server will download and start everything automatically (you&apos;ll see <InlineCode>Pulling</InlineCode>,{" "}
          <InlineCode>Downloaded</InlineCode>, <InlineCode>Started</InlineCode>). Once the line{" "}
          <InlineCode>root@...:~/app#</InlineCode> comes back, the app is running.
        </p>
      </>
    ),
  },
  {
    icon: Globe,
    title: "8. Open your tool in the browser",
    time: "~1 min",
    body: (
      <>
        <p>Open your web browser and type in the address bar:</p>
        <CodeBlock>http://YOUR_IP:PORT</CodeBlock>
        <p className="mt-2">
          Replace YOUR_IP with your Droplet&apos;s IP and PORT with the number shown on the AltFreeStack tool page (e.g.{" "}
          <InlineCode>http://165.22.10.45:3000</InlineCode>). Press Enter and you&apos;ll see your tool&apos;s initial setup screen.
        </p>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: "How do you manage it going forward?",
    time: "recurring",
    body: (
      <>
        <p>
          If you ever need to do maintenance, connect the same way as step 4, go into the folder (<InlineCode>cd app</InlineCode>)
          and use these commands:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            Check it&apos;s running or look at errors: <InlineCode>docker compose ps</InlineCode> or{" "}
            <InlineCode>docker compose logs -f</InlineCode>
          </li>
          <li>
            Turn the tool off: <InlineCode>docker compose down</InlineCode>
          </li>
          <li>
            Update to the latest version: <InlineCode>docker compose pull && docker compose up -d</InlineCode>
          </li>
        </ul>
      </>
    ),
  },
];

// ---------------------------------------------------------------------------
// Vultr
// ---------------------------------------------------------------------------

const vultrEs: GuideStep[] = [
  {
    icon: UserPlus,
    title: "1. Crea tu cuenta en Vultr",
    time: "~3 min",
    body: (
      <>
        <p>
          Antes de empezar necesitas solo 3 cosas: una tarjeta o cuenta PayPal para registrarte en Vultr, tu ordenador (Windows, Mac
          o Linux) y la ficha de la herramienta que quieras instalar abierta en otra pestaña de tu navegador en AltFreeStack.
        </p>
        <p className="mt-2">
          Entra en tu navegador a vultr.com. Arriba a la derecha, haz clic en el botón azul <strong>Sign Up</strong>. Escribe tu
          email y define una contraseña (o haz clic en <em>Continue with Google/GitHub</em>). Ve a tu bandeja de correo, abre el
          email de Vultr y haz clic en el enlace para verificar la cuenta.
        </p>
        <p className="mt-2">
          Regresa a Vultr y añade un método de pago. No te cobrarán nada en este instante — solo se tarifica el tiempo que tengas un
          servidor encendido, calculándose por céntimos al día.
        </p>
      </>
    ),
  },
  {
    icon: Rocket,
    title: "2. Encarga tu servidor",
    time: "~4 min",
    body: (
      <>
        <p>
          En el panel principal de Vultr, pulsa en el menú lateral en <strong>Deploy</strong> o en el botón azul{" "}
          <strong>+ Deploy Server</strong> (arriba a la derecha). Selecciona la opción <strong>Cloud Compute – Shared CPU</strong>.
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Location:</strong> elige la bandera de la ciudad más cercana a ti o a tus visitantes (ej. Madrid, Frankfurt,
            Miami). Cuanto más cerca esté, menor será la latencia.
          </li>
          <li>
            <strong>Server Image:</strong> verás varias pestañas horizontales. Haz clic en la pestaña{" "}
            <strong>Marketplace Apps</strong> (no toques nada de AltFreeStack todavía; esto es dentro de la web de Vultr). En la
            barra de búsqueda de esa sección escribe <InlineCode>Docker</InlineCode>. Verás una tarjeta con el icono de una ballena
            azul que dice <em>Docker on Ubuntu</em> — haz clic sobre esa tarjeta, quedará seleccionada con un borde azul. Así el
            servidor trae Docker preinstalado y no tienes que pelearte con comandos de instalación.
          </li>
          <li>
            <strong>Server Size:</strong> haz clic en la pestaña <strong>Regular Performance</strong>. Marca la opción económica:
            $6/mes (1 vCPU / 1 GB RAM / 25 GB SSD) — es más que suficiente para correr la mayoría de herramientas del catálogo.
          </li>
        </ul>
        <p className="mt-2">
          Baja hasta el final de la página (ignora las opciones opcionales de VPC o Firewall por ahora) y haz clic en el botón azul{" "}
          <strong>Deploy Now</strong>. En tu lista de productos verás tu nuevo servidor en estado <em>Installing...</em>. Espera entre
          1 y 2 minutos hasta que cambie a verde con la palabra <strong>Running</strong>.
        </p>
      </>
    ),
  },
  {
    icon: KeyRound,
    title: "3. Copia tus credenciales de acceso",
    time: "~1 min",
    body: (
      <>
        <p>
          Haz clic directamente sobre el nombre de tu servidor en la lista para abrir su panel de detalles. Localiza estos dos
          campos y anótalos o déjalos a mano:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>IP Address:</strong> una secuencia de 4 números separados por puntos (ej. <InlineCode>149.28.45.12</InlineCode>).
            Haz clic en el icono de copiar a su lado — esta es la IP que usarás en toda la guía.
          </li>
          <li>
            <strong>Password:</strong> al lado de la palabra Password, haz clic en el icono del ojo para visualizarla y luego en el
            icono de copiar.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Terminal,
    title: "4. Conéctate al servidor desde tu ordenador",
    time: "~3 min",
    body: (
      <>
        <p>Abre la consola/terminal de tu sistema:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <strong>En Windows:</strong> pulsa la tecla Windows, escribe <InlineCode>cmd</InlineCode> (o Terminal) y presiona Enter.
          </li>
          <li>
            <strong>En Mac:</strong> pulsa Comando + Espacio, escribe Terminal y presiona Enter.
          </li>
        </ul>
        <p className="mt-3">En esa ventana negra, escribe exactamente lo siguiente, sustituyendo TU_IP por los números que copiaste:</p>
        <CodeBlock>ssh root@TU_IP</CodeBlock>
        <p className="mt-2">
          (Ejemplo real: <InlineCode>ssh root@149.28.45.12</InlineCode>) y presiona Enter. ¿Aparece un mensaje en inglés preguntando
          (yes/no/[fingerprint])? Escribe <InlineCode>yes</InlineCode> con el teclado y presiona Enter.
        </p>
        <p className="mt-2">
          La consola te pedirá la contraseña (<InlineCode>password:</InlineCode>): pega la contraseña copiada en el paso anterior
          (en Windows haz clic derecho con el ratón sobre la ventana; en Mac pulsa Comando + V) y presiona Enter.
        </p>
        <Callout>
          Al pegar la contraseña, la terminal no mostrará texto, ni asteriscos, ni moverá el cursor. Parece que no escribe nada por
          motivos de seguridad, pero sí lo está leyendo. Pégala una sola vez y pulsa Enter.
        </Callout>
        <p className="mt-2">
          Al ver que aparece el texto <InlineCode>root@vultr:~#</InlineCode>, ya estás dentro de tu servidor.
        </p>
      </>
    ),
  },
  {
    icon: FolderPlus,
    title: "5. Crea la carpeta de trabajo",
    time: "~1 min",
    body: (
      <>
        <p>Inmediatamente después de entrar (en la misma ventana donde pusiste la contraseña), copia y pega esto:</p>
        <CodeBlock>mkdir app && cd app</CodeBlock>
        <p className="mt-2">
          Pulsa Enter. Esto crea una carpeta vacía llamada app y entra en ella. Si quieres llamarla con el nombre de tu herramienta,
          por ejemplo umami, puedes escribir <InlineCode>mkdir umami && cd umami</InlineCode>.
        </p>
      </>
    ),
  },
  {
    icon: FileCode,
    title: "6. Crea el archivo y pega el código de tu herramienta",
    time: "~3 min",
    body: (
      <>
        <p>En la misma consola, copia y pega este comando tal cual y pulsa Enter:</p>
        <CodeBlock>nano docker-compose.yml</CodeBlock>
        <p className="mt-2">
          Esto abrirá una pantalla negra casi vacía con opciones abajo; es un editor de texto dentro de tu servidor. Ve a la pestaña
          de AltFreeStack en tu navegador, entra en la ficha de la herramienta que elegiste y haz clic en el botón{" "}
          <strong>Copiar docker-compose.yml</strong>.
        </p>
        <p className="mt-2">
          Vuelve a tu ventana negra de la terminal y pega lo que acabas de copiar (en Windows haz clic derecho; en Mac pulsa Comando
          + V). Verás que aparecen de golpe todas las líneas de código. No necesitas pulsar Enter tras pegar.
        </p>
        <p className="mt-2">
          <strong>Configura tus contraseñas:</strong> mira el texto en pantalla. Si ves líneas marcadas con{" "}
          <InlineCode># CAMBIAR</InlineCode> o palabras como <InlineCode>change-me</InlineCode>, usa las flechas de tu teclado para
          moverte hasta ahí, borra <InlineCode>change-me</InlineCode> y escribe una contraseña segura inventada por ti (o usa el
          botón &quot;Generar secretos seguros&quot; de la ficha de AltFreeStack para copiar una clave aleatoria).
        </p>
        <p className="mt-2">
          <strong>Guardar y salir:</strong> pulsa la combinación de teclas <InlineCode>Ctrl + O</InlineCode> y luego pulsa Enter
          (esto guarda lo que pegaste). Pulsa <InlineCode>Ctrl + X</InlineCode> (esto te saca de esa pantalla y te devuelve a la
          consola habitual).
        </p>
      </>
    ),
  },
  {
    icon: Power,
    title: "7. Enciende la herramienta",
    time: "~2 min",
    body: (
      <>
        <p>En la misma ventana donde acabas de salir, copia y pega este comando y pulsa Enter:</p>
        <CodeBlock>docker compose up -d</CodeBlock>
        <p className="mt-2">
          No tienes que abrir otra terminal ni hacer nada previo. Verás que el servidor empieza a descargar archivos
          automáticamente (<InlineCode>Pulling</InlineCode>, <InlineCode>Downloaded</InlineCode>, <InlineCode>Started</InlineCode>).
          Cuando termine y vuelva a aparecer la línea <InlineCode>root@vultr:~/app#</InlineCode>, la herramienta ya está encendida y
          funcionando.
        </p>
      </>
    ),
  },
  {
    icon: Globe,
    title: "8. Abre tu herramienta en el navegador",
    time: "~1 min",
    body: (
      <>
        <p>Abre una pestaña nueva en tu navegador web habitual (Chrome, Firefox, Safari). Para entrar necesitas dos datos:</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>La IP:</strong> la misma que copiaste en el paso 3 de Vultr (ej. <InlineCode>149.28.45.12</InlineCode>).
          </li>
          <li>
            <strong>El Puerto:</strong> míralo en la ficha de la herramienta en AltFreeStack (bajo el título o en las
            especificaciones verás un dato que dice Puerto: seguido de un número, por ejemplo 3000 u 8080).
          </li>
        </ul>
        <p className="mt-2">En la barra donde pones las páginas web, escribe:</p>
        <CodeBlock>http://TU_IP:PUERTO</CodeBlock>
        <p className="mt-2">
          (Ejemplo real: si tu IP es 149.28.45.12 y el puerto es 3000, escribes{" "}
          <InlineCode>http://149.28.45.12:3000</InlineCode>). Pulsa Enter. ¡Listo! Verás la pantalla de bienvenida de tu aplicación,
          lista para que crees tu usuario administrador y empieces a usarla.
        </p>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: "¿Cómo gestionarla en el futuro?",
    time: "recurrente",
    body: (
      <>
        <p>
          Si algún día necesitas hacer mantenimiento, solo abres tu terminal, te conectas como en el paso 4, entras a la carpeta (
          <InlineCode>cd app</InlineCode>) y usas estos comandos:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            Ver si sigue funcionando o revisar errores: <InlineCode>docker compose ps</InlineCode> o{" "}
            <InlineCode>docker compose logs -f</InlineCode>
          </li>
          <li>
            Apagar la herramienta: <InlineCode>docker compose down</InlineCode>
          </li>
          <li>
            Actualizar a la versión más reciente: <InlineCode>docker compose pull && docker compose up -d</InlineCode>
          </li>
        </ul>
      </>
    ),
  },
];

const vultrEn: GuideStep[] = [
  {
    icon: UserPlus,
    title: "1. Create your Vultr account",
    time: "~3 min",
    body: (
      <>
        <p>
          Before you start you only need 3 things: a card or PayPal account to sign up with Vultr, your computer (Windows, Mac or
          Linux), and the tool&apos;s page open in another browser tab on AltFreeStack.
        </p>
        <p className="mt-2">
          Go to vultr.com in your browser. In the top right, click the blue <strong>Sign Up</strong> button. Type your email and set
          a password (or click <em>Continue with Google/GitHub</em>). Go to your inbox, open Vultr&apos;s email and click the link
          to verify your account.
        </p>
        <p className="mt-2">
          Go back to Vultr and add a payment method. You won&apos;t be charged right away — you&apos;re only billed for the time a
          server stays on, calculated by cents per day.
        </p>
      </>
    ),
  },
  {
    icon: Rocket,
    title: "2. Order your server",
    time: "~4 min",
    body: (
      <>
        <p>
          On Vultr&apos;s main dashboard, click <strong>Deploy</strong> in the sidebar or the blue <strong>+ Deploy Server</strong>{" "}
          button (top right). Select the <strong>Cloud Compute – Shared CPU</strong> option.
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Location:</strong> pick the flag of the city closest to you or your visitors (e.g. Madrid, Frankfurt, Miami).
            The closer it is, the lower the latency.
          </li>
          <li>
            <strong>Server Image:</strong> you&apos;ll see several horizontal tabs. Click the <strong>Marketplace Apps</strong> tab
            (don&apos;t touch anything on AltFreeStack yet — this is inside Vultr&apos;s site). In that section&apos;s search bar
            type <InlineCode>Docker</InlineCode>. You&apos;ll see a card with a blue whale icon that says <em>Docker on Ubuntu</em> —
            click that card, it&apos;ll get selected with a blue border. This way the server ships with Docker pre-installed and you
            won&apos;t have to fight with install commands.
          </li>
          <li>
            <strong>Server Size:</strong> click the <strong>Regular Performance</strong> tab. Pick the cheap option: $6/mo (1 vCPU /
            1 GB RAM / 25 GB SSD) — more than enough to run most tools in the catalog.
          </li>
        </ul>
        <p className="mt-2">
          Scroll to the bottom of the page (ignore the optional VPC or Firewall options for now) and click the blue{" "}
          <strong>Deploy Now</strong> button. In your product list you&apos;ll see your new server in <em>Installing...</em> status.
          Wait 1-2 minutes until it turns green with the word <strong>Running</strong>.
        </p>
      </>
    ),
  },
  {
    icon: KeyRound,
    title: "3. Copy your login credentials",
    time: "~1 min",
    body: (
      <>
        <p>
          Click directly on your server&apos;s name in the list to open its details panel. Find these two fields and write them
          down or keep them handy:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>IP Address:</strong> a sequence of 4 numbers separated by dots (e.g. <InlineCode>149.28.45.12</InlineCode>).
            Click the copy icon next to it — this is the IP you&apos;ll use throughout the guide.
          </li>
          <li>
            <strong>Password:</strong> next to the word Password, click the eye icon to reveal it, then the copy icon.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Terminal,
    title: "4. Connect to the server from your computer",
    time: "~3 min",
    body: (
      <>
        <p>Open your system&apos;s console/terminal:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <strong>On Windows:</strong> press the Windows key, type <InlineCode>cmd</InlineCode> (or Terminal) and press Enter.
          </li>
          <li>
            <strong>On Mac:</strong> press Cmd + Space, type Terminal and press Enter.
          </li>
        </ul>
        <p className="mt-3">In that black window, type exactly the following, replacing YOUR_IP with the numbers you copied:</p>
        <CodeBlock>ssh root@YOUR_IP</CodeBlock>
        <p className="mt-2">
          (Real example: <InlineCode>ssh root@149.28.45.12</InlineCode>) and press Enter. Does a message show up asking
          (yes/no/[fingerprint])? Type <InlineCode>yes</InlineCode> on your keyboard and press Enter.
        </p>
        <p className="mt-2">
          The console will ask for the password (<InlineCode>password:</InlineCode>): paste the password you copied in the previous
          step (right-click the window on Windows; Cmd + V on Mac) and press Enter.
        </p>
        <Callout>
          When you paste the password, the terminal won&apos;t show any text, asterisks, or move the cursor. It looks like
          it&apos;s not typing anything for security reasons, but it is reading it. Paste it once and press Enter.
        </Callout>
        <p className="mt-2">
          Once you see the text <InlineCode>root@vultr:~#</InlineCode>, you&apos;re inside your server.
        </p>
      </>
    ),
  },
  {
    icon: FolderPlus,
    title: "5. Create the working folder",
    time: "~1 min",
    body: (
      <>
        <p>Right after logging in (in the same window where you pasted the password), copy and paste this:</p>
        <CodeBlock>mkdir app && cd app</CodeBlock>
        <p className="mt-2">
          Press Enter. This creates an empty folder called app and enters it. If you&apos;d rather name it after your tool, e.g.
          umami, type <InlineCode>mkdir umami && cd umami</InlineCode>.
        </p>
      </>
    ),
  },
  {
    icon: FileCode,
    title: "6. Create the file and paste your tool's code",
    time: "~3 min",
    body: (
      <>
        <p>In the same console, copy and paste this command exactly and press Enter:</p>
        <CodeBlock>nano docker-compose.yml</CodeBlock>
        <p className="mt-2">
          This opens an almost-empty black screen with options at the bottom — it&apos;s a text editor inside your server. Go to the
          AltFreeStack tab in your browser, open the tool you chose, and click the <strong>Copy docker-compose.yml</strong> button.
        </p>
        <p className="mt-2">
          Go back to your black terminal window and paste what you just copied (right-click on Windows; Cmd + V on Mac). You&apos;ll
          see every line of code appear at once. You don&apos;t need to press Enter after pasting.
        </p>
        <p className="mt-2">
          <strong>Set your passwords:</strong> look at the text on screen. If you see lines marked with{" "}
          <InlineCode># CHANGE-ME</InlineCode> or words like <InlineCode>change-me</InlineCode>, use your keyboard&apos;s arrow keys
          to move there, delete <InlineCode>change-me</InlineCode> and type a secure password you make up (or use the &quot;Generate
          secure secrets&quot; button on the AltFreeStack tool page to copy a random key).
        </p>
        <p className="mt-2">
          <strong>Save and exit:</strong> press <InlineCode>Ctrl + O</InlineCode> then Enter (this saves what you pasted). Press{" "}
          <InlineCode>Ctrl + X</InlineCode> (this takes you out of that screen back to the regular console).
        </p>
      </>
    ),
  },
  {
    icon: Power,
    title: "7. Start the tool",
    time: "~2 min",
    body: (
      <>
        <p>In the same window you just exited from, copy and paste this command and press Enter:</p>
        <CodeBlock>docker compose up -d</CodeBlock>
        <p className="mt-2">
          You don&apos;t need to open another terminal or do anything beforehand. You&apos;ll see the server start downloading files
          automatically (<InlineCode>Pulling</InlineCode>, <InlineCode>Downloaded</InlineCode>, <InlineCode>Started</InlineCode>).
          When it finishes and the line <InlineCode>root@vultr:~/app#</InlineCode> shows up again, the tool is running.
        </p>
      </>
    ),
  },
  {
    icon: Globe,
    title: "8. Open your tool in the browser",
    time: "~1 min",
    body: (
      <>
        <p>Open a new tab in your usual web browser (Chrome, Firefox, Safari). You need two pieces of information to enter:</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>The IP:</strong> the same one you copied in Vultr&apos;s step 3 (e.g. <InlineCode>149.28.45.12</InlineCode>).
          </li>
          <li>
            <strong>The Port:</strong> check it on the tool&apos;s page on AltFreeStack (under the title or in the specs you&apos;ll
            see a Port: field followed by a number, e.g. 3000 or 8080).
          </li>
        </ul>
        <p className="mt-2">In the address bar, type:</p>
        <CodeBlock>http://YOUR_IP:PORT</CodeBlock>
        <p className="mt-2">
          (Real example: if your IP is 149.28.45.12 and the port is 3000, type{" "}
          <InlineCode>http://149.28.45.12:3000</InlineCode>). Press Enter. Done! You&apos;ll see your app&apos;s welcome screen,
          ready for you to create your admin user and start using it.
        </p>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: "How do you manage it going forward?",
    time: "recurring",
    body: (
      <>
        <p>
          If you ever need to do maintenance, just open your terminal, connect like in step 4, go into the folder (
          <InlineCode>cd app</InlineCode>) and use these commands:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            Check it&apos;s still running or look at errors: <InlineCode>docker compose ps</InlineCode> or{" "}
            <InlineCode>docker compose logs -f</InlineCode>
          </li>
          <li>
            Turn the tool off: <InlineCode>docker compose down</InlineCode>
          </li>
          <li>
            Update to the latest version: <InlineCode>docker compose pull && docker compose up -d</InlineCode>
          </li>
        </ul>
      </>
    ),
  },
];

// ---------------------------------------------------------------------------
// Railway
// ---------------------------------------------------------------------------

const railwayEs: GuideStep[] = [
  {
    icon: UserPlus,
    title: "1. Crea tu cuenta en Railway",
    time: "~2 min",
    body: (
      <>
        <p>
          <strong>¿Qué diferencia tiene Railway?</strong> Es una plataforma PaaS (plataforma como servicio) — no necesitas usar la
          consola ni conectarte por SSH, todo el despliegue se hace mediante clics y formularios visuales desde su propia página
          web.
        </p>
        <p className="mt-2">
          Entra en tu navegador a railway.app (o railway.com). Haz clic en el botón superior derecho <strong>Login</strong> o{" "}
          <strong>Start a New Project</strong>. Selecciona <strong>Continue with GitHub</strong> (es la forma recomendada para no
          tener fricciones de permisos) y acepta los términos de uso.
        </p>
      </>
    ),
  },
  {
    icon: MousePointerClick,
    title: "2. Usa el botón de 1-Click Deploy de AltFreeStack",
    time: "~2 min",
    body: (
      <>
        <p>
          (La forma más rápida si la herramienta cuenta con plantilla directa): en la ficha de la herramienta en AltFreeStack,
          localiza la sección de despliegue y haz clic en el botón <strong>Deploy on Railway</strong> (o botón de 1-Click). Se te
          abrirá automáticamente una pestaña en Railway mostrando la plantilla de la herramienta.
        </p>
        <p className="mt-2">
          Haz clic en el botón morado <strong>Deploy Now</strong> (o <strong>Configure</strong>). Si la plantilla te pide campos
          obligatorios marcados con asterisco (como contraseñas, URLs o tokens), reemplaza cualquier valor por defecto con
          contraseñas seguras creadas por ti o haz clic en el botón de candado/generador si Railway te lo ofrece al lado del campo.
          Haz clic en <strong>Deploy</strong>.
        </p>
      </>
    ),
  },
  {
    icon: Package,
    title: "3. Alternativa: desplegar mediante Dockerfile / Imagen",
    time: "~3 min",
    body: (
      <>
        <p>
          (Si la herramienta no tiene botón preconfigurado y quieres lanzarla desde un panel limpio): en tu panel de Railway, pulsa
          en <strong>+ New Project</strong>. Selecciona la opción <strong>Deploy from Docker Image</strong> o{" "}
          <strong>Empty Project</strong>.
        </p>
        <p className="mt-2">
          Si elegiste Deploy from Docker Image, escribe el nombre de la imagen que aparece en el archivo Compose de AltFreeStack
          (por ejemplo: <InlineCode>ghost:latest</InlineCode> o <InlineCode>plausible/analytics:latest</InlineCode>) y presiona
          Enter. Railway creará una caja en un lienzo visual y comenzará a desplegarla.
        </p>
      </>
    ),
  },
  {
    icon: Globe,
    title: "4. Genera un dominio público para entrar",
    time: "~1 min",
    body: (
      <>
        <p>
          A diferencia de un VPS como Vultr o DigitalOcean donde entras por una IP numérica, en Railway la plataforma te regala una
          dirección web pública (<InlineCode>.up.railway.app</InlineCode>) con HTTPS y candado seguro ya activado:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>En el panel de Railway, haz clic sobre la tarjeta de tu servicio recién desplegado.</li>
          <li>
            Ve a la pestaña <strong>Settings</strong> (Ajustes) en el menú lateral de esa tarjeta.
          </li>
          <li>
            Baja hasta la sección llamada <strong>Networking</strong> o <strong>Public Networking</strong>.
          </li>
          <li>
            Verás un botón que dice <strong>Generate Domain</strong>. Haz clic sobre él — aparecerá un enlace web terminado en{" "}
            <InlineCode>.up.railway.app</InlineCode> (por ejemplo: <InlineCode>mi-app-production.up.railway.app</InlineCode>).
          </li>
        </ul>
        <p className="mt-2">
          Si la ficha de AltFreeStack indicaba un puerto específico (por ejemplo 3000 u 8080), asegúrate en ese mismo apartado de
          que el campo <strong>Port</strong> tenga escrito ese mismo número.
        </p>
      </>
    ),
  },
  {
    icon: CheckCircle2,
    title: "5. Abre tu herramienta en el navegador",
    time: "~1 min",
    body: (
      <>
        <p>
          Haz clic directamente sobre el enlace que Railway te acaba de generar en azul. Se abrirá la aplicación en una pestaña
          nueva, protegida con certificado SSL (HTTPS) y completamente lista para configurar tu usuario inicial.
        </p>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: "¿Cómo gestionarla en el futuro?",
    time: "recurrente",
    body: (
      <>
        <p>
          Railway no necesita comandos manuales de actualización: si conectaste un repositorio de GitHub, cada push redespliega
          automáticamente; si usaste una imagen Docker suelta, cambia el tag en el servicio y pulsa <strong>Redeploy</strong>. Las
          bases de datos gestionadas de Railway hacen backups automáticos — revisa el plan de retención en{" "}
          <strong>Settings → Backups</strong> de ese servicio.
        </p>
      </>
    ),
  },
];

const railwayEn: GuideStep[] = [
  {
    icon: UserPlus,
    title: "1. Create your Railway account",
    time: "~2 min",
    body: (
      <>
        <p>
          <strong>What&apos;s different about Railway?</strong> It&apos;s a PaaS (platform as a service) — you don&apos;t need to
          use a console or connect over SSH, the entire deployment happens through clicks and visual forms on their own website.
        </p>
        <p className="mt-2">
          Go to railway.app (or railway.com) in your browser. Click the <strong>Login</strong> or{" "}
          <strong>Start a New Project</strong> button in the top right. Select <strong>Continue with GitHub</strong> (it&apos;s the
          recommended way to avoid permission friction) and accept the terms of use.
        </p>
      </>
    ),
  },
  {
    icon: MousePointerClick,
    title: "2. Use AltFreeStack's 1-Click Deploy button",
    time: "~2 min",
    body: (
      <>
        <p>
          (The fastest way, if the tool has a direct template): on the tool&apos;s page on AltFreeStack, find the deployment
          section and click the <strong>Deploy on Railway</strong> button (or 1-Click button). A Railway tab will open automatically
          showing the tool&apos;s template.
        </p>
        <p className="mt-2">
          Click the purple <strong>Deploy Now</strong> button (or <strong>Configure</strong>). If the template asks for required
          fields marked with an asterisk (like passwords, URLs or tokens), replace any default value with secure passwords you
          create, or click the lock/generator button if Railway offers one next to the field. Click <strong>Deploy</strong>.
        </p>
      </>
    ),
  },
  {
    icon: Package,
    title: "3. Alternative: deploy via a Dockerfile / Image",
    time: "~3 min",
    body: (
      <>
        <p>
          (If the tool has no pre-configured button and you want to launch it from a clean panel): on your Railway dashboard, click{" "}
          <strong>+ New Project</strong>. Select <strong>Deploy from Docker Image</strong> or <strong>Empty Project</strong>.
        </p>
        <p className="mt-2">
          If you chose Deploy from Docker Image, type the image name shown in AltFreeStack&apos;s Compose file (for example:{" "}
          <InlineCode>ghost:latest</InlineCode> or <InlineCode>plausible/analytics:latest</InlineCode>) and press Enter. Railway
          will create a box on a visual canvas and start deploying it.
        </p>
      </>
    ),
  },
  {
    icon: Globe,
    title: "4. Generate a public domain to access it",
    time: "~1 min",
    body: (
      <>
        <p>
          Unlike a VPS such as Vultr or DigitalOcean where you connect through a numeric IP, on Railway the platform gives you a
          free public web address (<InlineCode>.up.railway.app</InlineCode>) with HTTPS and a secure lock already enabled:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>On the Railway dashboard, click your recently deployed service&apos;s card.</li>
          <li>
            Go to the <strong>Settings</strong> tab in that card&apos;s sidebar.
          </li>
          <li>
            Scroll down to the section called <strong>Networking</strong> or <strong>Public Networking</strong>.
          </li>
          <li>
            You&apos;ll see a button that says <strong>Generate Domain</strong>. Click it — a web link ending in{" "}
            <InlineCode>.up.railway.app</InlineCode> will appear (for example: <InlineCode>my-app-production.up.railway.app</InlineCode>).
          </li>
        </ul>
        <p className="mt-2">
          If the AltFreeStack page mentioned a specific port (e.g. 3000 or 8080), make sure the <strong>Port</strong> field in that
          same section has that same number set.
        </p>
      </>
    ),
  },
  {
    icon: CheckCircle2,
    title: "5. Open your tool in the browser",
    time: "~1 min",
    body: (
      <>
        <p>
          Click directly on the blue link Railway just generated for you. The app will open in a new tab, secured with an SSL
          certificate (HTTPS) and fully ready for you to set up your initial user.
        </p>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: "How do you manage it going forward?",
    time: "recurring",
    body: (
      <>
        <p>
          Railway doesn&apos;t need manual update commands: if you connected a GitHub repo, every push redeploys automatically; if
          you used a plain Docker image, change the tag on the service and click <strong>Redeploy</strong>. Railway&apos;s managed
          databases back up automatically — check the retention plan under <strong>Settings → Backups</strong> on that service.
        </p>
      </>
    ),
  },
];

interface ProviderMeta {
  name: string;
  domain: string;
  gradient: string;
}

const providerMeta: Record<HostingProviderId, ProviderMeta> = {
  digitalocean: { name: "DigitalOcean", domain: "digitalocean.com", gradient: "from-blue-500 to-blue-600" },
  vultr: { name: "Vultr", domain: "vultr.com", gradient: "from-blue-600 to-indigo-600" },
  railway: { name: "Railway", domain: "railway.app", gradient: "from-violet-500 to-violet-600" },
};

const guidesByLocale: Record<Locale, Record<HostingProviderId, GuideStep[]>> = {
  es: { digitalocean: digitaloceanEs, vultr: vultrEs, railway: railwayEs },
  en: { digitalocean: digitaloceanEn, vultr: vultrEn, railway: railwayEn },
};

export function getHostingGuideMeta(provider: HostingProviderId) {
  return providerMeta[provider];
}

export function HostingGuideContent({ provider, locale = "es" }: { provider: HostingProviderId; locale?: Locale }) {
  const t = getDictionary(locale);
  const meta = providerMeta[provider];
  const steps = guidesByLocale[locale][provider];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-slate-600">
        <Link href={localeHref("/", locale)} className="hover:text-emerald-700">
          {t.breadcrumb.home}
        </Link>
        <span className="mx-2">/</span>
        <Link href={localeHref("/hosting-deals", locale)} className="hover:text-emerald-700">
          {t.hostingDeals.title}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{meta.name}</span>
      </nav>

      <header className="mb-12">
        <span
          className={cn(
            "inline-flex items-center rounded-full bg-gradient-to-br px-3 py-1 text-xs font-medium text-white",
            meta.gradient
          )}
        >
          {t.hostingGuidePage.badge}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.hostingGuidePage.title(meta.name)}</h1>
        <p className="mt-4 text-lg text-slate-600">{t.hostingGuidePage.subtitle(meta.name)}</p>
      </header>

      <ol className="space-y-8">
        {steps.map((step) => (
          <li key={step.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <step.icon size={20} />
              </span>
              <span className="mt-2 h-full w-px bg-slate-200" />
            </div>
            <div className="flex-1 pb-2">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-900">{step.title}</h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                  <Clock size={12} /> {step.time}
                </span>
              </div>
              <div className="text-sm text-slate-600">{step.body}</div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="font-semibold text-slate-900">{t.hostingGuidePage.ctaTitle}</p>
        <p className="mt-1 text-sm text-slate-600">{t.hostingGuidePage.ctaSubtitle}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Link href={localeHref("/", locale)} className={cn(buttonVariants({ size: "lg" }), "gap-1.5")}>
            {t.hostingGuidePage.ctaButton} <ArrowRight size={16} />
          </Link>
          <Link href={getDeployGuideHref(locale)} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-1.5")}>
            <ArrowLeft size={16} /> {t.hostingGuidePage.backToDeployGuide}
          </Link>
        </div>
      </div>
    </div>
  );
}
