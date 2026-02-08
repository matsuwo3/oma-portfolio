import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] px-6 py-12">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/icon.webp"
            alt="おま"
            width={24}
            height={24}
            className="h-6 w-6 rounded-lg object-cover"
          />
          <span className="text-xs font-medium text-text-secondary md:text-sm">
            おまポートフォリオ
          </span>
        </div>
        <p className="text-xs text-text-secondary md:text-sm">
          &copy; {new Date().getFullYear()} おま
        </p>
      </div>
    </footer>
  );
}
