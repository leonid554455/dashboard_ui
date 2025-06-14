import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

const Navbar = async () => {

  const user = await currentUser()

  return (
    <div className="flex items-center justify-between px-6 py-4 backdrop-blur-md w-full">
      {/* SEARCH */}
      <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-all bg-transparent min-w-[260px] max-w-[320px] flex-shrink">
        <Image src="/search.png" alt="Search" width={16} height={16} />
        <input
          type="text"
          placeholder="Search..."
          className="flex-grow bg-transparent outline-none placeholder-gray-400 text-sm"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-6 min-w-fit">
        {/* ICONS GROUP */}
        <div className="flex items-center gap-2">
          {/* Chat Icon */}
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition duration-200 mr-1">
            <Image src="/message.png" alt="Messages" width={21} height={21} />
          </button>

          {/* Notification Icon with Badge */}
          <div className="relative mr-1">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition duration-200">
              <Image src="/announcement.png" alt="Notifications" width={21} height={21} />
            </button>
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">
              1
            </span>
          </div>
        </div>

        {/* USER INFO */}
        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <p className="text-sm font-semibold text-gray-800">Grăsun Leonid</p>
            <p className="text-xs text-gray-500">{user?.publicMetadata?.role as string}</p>
          </div>
          {/* <Image
            src="/avatar.png"
            alt="User avatar"
            width={42}
            height={42}
            className="rounded-full border border-gray-300 shadow-sm"
          /> */}
          <UserButton/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
