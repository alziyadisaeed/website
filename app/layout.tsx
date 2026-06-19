// Root layout — minimal wrapper. Locale-specific layout is in app/[locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
