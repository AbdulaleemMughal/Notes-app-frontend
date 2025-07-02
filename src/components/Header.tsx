import { LogOut, Notebook, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import toast from "react-hot-toast";
import { removeUser } from "../store/UserSlice";
import { useNavigate } from "react-router";
import { RootState } from "../store/appStore";

export const Header = () => {
  const loggedInUser = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
      toast.success("Logout successfull...");
    } catch (err) {
      toast.error("Error Logining out..");
    }
  };

  return (
    <>
      <div className="p-6 flex justify-between  items-center shadow-lg max-sm:p-2">
        <div className="flex items-center gap-2 max-sm:gap-1">
          <Notebook size={40} color="#8e6ad2" />
          <h1 className="text-2xl font-semibold max-sm:text-lg">QuickNotes</h1>
        </div>
        {loggedInUser && (
          <div className="flex items-center gap-5 max-sm:flex-col max-sm:gap-2 max-sm:items-start">
            <div className="flex items-center gap-2 text-gray-500 cursor-pointer">
              <User />
              {loggedInUser && (
                <p className="max-sm:text-[13px]">
                  {(loggedInUser as { username: string }).username}
                </p>
              )}
            </div>
            <div
              className="flex items-center gap-2 text-gray-500 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut />
              <p className="max-sm:text-[13px]">Logout</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
