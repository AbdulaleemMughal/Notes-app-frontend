import { Toaster } from "react-hot-toast";
import { NoteForm } from "../components/NoteForm";

export const Body = () => {
  return (
    <>
      <NoteForm />
      <Toaster />
    </>
  );
};
