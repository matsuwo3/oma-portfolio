import Image from "next/image";

export function Footer() {
  return (
    <footer className="px-6 py-8">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/icon.webp"
            alt="おま"
            width={24}
            height={24}
            className="h-6 w-6 rounded-lg object-cover"
          />
          <span className="text-xs font-medium text-text-secondary">
            おまポートフォリオ
          </span>
        </div>
        <p className="text-xs text-text-secondary">
          &copy; {new Date().getFullYear()} おま
        </p>
      </div>
    </footer>
  );
}
