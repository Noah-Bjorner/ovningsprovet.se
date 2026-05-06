import "katex/dist/katex.min.css";
import "mathlive/fonts.css";

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
