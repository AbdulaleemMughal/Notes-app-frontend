import { Eye, EyeClosed } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { LogInInterface } from "../Interfaces/auth.interfaces";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../store/UserSlice";
import toast from "react-hot-toast";

export const Login = () => {
  const [userData, setUserData] = useState<LogInInterface>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (field: keyof LogInInterface, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(BASE_URL + "/auth/login", userData, {
        withCredentials: true,
      });

      dispatch(addUser(res.data.data));
      navigate(`/notes/${res.data.data._id}`);
      toast.success("Log In successfull..");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center max-sm:items-start max-sm:mt-20">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={userData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="w-full flex gap-2 px-4 py-2 border rounded-lg">
              <input
                type={!showPassword ? "password" : "text"}
                className="outline-none flex-1"
                value={userData.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <span
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <EyeClosed size={20} /> : <Eye />}
              </span>
            </div>
            {error && (
              <p className="text-red-500 text-center mt-2 text-[14px]">
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Login
          </button>
          <p className="text-center mt-3">
            New User, then{" "}
            <span className="text-blue-600 ml-1 underline cursor-pointer">
              <Link to={"/signup"}>Sign Up</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
