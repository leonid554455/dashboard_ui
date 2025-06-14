"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const spinSlowStyle = {
  animation: "spin 20s linear infinite",
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);


  const { isLoaded, isSignedIn, user } = useUser()

    const router = useRouter();

    useEffect(() => {
    const role = user?.publicMetadata.role;

    if (role) {
    router.push(`/${role}`);
    }
    }, [user, router]);

  return (
    <div className="relative h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#005B9F] to-[#3FCBFF] overflow-hidden">
      {/* ✅ Background FX */}
      <div className="absolute w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-16 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-ping" />
        <div
          className="absolute top-1/3 left-1/2 w-52 h-52 bg-blue-300/10 rounded-full blur-[100px]"
          style={spinSlowStyle}
        />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-200/10 rounded-full blur-[80px] animate-pulse" />

        {/* ✅ Flying particles / snow dots */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* ✅ Login Form */}
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="z-10 backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-2xl shadow-2xl w-[360px] flex flex-col gap-4"
        >
          <div className="text-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={41}
              height={41}
              style={{ display: "block", marginLeft: "116px", marginBottom: "18px" }}
              className="mb-1"
            />
            <h1 className="text-white text-2xl font-semibold">SIMCademy</h1>
            <h2 className="text-blue-100 text-sm">Sign in to your account</h2>
          </div>

          <Clerk.GlobalError className="text-sm text-red-300 text-center" />

          {/* Username Field */}
          <Clerk.Field name="identifier" className="flex flex-col gap-1">
            <Clerk.Label className="text-[13px] text-white/70">Username</Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 h-10 text-left rounded-md bg-white/20 text-white placeholder:text-white/50 placeholder:text-[13px] focus:ring-2 ring-white/30 outline-none"
              placeholder="Enter your id"
            />
            <Clerk.FieldError className="text-sm text-red-300" />
          </Clerk.Field>

          {/* Password Field */}
          <Clerk.Field name="password" className="flex flex-col gap-1">
            <Clerk.Label className="text-[13px] text-white/70">Password</Clerk.Label>
            <div className="relative">
              <Clerk.Input
                type={showPassword ? "text" : "password"}
                required
                className="p-2 h-10 pr-10 w-full text-left rounded-md bg-white/20 text-white placeholder:text-white/50 placeholder:text-[13px] focus:ring-2 ring-white/30 outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white/70 hover:text-white transition"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <Clerk.FieldError className="text-sm text-red-300" />
          </Clerk.Field>

          <div className="text-right text-xs text-blue-200 cursor-pointer hover:underline">
            Forgot Password?
          </div>

          <SignIn.Action submit className="bg-white text-blue-600 font-semibold rounded-md text-sm p-2 hover:bg-blue-100 transition">
            Sign In
          </SignIn.Action>

          <div className="text-center text-white/70 text-sm">
            Don’t have an account yet?
            <br />
            <span className="text-white underline cursor-pointer">Register for free</span>
          </div>
        </SignIn.Step>
      </SignIn.Root>

      <style jsx>{`
        .particle {
          position: absolute;
          top: -10px;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 9999px;
          animation: floatUp 10s linear infinite;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(100vh) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-10vh) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
