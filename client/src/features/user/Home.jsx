
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
        <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
        <Link to="/login" className="text-blue-500 hover:underline">
          Go to Login
        </Link>

        <Link to="/register" className="text-blue-500 hover:underline ml-4">
          Go to Register
        </Link>
    </div>
  )
}

export default Home;