import { ThemeSwitcher } from "@/components/footer/theme-switcher";
import Link from "next/link";

function Footer() {
  return (
    <footer className="flex items-center justify-center border-t mx-auto text-center text-xs gap-8 h-11">
      <p>
        Powered by&nbsp;
        <Link
          href="#"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Cellular
        </Link>
      </p>
      <ThemeSwitcher />
    </footer>
  );
}

export { Footer };