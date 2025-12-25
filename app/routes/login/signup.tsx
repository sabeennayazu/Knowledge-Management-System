import React, { useState } from "react";
import { Link } from "react-router";

export const meta = () => [
  { title: "Create Account" },
  { name: "description", content: "Sign up for a new account" },
];

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

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
          <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white text-2xl">⚙️</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Create Account</h1>
          <p className="text-sm text-gray-700 dark:text-gray-300">Please enter your details to sign up.</p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-xs text-gray-700 dark:text-gray-200">Full Name</span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full border rounded-md px-4 py-3 bg-white/80 dark:bg-gray-900/50"
            />
          </label>

          <label className="block">
            <span className="text-xs text-gray-700 dark:text-gray-200">EMAIL/ USERNAME</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border rounded-md px-4 py-3 bg-white/80 dark:bg-gray-900/50"
            />
          </label>

          <label className="block relative">
            <span className="text-xs text-gray-700 dark:text-gray-200">PASSWORD</span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border rounded-md px-4 py-3 pr-10 bg-white/80 dark:bg-gray-900/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-9 text-gray-600 dark:text-gray-300"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.58 10.58a3 3 0 104.24 4.24"/><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9.88 5.11A11.96 11.96 0 0121 12c-1.13 3.12-3.85 5.77-7.22 7.07"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2.03 12.4A11.99 11.99 0 0112 4c4.11 0 7.64 2.16 9.97 5.6a11.99 11.99 0 01-19.94 2.8z"/><circle cx="12" cy="12" r="3" strokeWidth="1.5"/></svg>
              )}
            </button>
          </label>

          <label className="block">
            <span className="text-xs text-gray-700 dark:text-gray-200">ROLE</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full border rounded-md px-4 py-3 bg-white/80 dark:bg-gray-900/50"
            >
              <option value="">Select role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="w-4 h-4" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Agree to Terms &amp; Conditions</span>
          </label>

          <button disabled={!agree} className="w-full bg-teal-700 hover:bg-teal-600 disabled:opacity-60 text-white font-semibold py-3 rounded-md">Sign Up</button>

          <div className="text-center text-sm text-gray-700 dark:text-gray-300">
            Already have an account ? <Link to="/" className="underline font-semibold">Login</Link>
          </div>
        </div>
      </form>
    </main>
  );
}
