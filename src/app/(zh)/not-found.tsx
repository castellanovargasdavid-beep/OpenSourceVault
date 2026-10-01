import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFoundZh() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-medium text-emerald-600">404</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">找不到这个页面</h1>
      <p className="mt-4 text-slate-600">
        中文版目前只收录了 AI/LLM 与 self-hosting 相关的首批工具与对比页面——你要找的页面可能还没有中文版，或者链接有误。
      </p>
      <Link href="/zh" className={buttonVariants({ className: "mt-8" })}>
        返回首页
      </Link>
    </div>
  );
}
