"use client";

import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen w-full bg-[#f5f7fb]">
      <div className="mx-auto flex min-h-screen max-w-[1200px] items-center px-4 py-8">
        <div className="grid w-full grid-cols-1 overflow-hidden rounded-2xl border border-[#e6ebf2] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)] lg:grid-cols-2">
          <div className="bg-[linear-gradient(135deg,#0b1220_0%,#1e3a8a_55%,#2563eb_100%)] p-8 text-white md:p-12">
            <div className="text-[28px] font-bold leading-tight">Modern Electronics Ltd</div>
            <p className="mt-3 max-w-md text-[16px] text-white/80">
              Sign in to manage products, homepage sections, orders, and storefront content from one dashboard.
            </p>
            <ul className="mt-8 space-y-3 text-[14px] text-white/85">
              <li>Centralized frontend content management</li>
              <li>Catalog and inventory controls</li>
              <li>Campaign and reporting overview</li>
            </ul>
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-[28px] font-semibold text-[#111827]">Welcome back</h1>
            <p className="mt-2 text-[14px] text-[#6b7280]">Login to access your admin dashboard</p>

            <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <label className="block">
                <span className="mb-1 block text-[14px] font-medium text-[#374151]">Email</span>
                <div className="flex items-center gap-2 rounded-xl border border-[#d5dbe5] px-3 py-3 focus-within:border-[#2563eb]">
                  <Mail size={18} className="text-[#6b7280]" />
                  <input
                    type="email"
                    placeholder="admin@modern.co.ug"
                    className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#9aa3b2]"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-1 block text-[14px] font-medium text-[#374151]">Password</span>
                <div className="flex items-center gap-2 rounded-xl border border-[#d5dbe5] px-3 py-3 focus-within:border-[#2563eb]">
                  <Lock size={18} className="text-[#6b7280]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#9aa3b2]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-[#6b7280] hover:text-[#111827]"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              <div className="flex items-center justify-between pt-1 text-[14px]">
                <label className="inline-flex items-center gap-2 text-[#4b5563]">
                  <input type="checkbox" className="h-4 w-4 rounded border-[#d1d5db]" />
                  Remember me
                </label>
                <button type="button" className="font-medium text-[#2563eb] hover:underline">
                  Forgot password?
                </button>
              </div>

              <Link
                href="/admin"
                className="inline-flex w-full items-center justify-center rounded-xl bg-[#111827] px-4 py-3 text-[15px] font-semibold text-white hover:bg-black"
              >
                Sign In
              </Link>
            </form>

            <p className="mt-6 text-center text-[14px] text-[#6b7280]">
              Need help?{" "}
              <Link href="/" className="font-medium text-[#2563eb] hover:underline">
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

