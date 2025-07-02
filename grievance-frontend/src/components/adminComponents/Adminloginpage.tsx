"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminLoginPage({
  onLogin,
  onSwitchToStudent,
}: {
  onLogin?: (user: unknown, token: string) => void;
  onSwitchToStudent?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://grievanceportal.vercel.app/api/v1/admin/auth/simple-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log(data);
      
      if (!res.ok) throw new Error(data.message || "Login failed");


      // Use AuthContext login with the full data object
      login(data, "admin");

      if (onLogin) {
        onLogin(data.admin, data.token); // Pass admin object and token
      }
      // Redirect to dashboard
      console.log("Login successful, redirecting...");
      router.push("/grievance/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent"></div>
      </div>

      <div className="relative group">
        {/* Animated Lamp */}
        <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-out group-hover:translate-y-8 z-10">
          {/* Lamp cord */}
          <div className="w-0.5 h-24 bg-yellow-300 mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Lamp fixture */}
          <div className="relative">
            {/* Lamp shade */}
            <div className="w-16 h-12 bg-gradient-to-b from-white to-gray-200 rounded-b-full border-2 border-yellow-400 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/50 to-yellow-300/30"></div>
            </div>

            {/* Light bulb glow */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Lamp aura/light effect */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 opacity-0 group-hover:opacity-60 transition-all duration-700 ease-out group-hover:w-96 group-hover:h-96">
              <div className="w-full h-full bg-gradient-radial from-yellow-200/40 via-yellow-100/20 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-yellow-400 p-8 rounded-lg shadow-2xl w-full max-w-sm relative z-20 transition-all duration-300 group-hover:shadow-yellow-400/50 group-hover:shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-black">
            Admin Login
          </h2>

          {error && (
            <div className="mb-4 text-black bg-yellow-200 border border-yellow-400 p-2 rounded text-sm text-center">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              className="block mb-2 font-semibold text-black"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black rounded focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 bg-white text-black placeholder-gray-500 transition-all duration-300"
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label
              className="block mb-2 font-semibold text-black"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black rounded focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 bg-white text-black placeholder-gray-500 transition-all duration-300"
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-yellow-400 py-3 rounded-lg font-bold hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-105 border-2 border-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-6 text-center text-black">
            Are you a student?{" "}
            <button
              type="button"
              onClick={onSwitchToStudent}
              className="text-yellow-600 hover:text-yellow-400 font-semibold hover:underline transition-colors duration-300"
            >
              Go to Student Login
            </button>
          </p>
        </form>
      </div>

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}
