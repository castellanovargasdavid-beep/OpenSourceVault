import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFoundEn() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-medium text-emerald-600">404</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">We couldn&apos;t find that page</h1>
      <p className="mt-4 text-slate-600">
        The tool you&apos;re looking for might not be in our catalog yet, or the link may be broken.
      </p>
      <Link href="/en" className={buttonVariants({ className: "mt-8" })}>
        Back to home
      </Link>
    </div>
  );
}
