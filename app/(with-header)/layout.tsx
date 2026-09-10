import Header from "@/components/shared/Header";

export default function WithHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-cream text-pine min-h-screen">
      <Header />
      {children}
    </div>
  );
}
