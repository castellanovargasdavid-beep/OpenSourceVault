"use client";

import { useEffect } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function ErrorEn({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-medium text-red-600">Error</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Something went wrong</h1>
      <p className="mt-4 text-slate-600">
        An unexpected error occurred while loading this page. You can try again or go back home.
      </p>
      <div className="mt-8 flex gap-3">
        <button onClick={() => reset()} className={buttonVariants({ variant: "outline" })}>
          Try again
        </button>
        <Link href="/en" className={buttonVariants({})}>
          Back to home
        </Link>
      </div>
    </div>
  );
}
