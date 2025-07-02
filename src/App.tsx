import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import { Body } from "./Pages/Body";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/appStore";
import axios from "axios";
import { BASE_URL } from "./utils/constant";
import { addUser } from "./store/UserSlice";
import { useEffect } from "react";
import { Header } from "./components/Header";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((store: RootState) => store.user);

  const getUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/auth/check-auth", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Router>
    <Header />
        <Routes>
          <Route path="/notes/:id" element={user ? <Body /> : <Login />} />
          <Route path="/login" element={!user ? <Login /> : <Body />} />
          <Route path="/signup" element={!user ? <SignUp /> : <Body />} />
        </Routes>
      </Router>
    </>
  );
}
