import Sidebar from "@/components/Sidebar";

export default function StudentLayout({ children }) {
  return (
    <div className="font-mono flex min-h-screen bg-[#FFF7ED]" 
         style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}>
      
      <Sidebar />

      <main className="flex-1 p-4 md:p-10 overflow-y-auto relative pt-24 lg:pt-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Content Wrapper */}
          <div className="min-h-[85vh] bg-white border-4 border-black rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] md:shadow-[20px_20px_0px_0px_rgba(15,23,42,1)] p-6 md:p-12 relative overflow-hidden">
            
            {/* Corner Tag */}
            <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none hidden sm:block">
              <div className="absolute top-4 -right-10 w-40 h-10 bg-[#FB923C] border-2 border-black rotate-45 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-[10px] font-black text-black uppercase tracking-widest italic">STU-2026</span>
              </div>
            </div>

            {children}
          </div>
        </div>
      </main>
    </div>
  );
}