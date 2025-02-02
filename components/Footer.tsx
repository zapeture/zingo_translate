"use client";

export default function Footer() {
  return (
    <footer className="mt-10 text-center text-sm text-gray-600">
      © {new Date().getFullYear()}{" "}
      <a
        href="https://fortunezviregei.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-900 hover:underline font-bold"
      >
        Fortune Zviregei
      </a>
    </footer>
  );
}
