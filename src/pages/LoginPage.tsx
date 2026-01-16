import type React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "@/store/slices/authSlice";
import { useLoginMutation } from "@/store/api/authApi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      const res = await login({ email, password }).unwrap();

      dispatch(setCredentials({ token: res.access_token, user: res.user }));
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 light:from-slate-50 light:via-slate-100 light:to-slate-200">
      <div className="w-full max-w-md px-4">
        <div className="bg-white dark:bg-slate-800 light:bg-slate-50 rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-orange-600 mb-2">
              ANG Growth
            </h1>
            <p className="text-slate-600 dark:text-slate-400 light:text-slate-700">
              Channel Management System
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 light:text-slate-800 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 light:border-slate-200 rounded-lg bg-white dark:bg-slate-700 light:bg-slate-50 text-slate-900 dark:text-white light:text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-text"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 light:text-slate-800 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 light:border-slate-200 rounded-lg bg-white dark:bg-slate-700 light:bg-slate-50 text-slate-900 dark:text-white light:text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-text"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400 light:text-slate-700 mt-6">
            Demo: Use any email/password
          </p>
        </div>
      </div>
    </div>
  );
}
