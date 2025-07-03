import { useNavigate } from "react-router";

export const MainPage = () => {

    const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-10 justify-center items-center mt-20">
        <h1 className="text-center text-3xl font-semibold">Welcome to QuickNotes</h1>
        <button className="py-[10px] px-[24px] rounded-md text-semibold bg-[#8e6ad2] text-white" onClick={() => navigate("/login")}>Get Started</button>
      </div>
    </>
  );
};
