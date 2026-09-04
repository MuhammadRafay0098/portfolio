export default function Footer() {
  return (
    <footer className="py-8 border-t border-slate-900 text-center text-xs text-slate-600">
      © {new Date().getFullYear()} Muhammad Rafay. Built with Next.js, Tailwind CSS &amp; Framer Motion.
    </footer>
  );
}
