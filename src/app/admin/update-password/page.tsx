"use client";

import { useActionState } from "react";
import { updatePassword } from "@/app/admin/actions";
import Image from "next/image";

type ActionState = { error?: string };
const initialState: ActionState = { error: "" };

export default function UpdatePassword() {
  const [state, action, isPending] = useActionState(
    async (prevState: ActionState, formData: FormData): Promise<ActionState> => await updatePassword(formData),
    initialState
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
          <p className="text-[#CBA365] text-xs uppercase tracking-widest mt-1">Set New Password</p>
        </div>

        <form action={action} className="flex flex-col gap-5">
          {state?.error && (
            <div className="p-3 bg-red-100 text-red-800 text-sm rounded border border-red-200 text-center">
              {state.error}
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider text-[#3D081A] font-medium" htmlFor="password">New Password</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              required
              minLength={6}
              className="w-full bg-transparent border-b border-[#3D081A]/30 pb-2 pt-1 px-1 focus:outline-none focus:border-[#CBA365] transition-colors text-[#3D081A]"
              placeholder="••••••••"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider text-[#3D081A] font-medium" htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword"
              name="confirmPassword" 
              required
              minLength={6}
              className="w-full bg-transparent border-b border-[#3D081A]/30 pb-2 pt-1 px-1 focus:outline-none focus:border-[#CBA365] transition-colors text-[#3D081A]"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="mt-4 w-full bg-[#3D081A] text-[#F5E9D5] py-3 text-sm uppercase tracking-widest hover:bg-[#2A0511] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
