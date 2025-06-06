import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* NAVIGATION WRAPPER */}
      <div className="flex flex-1">
        {/* LEFT */}
        <div className="w-[16%] min-w-[120px] max-w-[207px] p-4 bg-white border-r border-gray-200 shadow-sm flex flex-col">
          <Link
            href="/"
            className="flex items-center gap-2 px-2 py-2 rounded-xl pl-4"
          >
            <Image
              src="/logo.png"
              alt="logo"
              width={32}
              height={32}
              className="inline-block"
            />
            <span className="hidden xl:inline-block text-lg font-bold text-gray-700">
              SIMCademy
            </span>
          </Link>
          <Menu />
        </div>

        {/* RIGHT */}
        <div className="flex-1 bg-[#F7F8FA] flex flex-col overflow-hidden">
          <Navbar />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}