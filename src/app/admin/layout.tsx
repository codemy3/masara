import { logout } from "@/app/admin/actions";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5E9D5] text-[#3D081A] font-sans selection:bg-[#3D081A] selection:text-[#F5E9D5]">
      {/* Admin Header */}
      <header className="w-full border-b border-[#3D081A]/10 bg-[#F5E9D5] sticky top-0 z-50">
        <div className="container mx-auto px-6 max-w-6xl h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-serif text-xl tracking-tight text-[#3D081A]">MASARA</span>
            <span className="text-[#3D081A]/30">|</span>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium">Menu Manager</span>
          </div>
          
          <form action={logout}>
            <button 
              type="submit"
              className="text-xs uppercase tracking-wider font-medium text-[#3D081A]/60 hover:text-[#3D081A] transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>
      
      <main className="container mx-auto px-6 max-w-6xl py-8 md:py-12">
        {children}
      </main>
    </div>
  );
}
