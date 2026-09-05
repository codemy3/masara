"use client";

import { useActionState, useState } from "react";
import { login, resetPassword } from "@/app/admin/actions";
import Image from "next/image";

type ActionState = { error?: string; success?: boolean };

const initialLoginState: ActionState = { error: "" };
const initialResetState: ActionState = { error: "", success: false };

export default function AdminLogin() {
  const [mode, setMode] = useState<"login" | "forgot">("login");
  
  const [loginState, loginAction, isLoginPending] = useActionState(
    async (prevState: ActionState, formData: FormData): Promise<ActionState> => await login(formData), 
    initialLoginState
  );
  
  const [resetState, resetAction, isResetPending] = useActionState(
    async (prevState: ActionState, formData: FormData): Promise<ActionState> => await resetPassword(formData),
    initialResetState
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#3D081A] relative overflow-hidden font-sans">
      
      {/* Background Accent */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <Image 
          src="/images/logo/logo-dark.webp" 
          alt="Pattern" 
          fill 
          className="object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 py-12 bg-[#F5E9D5] rounded-lg shadow-2xl m-4">
        <div className="w-full flex flex-col items-center mb-8">
          <div className="w-16 h-16 relative mb-4">
            <Image 
              src="/images/logo/logo-dark.webp"  
              alt="Masara Admin" 
              fill 
              className="object-contain"
            />
          </div>
          <h1 className="font-serif text-3xl text-[#3D081A] tracking-tight">MASARA</h1>
          <p className="text-[#CBA365] text-xs uppercase tracking-widest mt-1">Menu Manager</p>
        </div>

        {mode === "login" ? (
          <form action={loginAction} className="flex flex-col gap-5">
            {loginState?.error && (
              <div className="p-3 bg-red-100 text-red-800 text-sm rounded border border-red-200 text-center">
                {loginState.error}
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider text-[#3D081A] font-medium" htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email"
                name="email" 
                required
                className="w-full bg-transparent border-b border-[#3D081A]/30 pb-2 pt-1 px-1 focus:outline-none focus:border-[#CBA365] transition-colors text-[#3D081A]"
                placeholder="admin@masara.in"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider text-[#3D081A] font-medium" htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password"
                name="password" 
                required
                className="w-full bg-transparent border-b border-[#3D081A]/30 pb-2 pt-1 px-1 focus:outline-none focus:border-[#CBA365] transition-colors text-[#3D081A]"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoginPending}
              className="mt-4 w-full bg-[#3D081A] text-[#F5E9D5] py-3 text-sm uppercase tracking-widest hover:bg-[#2A0511] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoginPending ? "Authenticating..." : "Sign In"}
            </button>

            <button 
              type="button" 
              onClick={() => setMode("forgot")}
              className="mt-2 text-xs text-[#3D081A]/60 hover:text-[#CBA365] transition-colors self-center"
            >
              Forgot Password?
            </button>
          </form>
        ) : (
          <form action={resetAction} className="flex flex-col gap-5">
            <h2 className="text-center text-[#3D081A] font-medium mb-2">Reset Password</h2>
            
            {resetState?.success ? (
              <div className="p-4 bg-green-50 text-green-800 text-sm rounded border border-green-200 text-center flex flex-col gap-3">
                <p>If an account exists for that email, a password reset link has been sent.</p>
                <button 
                  type="button" 
                  onClick={() => setMode("login")}
                  className="text-xs font-semibold uppercase tracking-wider underline hover:text-green-600"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <>
                {resetState?.error && (
                  <div className="p-3 bg-red-100 text-red-800 text-sm rounded border border-red-200 text-center">
                    {resetState.error}
                  </div>
                )}
                
                <p className="text-sm text-[#3D081A]/70 text-center mb-2">
                  Enter your email address and we&apos;ll send you a link to reset your password.
                </p>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#3D081A] font-medium" htmlFor="reset-email">Email</label>
                  <input 
                    type="email" 
                    id="reset-email"
                    name="email" 
                    required
                    className="w-full bg-transparent border-b border-[#3D081A]/30 pb-2 pt-1 px-1 focus:outline-none focus:border-[#CBA365] transition-colors text-[#3D081A]"
                    placeholder="admin@masara.in"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isResetPending}
                  className="mt-4 w-full bg-[#3D081A] text-[#F5E9D5] py-3 text-sm uppercase tracking-widest hover:bg-[#2A0511] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isResetPending ? "Sending..." : "Send Reset Link"}
                </button>

                <button 
                  type="button" 
                  onClick={() => setMode("login")}
                  className="mt-2 text-xs text-[#3D081A]/60 hover:text-[#CBA365] transition-colors self-center"
                >
                  Back to Sign In
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
