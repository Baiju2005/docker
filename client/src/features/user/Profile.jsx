import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import authApi from "../../services/authApi";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      return;
    }
l
    let isActive = true;

    const loadProfile = async () => {
      try {
        const profile = await authApi.getCurrentUser(token);
        if (isActive) {
          setName(profile.name);
        }
      } catch (requestError) {
        localStorage.removeItem("authToken");
        if (isActive) {
          navigate("/login", {
            replace: true,
            state: {
              message:
                requestError?.message ||
                "Your session could not be verified. Please sign in again.",
            },
          });
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isActive = false;
    };
  }, [navigate, token]);

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "Please sign in to view your profile." }}
      />
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <section className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg">
        {isLoading ? (
          <p role="status" className="text-gray-600">
            Loading profile...
          </p>
        ) : name ? (
          <h1 className="text-3xl font-bold text-gray-900">Hi {name}</h1>
        ) : null}
        <Link
          to="/"
          className="mt-6 inline-block font-semibold text-blue-600 hover:text-blue-700"
        >
          Home
        </Link>
      </section>
    </main>
  );
};

export default Profile;
