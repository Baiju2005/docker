
import { Link } from "react-router-dom";

const Home = () => {
  const isLoggedIn = Boolean(localStorage.getItem("authToken"));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>

      {isLoggedIn ? (
        <Link to="/profile" className="mt-4 text-blue-500 hover:underline">
          Go to Profile
        </Link>
      ) : (
        <div className="mt-4 flex gap-4">
          <Link to="/login" className="text-blue-500 hover:underline">
            Go to Login
          </Link>
          <Link to="/register" className="text-blue-500 hover:underline">
            Go to Register
          </Link>
        </div>
      )}
      
    </div>
  );
};

export default Home;