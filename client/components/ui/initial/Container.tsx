import Footer from "@/components/ui/Footer";

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col justify-center bg-gray-950 py-4 ${className}`}
    >
      {children}
      <Footer />
    </div>
  );
}