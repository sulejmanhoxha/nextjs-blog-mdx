export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return <main className="prose prose-slate mx-auto px-4">{children}</main>;
}
