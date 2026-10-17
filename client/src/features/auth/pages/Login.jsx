import { LockKeyhole } from "lucide-react";
import { useState } from "react";
import authApi from "../../../services/authApi";

const Login = () => {
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      email: e.currentTarget.email.value.trim(),
      password: e.currentTarget.password.value,
    };

    setError("");
    setCurrentUser(null);
    setIsSubmitting(true);

    try {
      const loginResponse = await authApi.login(credentials);
      localStorage.setItem("authToken", loginResponse.token);
      const profile = await authApi.getCurrentUser(loginResponse.token);
      setCurrentUser({ ...loginResponse.user, profile });
    } catch (requestError) {
      setError(requestError?.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white">
          <LockKeyhole size={28} />
        </div>

        <h1 className="text-center text-3xl font-bold text-gray-900">
          Welcome back
        </h1>
        <p className="mt-2 mb-8 text-center text-sm text-gray-500">
          Please enter your details to sign in.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {currentUser && (
          <p role="status" className="mt-4 text-center text-sm text-green-600">
            {currentUser.profile || `Welcome, ${currentUser.name}`}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
