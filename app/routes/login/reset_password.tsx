import React, { useState } from "react";

export const meta = () => [
  { title: "Reset Password" },
  { name: "description", content: "Reset your account password" },
];

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  return (
    <main
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/assets/login_signup_forgetpass.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/30" aria-hidden />

      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative z-10 w-[760px] max-w-[95%] bg-white/20 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-lg"
      >
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white text-xl">🔑</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Reset Password</h1>
          <p className="text-sm text-gray-700 dark:text-gray-300">Enter your email to reset your password</p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-xs text-gray-700 dark:text-gray-200">YOUR EMAIL ADDRESS</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full border rounded-md px-4 py-3 bg-white/80 dark:bg-gray-900/50"
            />
          </label>

          <button className="w-full bg-teal-700 hover:bg-teal-600 text-white font-semibold py-3 rounded-md">Reset Password</button>

          <div className="text-center text-sm text-gray-700 dark:text-gray-300">
            <span>Remembered your password ? </span>
            <a href="/" className="underline font-semibold">Login</a>
          </div>
        </div>
      </form>
    </main>
  );
}
