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
          Entra en digitalocean.com y pulsa <strong>Sign Up</strong> arriba a la derecha. Puedes registrarte con tu email o con tu cuenta
          de Google/GitHub — es más rápido. Confirma tu email desde el enlace que te llega.
        </p>
        <p className="mt-2">
          Te pedirá un método de pago (tarjeta o PayPal) antes de dejarte crear servidores, pero no se te cobra nada hasta que uses
          recursos — y con el enlace de arriba obtienes $200 de crédito gratis durante 60 días.
        </p>
      </>
    ),
  },
  {
    icon: Rocket,
    title: "2. Crea tu Droplet (servidor)",
    time: "~5 min",
    body: (
      <>
        <p>
          En el panel, pulsa el botón verde <strong>Create</strong> (arriba a la derecha) → <strong>Droplets</strong>. Ahí eliges:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Imagen:</strong> el camino más rápido es la pestaña <strong>Marketplace</strong> → busca &quot;Docker&quot; → elige
            la imagen oficial <em>Docker on Ubuntu</em> (trae Docker y Compose ya instalados, te saltas el paso 4 de esta guía). Si
            prefieres instalarlo tú mismo, elige la pestaña <strong>OS</strong> → <em>Ubuntu 24.04 (LTS) x64</em>.
          </li>
          <li>
            <strong>Plan:</strong> &quot;Basic&quot; → &quot;Regular&quot; con 1 vCPU / 1GB RAM (el más barato) es suficiente para la
            mayoría de herramientas del catálogo — revisa la ficha técnica de la tuya si necesita más.
          </li>
          <li>
            <strong>Authentication:</strong> elige <strong>Password</strong> si es tu primera vez (más simple) o{" "}
            <strong>SSH Key</strong> si ya tienes una (más seguro).
          </li>
        </ul>
        <p className="mt-2">
          Pulsa <strong>Create Droplet</strong> al final y espera ~1 minuto. Copia la <strong>IP pública</strong> que aparece en el
          panel — la necesitas en el siguiente paso.
        </p>
      </>
    ),
  },
  {
    icon: Terminal,
    title: "3. Entra por consola (SSH) y aprende lo básico",
    time: "~5 min",
    body: (
      <>
        <p>Desde la terminal de tu ordenador (macOS/Linux: Terminal; Windows: PowerShell o Windows Terminal), conéctate:</p>
        <CodeBlock>ssh root@TU_IP_DEL_SERVIDOR</CodeBlock>
        <p className="mt-2">
          La primera vez te preguntará si confías en el servidor — escribe <InlineCode>yes</InlineCode>. Si elegiste
          &quot;Password&quot;, te la pide (DigitalOcean te la manda por email si no la viste al crear el Droplet).
        </p>
        <p className="mt-3">Ya dentro, estos son los únicos comandos que necesitas para moverte:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <InlineCode>pwd</InlineCode> — en qué carpeta estás ahora mismo.
          </li>
          <li>
            <InlineCode>ls</InlineCode> — qué archivos y carpetas hay aquí.
          </li>
          <li>
            <InlineCode>mkdir mi-app</InlineCode> — crea una carpeta nueva llamada &quot;mi-app&quot;.
          </li>
          <li>
            <InlineCode>cd mi-app</InlineCode> — entra en esa carpeta (<InlineCode>cd ..</InlineCode> para salir).
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Package,
    title: "4. Instala Docker (solo si no usaste la imagen del Marketplace)",
    time: "~2 min",
    body: (
      <>
        <p>Si elegiste Ubuntu normal en el paso 2, instala Docker con el script oficial:</p>
        <CodeBlock>curl -fsSL https://get.docker.com | sh</CodeBlock>
        <p className="mt-2">
          Comprueba que se instaló bien: <InlineCode>docker --version</InlineCode>. Si elegiste la imagen &quot;Docker on
          Ubuntu&quot; del Marketplace, sáltate este paso — ya lo tienes.
        </p>
      </>
    ),
  },
  {
    icon: FileCode,
    title: "5. Copia el docker-compose.yml de tu herramienta",
    time: "~3 min",
    body: (
      <>
        <p>
          En la ficha de la herramienta que quieras desplegar en AltFreeStack, pulsa <strong>Copiar</strong> en el bloque de código.
          De vuelta en tu terminal SSH:
        </p>
        <CodeBlock>{`mkdir mi-app && cd mi-app
nano docker-compose.yml
# pega el contenido con clic-derecho o Cmd/Ctrl+V, guarda con Ctrl+O y Enter, sal con Ctrl+X`}</CodeBlock>
        <p className="mt-2">
          Antes de arrancar, sustituye cada valor <InlineCode>change-me...</InlineCode> por una contraseña real — puedes generarlas
          con el botón &quot;Generar secretos seguros&quot; de la ficha de la herramienta y pegarlas aquí.
        </p>
      </>
    ),
  },
  {
    icon: CheckCircle2,
    title: "6. Arranca y comprueba que funciona",
    time: "~3 min",
    body: (
      <>
        <p>Desde la misma carpeta:</p>
        <CodeBlock>docker compose up -d</CodeBlock>
        <p className="mt-2">Verifica que los contenedores están corriendo y revisa los logs si algo falla:</p>
        <CodeBlock>{`docker compose ps
docker compose logs -f    # Ctrl+C para salir`}</CodeBlock>
        <p className="mt-2">
          Los Droplets de DigitalOcean no tienen firewall activado por defecto, así que abre{" "}
          <InlineCode>http://TU_IP:PUERTO</InlineCode> en el navegador y ya deberías ver tu herramienta. Si quieres restringir
          accesos, crea uno desde <strong>Networking → Firewalls → Create Firewall</strong> y abre solo los puertos 22, 80, 443 y el
          de tu app.
        </p>
      </>
    ),
  },
  {
    icon: Globe,
    title: "7. Pon tu dominio propio y HTTPS",
    time: "~10 min",
    body: (
      <>
        <p>
          En el panel de tu proveedor de dominio (o en DigitalOcean → <strong>Networking → Domains</strong> si migras el DNS), crea
          un registro <strong>A</strong> apuntando a la IP de tu Droplet.
        </p>
        <p className="mt-2">
          Para HTTPS gratuito sin complicarte, pon{" "}
          <a href="https://caddyserver.com" target="_blank" rel="noopener noreferrer" className="font-medium text-emerald-700 hover:underline">
            Caddy
          </a>{" "}
          delante como proxy inverso — renueva certificados de Let&apos;s Encrypt solo:
        </p>
        <CodeBlock>{`tudominio.com {
  reverse_proxy localhost:PUERTO_DE_TU_APP
}`}</CodeBlock>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: "8. Mantenimiento",
    time: "recurrente",
    body: (
      <>
        <p>Para actualizar a la última versión de forma segura:</p>
        <CodeBlock>{`docker compose pull
docker compose up -d`}</CodeBlock>
        <p className="mt-2">
          Haz backup periódico de las carpetas bajo <InlineCode>volumes:</InlineCode> en tu docker-compose.yml — ahí vive tu base de
          datos y tus archivos.
        </p>
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
          Go to digitalocean.com and click <strong>Sign Up</strong> in the top right. You can sign up with your email or your
          Google/GitHub account — it&apos;s faster. Confirm your email from the link you receive.
        </p>
        <p className="mt-2">
          You&apos;ll be asked for a payment method (card or PayPal) before you can create servers, but you&apos;re not charged
          until you actually use resources — and the link above gives you $200 in free credit for 60 days.
        </p>
      </>
    ),
  },
  {
    icon: Rocket,
    title: "2. Create your Droplet (server)",
    time: "~5 min",
    body: (
      <>
        <p>
          In the dashboard, click the green <strong>Create</strong> button (top right) → <strong>Droplets</strong>. There you pick:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Image:</strong> the fastest path is the <strong>Marketplace</strong> tab → search &quot;Docker&quot; → pick the
            official <em>Docker on Ubuntu</em> image (Docker and Compose already installed, skips step 4 of this guide). If you&apos;d
            rather install it yourself, use the <strong>OS</strong> tab → <em>Ubuntu 24.04 (LTS) x64</em>.
          </li>
          <li>
            <strong>Plan:</strong> &quot;Basic&quot; → &quot;Regular&quot; with 1 vCPU / 1GB RAM (the cheapest) is enough for most
            tools in the catalog — check your tool&apos;s technical profile if it needs more.
          </li>
          <li>
            <strong>Authentication:</strong> pick <strong>Password</strong> if it&apos;s your first time (simpler) or{" "}
            <strong>SSH Key</strong> if you already have one (more secure).
          </li>
        </ul>
        <p className="mt-2">
          Click <strong>Create Droplet</strong> at the bottom and wait ~1 minute. Copy the <strong>public IP</strong> shown in the
          dashboard — you&apos;ll need it in the next step.
        </p>
      </>
    ),
  },
  {
    icon: Terminal,
    title: "3. Log in via console (SSH) and learn the basics",
    time: "~5 min",
    body: (
      <>
        <p>From your computer&apos;s terminal (macOS/Linux: Terminal; Windows: PowerShell or Windows Terminal), connect:</p>
        <CodeBlock>ssh root@YOUR_SERVER_IP</CodeBlock>
        <p className="mt-2">
          The first time it&apos;ll ask if you trust the server — type <InlineCode>yes</InlineCode>. If you picked
          &quot;Password&quot;, it&apos;ll ask for it (DigitalOcean emails it to you if you missed it when creating the Droplet).
        </p>
        <p className="mt-3">Once inside, these are the only commands you need to get around:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <InlineCode>pwd</InlineCode> — which folder you&apos;re in right now.
          </li>
          <li>
            <InlineCode>ls</InlineCode> — what files and folders are here.
          </li>
          <li>
            <InlineCode>mkdir my-app</InlineCode> — create a new folder called &quot;my-app&quot;.
          </li>
          <li>
            <InlineCode>cd my-app</InlineCode> — enter that folder (<InlineCode>cd ..</InlineCode> to go back).
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Package,
    title: "4. Install Docker (only if you didn't use the Marketplace image)",
    time: "~2 min",
    body: (
      <>
        <p>If you picked plain Ubuntu in step 2, install Docker with the official script:</p>
        <CodeBlock>curl -fsSL https://get.docker.com | sh</CodeBlock>
        <p className="mt-2">
          Check it installed correctly: <InlineCode>docker --version</InlineCode>. If you used the &quot;Docker on Ubuntu&quot; Marketplace
          image, skip this step — you already have it.
        </p>
      </>
    ),
  },
  {
    icon: FileCode,
    title: "5. Copy your tool's docker-compose.yml",
    time: "~3 min",
    body: (
      <>
        <p>On the profile of the tool you want to deploy on AltFreeStack, click <strong>Copy</strong> on the code block. Back in your SSH terminal:</p>
        <CodeBlock>{`mkdir my-app && cd my-app
nano docker-compose.yml
# paste with right-click or Cmd/Ctrl+V, save with Ctrl+O and Enter, exit with Ctrl+X`}</CodeBlock>
        <p className="mt-2">
          Before starting it up, replace every <InlineCode>change-me...</InlineCode> value with a real password — you can generate
          them with the &quot;Generate secure secrets&quot; button on the tool&apos;s page and paste them in here.
        </p>
      </>
    ),
  },
  {
    icon: CheckCircle2,
    title: "6. Start it up and check it works",
    time: "~3 min",
    body: (
      <>
        <p>From the same folder:</p>
        <CodeBlock>docker compose up -d</CodeBlock>
        <p className="mt-2">Check the containers are running and look at the logs if anything fails:</p>
        <CodeBlock>{`docker compose ps
docker compose logs -f    # Ctrl+C to exit`}</CodeBlock>
        <p className="mt-2">
          DigitalOcean Droplets don&apos;t have a firewall enabled by default, so open <InlineCode>http://YOUR_IP:PORT</InlineCode> in
          your browser and you should already see your tool. To restrict access, create one under{" "}
          <strong>Networking → Firewalls → Create Firewall</strong> and open only ports 22, 80, 443 and your app&apos;s port.
        </p>
      </>
    ),
  },
  {
    icon: Globe,
    title: "7. Point your own domain and enable HTTPS",
    time: "~10 min",
    body: (
      <>
        <p>
          In your domain provider&apos;s dashboard (or DigitalOcean → <strong>Networking → Domains</strong> if you migrate the DNS),
          create an <strong>A</strong> record pointing to your Droplet&apos;s IP.
        </p>
        <p className="mt-2">
          For free HTTPS with no hassle, put{" "}
          <a href="https://caddyserver.com" target="_blank" rel="noopener noreferrer" className="font-medium text-emerald-700 hover:underline">
            Caddy
          </a>{" "}
          in front as a reverse proxy — it renews Let&apos;s Encrypt certificates on its own:
        </p>
        <CodeBlock>{`yourdomain.com {
  reverse_proxy localhost:YOUR_APP_PORT
}`}</CodeBlock>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: "8. Maintenance",
    time: "recurring",
    body: (
      <>
        <p>To safely update to the latest version:</p>
        <CodeBlock>{`docker compose pull
docker compose up -d`}</CodeBlock>
        <p className="mt-2">
          Back up the folders under <InlineCode>volumes:</InlineCode> in your docker-compose.yml periodically — that&apos;s where your
          database and files live.
        </p>
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
          Entra en vultr.com y pulsa <strong>Sign Up</strong> (o inicia sesión con Google/GitHub para ir más rápido). Verifica tu
          email desde el enlace que te llega y añade un método de pago — no se cobra nada hasta que despliegues un servidor.
        </p>
      </>
    ),
  },
  {
    icon: Rocket,
    title: "2. Despliega tu servidor (Cloud Compute)",
    time: "~5 min",
    body: (
      <>
        <p>
          En el panel, pulsa el botón azul <strong>+ Deploy New Server</strong> (o &quot;Deploy&quot; en el menú lateral). Ahí
          eliges:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Tipo de servidor:</strong> <em>Cloud Compute – Shared CPU</em> (el más barato y suficiente para la mayoría de
            herramientas).
          </li>
          <li>
            <strong>Ubicación:</strong> elige el datacenter más cercano a donde estén tus usuarios — Vultr tiene 32 en 6
            continentes.
          </li>
          <li>
            <strong>Imagen del servidor:</strong> pestaña <strong>Marketplace Apps</strong> → busca &quot;Docker&quot; para una
            imagen con Docker ya instalado (te saltas el paso 4), o pestaña <strong>OS</strong> → <em>Ubuntu 24.04 LTS x64</em> para
            instalarlo tú.
          </li>
          <li>
            <strong>Tamaño del servidor:</strong> el plan &quot;Regular Performance&quot; de 1 vCPU / 1GB RAM (~$6/mes) es
            suficiente para la mayoría de herramientas del catálogo.
          </li>
          <li>
            <strong>SSH Keys (opcional):</strong> sube o genera una si quieres entrar sin contraseña. Si no, Vultr te muestra la
            contraseña root en el panel del servidor tras crearlo.
          </li>
        </ul>
        <p className="mt-2">
          Pulsa <strong>Deploy Now</strong> y espera ~1 minuto a que el estado pase a <strong>Running</strong>. Copia la{" "}
          <strong>Main IP</strong> que aparece en la página del servidor.
        </p>
      </>
    ),
  },
  {
    icon: Terminal,
    title: "3. Entra por consola (SSH) y aprende lo básico",
    time: "~5 min",
    body: (
      <>
        <p>Desde tu terminal:</p>
        <CodeBlock>ssh root@TU_IP_DEL_SERVIDOR</CodeBlock>
        <p className="mt-2">
          Escribe <InlineCode>yes</InlineCode> para confiar en el servidor la primera vez, y pega la contraseña root que viste en el
          panel de Vultr (o no te la pedirá si usaste una SSH key).
        </p>
        <p className="mt-3">Comandos básicos para moverte:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <InlineCode>pwd</InlineCode> — en qué carpeta estás.
          </li>
          <li>
            <InlineCode>ls</InlineCode> — qué hay en esta carpeta.
          </li>
          <li>
            <InlineCode>mkdir mi-app</InlineCode> — crea una carpeta.
          </li>
          <li>
            <InlineCode>cd mi-app</InlineCode> — entra en ella (<InlineCode>cd ..</InlineCode> para salir).
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Package,
    title: "4. Instala Docker (si no usaste la Marketplace App)",
    time: "~2 min",
    body: (
      <>
        <p>Con Ubuntu normal, instala Docker con el script oficial:</p>
        <CodeBlock>curl -fsSL https://get.docker.com | sh</CodeBlock>
        <p className="mt-2">
          Verifica con <InlineCode>docker --version</InlineCode>. Si elegiste la app de Docker del Marketplace, ya lo tienes
          instalado.
        </p>
      </>
    ),
  },
  {
    icon: FileCode,
    title: "5. Copia el docker-compose.yml de tu herramienta",
    time: "~3 min",
    body: (
      <>
        <p>
          En la ficha de tu herramienta en AltFreeStack, pulsa <strong>Copiar</strong>. En tu terminal SSH:
        </p>
        <CodeBlock>{`mkdir mi-app && cd mi-app
nano docker-compose.yml
# pega, guarda con Ctrl+O y Enter, sal con Ctrl+X`}</CodeBlock>
        <p className="mt-2">
          Cambia cada <InlineCode>change-me...</InlineCode> por una contraseña real antes de arrancar — usa el botón &quot;Generar
          secretos seguros&quot; de la ficha de la herramienta.
        </p>
      </>
    ),
  },
  {
    icon: CheckCircle2,
    title: "6. Arranca y comprueba que funciona",
    time: "~3 min",
    body: (
      <>
        <CodeBlock>docker compose up -d</CodeBlock>
        <p className="mt-2">Comprueba el estado y los logs:</p>
        <CodeBlock>{`docker compose ps
docker compose logs -f    # Ctrl+C para salir`}</CodeBlock>
        <p className="mt-2">
          Abre <InlineCode>http://TU_IP:PUERTO</InlineCode> en el navegador. Si no carga, revisa la sección{" "}
          <strong>Firewall</strong> en la configuración de tu servidor dentro del panel de Vultr — por defecto no suele haber
          ninguno activo, pero si creaste uno, asegúrate de que el puerto de tu app esté permitido.
        </p>
      </>
    ),
  },
  {
    icon: Globe,
    title: "7. Pon tu dominio propio y HTTPS",
    time: "~10 min",
    body: (
      <>
        <p>
          Crea un registro <strong>A</strong> en tu proveedor de dominio apuntando a la Main IP de tu servidor Vultr.
        </p>
        <p className="mt-2">
          Para HTTPS automático y gratuito, usa{" "}
          <a href="https://caddyserver.com" target="_blank" rel="noopener noreferrer" className="font-medium text-emerald-700 hover:underline">
            Caddy
          </a>{" "}
          como proxy inverso:
        </p>
        <CodeBlock>{`tudominio.com {
  reverse_proxy localhost:PUERTO_DE_TU_APP
}`}</CodeBlock>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: "8. Mantenimiento",
    time: "recurrente",
    body: (
      <>
        <CodeBlock>{`docker compose pull
docker compose up -d`}</CodeBlock>
        <p className="mt-2">
          Haz backup periódico de las carpetas bajo <InlineCode>volumes:</InlineCode> — ahí vive tu base de datos y tus archivos.
        </p>
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
          Go to vultr.com and click <strong>Sign Up</strong> (or sign in with Google/GitHub to go faster). Verify your email from
          the link you receive and add a payment method — you&apos;re not charged until you deploy a server.
        </p>
      </>
    ),
  },
  {
    icon: Rocket,
    title: "2. Deploy your server (Cloud Compute)",
    time: "~5 min",
    body: (
      <>
        <p>
          In the dashboard, click the blue <strong>+ Deploy New Server</strong> button (or &quot;Deploy&quot; in the sidebar). There you
          pick:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Server type:</strong> <em>Cloud Compute – Shared CPU</em> (the cheapest, and enough for most tools).
          </li>
          <li>
            <strong>Location:</strong> pick the datacenter closest to your users — Vultr has 32 across 6 continents.
          </li>
          <li>
            <strong>Server image:</strong> the <strong>Marketplace Apps</strong> tab → search &quot;Docker&quot; for an image with Docker
            pre-installed (skips step 4), or the <strong>OS</strong> tab → <em>Ubuntu 24.04 LTS x64</em> to install it yourself.
          </li>
          <li>
            <strong>Server size:</strong> the &quot;Regular Performance&quot; 1 vCPU / 1GB RAM plan (~$6/mo) is enough for most tools in the
            catalog.
          </li>
          <li>
            <strong>SSH Keys (optional):</strong> upload or generate one if you want passwordless login. Otherwise Vultr shows you
            the root password on the server&apos;s page after it&apos;s created.
          </li>
        </ul>
        <p className="mt-2">
          Click <strong>Deploy Now</strong> and wait ~1 minute for the status to become <strong>Running</strong>. Copy the{" "}
          <strong>Main IP</strong> shown on the server&apos;s page.
        </p>
      </>
    ),
  },
  {
    icon: Terminal,
    title: "3. Log in via console (SSH) and learn the basics",
    time: "~5 min",
    body: (
      <>
        <p>From your terminal:</p>
        <CodeBlock>ssh root@YOUR_SERVER_IP</CodeBlock>
        <p className="mt-2">
          Type <InlineCode>yes</InlineCode> to trust the server the first time, and paste the root password you saw in the Vultr
          dashboard (skipped if you used an SSH key).
        </p>
        <p className="mt-3">Basic commands to get around:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <InlineCode>pwd</InlineCode> — which folder you&apos;re in.
          </li>
          <li>
            <InlineCode>ls</InlineCode> — what&apos;s in this folder.
          </li>
          <li>
            <InlineCode>mkdir my-app</InlineCode> — create a folder.
          </li>
          <li>
            <InlineCode>cd my-app</InlineCode> — enter it (<InlineCode>cd ..</InlineCode> to go back).
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Package,
    title: "4. Install Docker (if you didn't use the Marketplace App)",
    time: "~2 min",
    body: (
      <>
        <p>With plain Ubuntu, install Docker with the official script:</p>
        <CodeBlock>curl -fsSL https://get.docker.com | sh</CodeBlock>
        <p className="mt-2">
          Check with <InlineCode>docker --version</InlineCode>. If you picked the Marketplace Docker app, it&apos;s already installed.
        </p>
      </>
    ),
  },
  {
    icon: FileCode,
    title: "5. Copy your tool's docker-compose.yml",
    time: "~3 min",
    body: (
      <>
        <p>
          On your tool&apos;s profile on AltFreeStack, click <strong>Copy</strong>. In your SSH terminal:
        </p>
        <CodeBlock>{`mkdir my-app && cd my-app
nano docker-compose.yml
# paste, save with Ctrl+O and Enter, exit with Ctrl+X`}</CodeBlock>
        <p className="mt-2">
          Replace every <InlineCode>change-me...</InlineCode> value with a real password before starting it — use the &quot;Generate
          secure secrets&quot; button on the tool&apos;s page.
        </p>
      </>
    ),
  },
  {
    icon: CheckCircle2,
    title: "6. Start it up and check it works",
    time: "~3 min",
    body: (
      <>
        <CodeBlock>docker compose up -d</CodeBlock>
        <p className="mt-2">Check the status and logs:</p>
        <CodeBlock>{`docker compose ps
docker compose logs -f    # Ctrl+C to exit`}</CodeBlock>
        <p className="mt-2">
          Open <InlineCode>http://YOUR_IP:PORT</InlineCode> in your browser. If it doesn&apos;t load, check the{" "}
          <strong>Firewall</strong> section in your server&apos;s settings on the Vultr dashboard — none is active by default, but if you
          created one, make sure your app&apos;s port is allowed.
        </p>
      </>
    ),
  },
  {
    icon: Globe,
    title: "7. Point your own domain and enable HTTPS",
    time: "~10 min",
    body: (
      <>
        <p>
          Create an <strong>A</strong> record with your domain provider pointing to your Vultr server&apos;s Main IP.
        </p>
        <p className="mt-2">
          For free, automatic HTTPS, use{" "}
          <a href="https://caddyserver.com" target="_blank" rel="noopener noreferrer" className="font-medium text-emerald-700 hover:underline">
            Caddy
          </a>{" "}
          as a reverse proxy:
        </p>
        <CodeBlock>{`yourdomain.com {
  reverse_proxy localhost:YOUR_APP_PORT
}`}</CodeBlock>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: "8. Maintenance",
    time: "recurring",
    body: (
      <>
        <CodeBlock>{`docker compose pull
docker compose up -d`}</CodeBlock>
        <p className="mt-2">
          Back up the folders under <InlineCode>volumes:</InlineCode> periodically — that&apos;s where your database and files live.
        </p>
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
          Entra en railway.app y pulsa <strong>Login</strong> → inicia sesión con tu cuenta de GitHub (es el método principal,
          Railway está pensado para desplegar directo desde repositorios e imágenes). No hace falta tarjeta para empezar, pero
          para pasar al plan Hobby ($5/mes, necesario para mantener un servicio activo permanentemente) tendrás que añadir una.
        </p>
      </>
    ),
  },
  {
    icon: Rocket,
    title: "2. El camino más rápido: la plantilla oficial de la herramienta",
    time: "~2 min",
    body: (
      <>
        <p>
          La forma más fiable de desplegar en Railway es con su plantilla oficial verificada: en la ficha de la herramienta en
          AltFreeStack, busca el botón <strong>&quot;Desplegar en Railway&quot;</strong> — aparece cuando esa herramienta tiene una
          plantilla verificada — y púlsalo. Te lleva directo a Railway con todos los servicios (app + base de datos si hace falta)
          y variables ya preconfiguradas; solo tienes que revisar los valores y pulsar <strong>Deploy</strong>.
        </p>
        <p className="mt-2">
          Si tu herramienta todavía no tiene una plantilla verificada en nuestro catálogo, sigue el paso 3 para desplegarla a mano,
          o usa las guías de DigitalOcean/Vultr de esta misma página, que funcionan con el docker-compose.yml de cualquier
          herramienta.
        </p>
      </>
    ),
  },
  {
    icon: Package,
    title: "3. Alternativa: desplegar manualmente desde un docker-compose.yml",
    time: "~10 min",
    body: (
      <>
        <p>
          En el panel de Railway, pulsa <strong>New Project</strong> → <strong>Empty Project</strong>. Dentro del proyecto, por cada
          servicio que aparezca en el docker-compose.yml de tu herramienta:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            Para el servicio principal de la app: pulsa <strong>+ Create</strong> → <strong>Docker Image</strong> y pega el nombre
            de la imagen que aparece en la línea <InlineCode>image:</InlineCode> del docker-compose.yml (ej.{" "}
            <InlineCode>n8nio/n8n:latest</InlineCode>).
          </li>
          <li>
            Para una base de datos (Postgres, MySQL, Redis...): es más simple pulsar <strong>+ Create</strong> →{" "}
            <strong>Database</strong> y elegirla del catálogo gestionado de Railway, en vez de crear tú el contenedor a mano.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: FileCode,
    title: "4. Configura las variables de entorno",
    time: "~5 min",
    body: (
      <>
        <p>
          Entra al servicio de la app → pestaña <strong>Variables</strong> → <strong>+ New Variable</strong>. Añade cada línea del
          docker-compose.yml original que tenga un valor <InlineCode>change-me...</InlineCode> (cámbialo por uno real y seguro), más
          las que conecten un servicio con otro — por ejemplo la URL de la base de datos, que Railway te muestra ya lista en la
          pestaña &quot;Variables&quot; de ese servicio de base de datos, para copiar y pegar.
        </p>
      </>
    ),
  },
  {
    icon: Globe,
    title: "5. Genera tu dominio y comprueba que está activo",
    time: "~3 min",
    body: (
      <>
        <p>
          En el servicio de la app → <strong>Settings</strong> → <strong>Networking</strong> → <strong>Generate Domain</strong> te
          da gratis un subdominio <InlineCode>*.up.railway.app</InlineCode> con HTTPS automático. Si prefieres el tuyo propio, usa{" "}
          <strong>+ Custom Domain</strong> — te pedirá crear un registro CNAME en tu proveedor de DNS.
        </p>
        <p className="mt-2">
          Ve a la pestaña <strong>Deployments</strong> para ver los logs en vivo — cuando el estado pase de
          &quot;Building&quot;/&quot;Deploying&quot; a <strong>Active</strong>, tu herramienta ya está accesible en la URL de
          arriba.
        </p>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: "6. Mantenimiento",
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
          Go to railway.app and click <strong>Login</strong> → sign in with your GitHub account (it&apos;s the main method — Railway is
          built around deploying directly from repos and images). No card needed to start, but to move to the Hobby plan ($5/mo,
          needed to keep a service running permanently) you&apos;ll have to add one.
        </p>
      </>
    ),
  },
  {
    icon: Rocket,
    title: "2. The fastest path: the tool's official template",
    time: "~2 min",
    body: (
      <>
        <p>
          The most reliable way to deploy on Railway is its official verified template: on the tool&apos;s page on AltFreeStack, look
          for the <strong>&quot;Deploy on Railway&quot;</strong> button — it shows up when that tool has a verified template — and click it.
          It takes you straight to Railway with every service (app + database if needed) and variable already pre-filled; just
          review the values and click <strong>Deploy</strong>.
        </p>
        <p className="mt-2">
          If your tool doesn&apos;t have a verified template in our catalog yet, follow step 3 to deploy it manually, or use the
          DigitalOcean/Vultr guides on this same page, which work with any tool&apos;s docker-compose.yml.
        </p>
      </>
    ),
  },
  {
    icon: Package,
    title: "3. Alternative: deploy manually from a docker-compose.yml",
    time: "~10 min",
    body: (
      <>
        <p>
          In the Railway dashboard, click <strong>New Project</strong> → <strong>Empty Project</strong>. Inside the project, for
          each service in your tool&apos;s docker-compose.yml:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            For the main app service: click <strong>+ Create</strong> → <strong>Docker Image</strong> and paste the image name from
            the <InlineCode>image:</InlineCode> line of the docker-compose.yml (e.g. <InlineCode>n8nio/n8n:latest</InlineCode>).
          </li>
          <li>
            For a database (Postgres, MySQL, Redis...): it&apos;s simpler to click <strong>+ Create</strong> → <strong>Database</strong>{" "}
            and pick it from Railway&apos;s managed catalog instead of building the container yourself.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: FileCode,
    title: "4. Set the environment variables",
    time: "~5 min",
    body: (
      <>
        <p>
          Open the app service → <strong>Variables</strong> tab → <strong>+ New Variable</strong>. Add every line from the original
          docker-compose.yml with a <InlineCode>change-me...</InlineCode> value (replace it with a real, secure one), plus the ones
          that connect one service to another — for example the database URL, which Railway already shows you ready to copy on
          that database service&apos;s &quot;Variables&quot; tab.
        </p>
      </>
    ),
  },
  {
    icon: Globe,
    title: "5. Generate your domain and confirm it's live",
    time: "~3 min",
    body: (
      <>
        <p>
          On the app service → <strong>Settings</strong> → <strong>Networking</strong> → <strong>Generate Domain</strong> gives you
          a free <InlineCode>*.up.railway.app</InlineCode> subdomain with automatic HTTPS. If you&apos;d rather use your own, click{" "}
          <strong>+ Custom Domain</strong> — it&apos;ll ask you to create a CNAME record with your DNS provider.
        </p>
        <p className="mt-2">
          Check the <strong>Deployments</strong> tab for live logs — once the status moves from &quot;Building&quot;/&quot;Deploying&quot; to{" "}
          <strong>Active</strong>, your tool is already reachable at the URL above.
        </p>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: "6. Maintenance",
    time: "recurring",
    body: (
      <>
        <p>
          Railway doesn&apos;t need manual update commands: if you connected a GitHub repo, every push redeploys automatically; if you
          used a plain Docker image, change the tag on the service and click <strong>Redeploy</strong>. Railway&apos;s managed
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
