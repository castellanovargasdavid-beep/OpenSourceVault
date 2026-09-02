import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HostingGuideContent, getHostingGuideMeta, type HostingProviderId } from "@/components/pages/hosting-guide-content";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getHostingGuideHref } from "@/lib/routes";

const providers: HostingProviderId[] = ["digitalocean", "vultr", "railway"];

interface PageProps {
  params: Promise<{ provider: string }>;
}

export function generateStaticParams() {
  return providers.map((provider) => ({ provider }));
}

function isValidProvider(value: string): value is HostingProviderId {
  return (providers as string[]).includes(value);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { provider } = await params;
  if (!isValidProvider(provider)) return {};

  const t = getDictionary("en");
  const meta = getHostingGuideMeta(provider);
  const title = t.hostingGuidePage.metaTitle(meta.name);
  const description = t.hostingGuidePage.metaDescription(meta.name);
  const url = `${siteConfig.url}${getHostingGuideHref(provider, "en")}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: `${siteConfig.url}${getHostingGuideHref(provider, "es")}`, en: url },
    },
    openGraph: { title, description, url },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function HostingGuidePageEn({ params }: PageProps) {
  const { provider } = await params;
  if (!isValidProvider(provider)) notFound();

  return <HostingGuideContent provider={provider} locale="en" />;
}
