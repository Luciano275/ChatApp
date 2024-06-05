import Footer from "@/components/ui/Footer";
import mediaStyles from '@/styles/medias.module.css'

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`min-h-dvh max-h-dvh flex flex-col overflow-y-auto bg-gray-950 py-4 ${className} ${mediaStyles['initial_container']}`}
    >
      {children}
      <Footer />
    </div>
  );
}