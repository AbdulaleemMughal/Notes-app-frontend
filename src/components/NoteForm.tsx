import { Loader, PencilLine } from "lucide-react";
import toast from "react-hot-toast";
import { ChangeEvent, useEffect, useState } from "react";
import { NoteInterface } from "../Interfaces/note.interface";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/constant";
import { Notes } from "./Notes";

export const NoteForm = () => {
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noteData, setNoteData] = useState<NoteInterface>({
    title: "",
    content: "",
  });

  useEffect(() => {
    getNotes();
  }, []);

  const handleChange = (field: keyof NoteInterface, value: string) => {
    setNoteData((prev) => ({ ...prev, [field]: value }));
  };

  const getNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/notes/get-notes", {
        withCredentials: true,
      });

      setNotes(res.data.data);
      console.log(res.data.data);
      toast.success(res.data.message);
      setLoading(false);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleform = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(BASE_URL + "/notes/create-note", noteData, {
        withCredentials: true,
      });

      toast.success(res.data.message);
      console.log(res.data.data);

      setNoteData({
        title: "",
        content: "",
      });
      getNotes();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="px-4 py-10">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <p className="text-gray-500">Create and manage your personal notes</p>
      </div>
      <div className="flex justify-center px-4">
        <div className="shadow-lg w-full p-4">
          <div className="flex items-center gap-2">
            <PencilLine size={22} color="#8e6ad2" />
            <h3 className="text-lg font-semibold">Add a New Note</h3>
          </div>
          <form
            className="flex flex-col items-start mt-4"
            onSubmit={handleform}
          >
            <div className="w-full">
              <label className="">Title</label>
              <input
                type="text"
                placeholder="Note Title"
                className="w-full mt-1 py-2 px-3 border border-gray-400 rounded-sm outline-none"
                value={noteData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div className="w-full mt-3">
              <label>Content</label>
              <textarea
                placeholder="Write your note here"
                className="w-full mt-1 py-2 px-3 border border-gray-400 rounded-sm outline-none"
                rows={6}
                value={noteData.content}
                onChange={(e) => handleChange("content", e.target.value)}
              ></textarea>
            </div>
            <div className="w-full">
              <input
                type="submit"
                value="Create Note"
                className="w-full mt-1 py-2 rounded-sm bg-[#8e6ad2] text-white font-semibold cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="p-4 grid grid-cols-12 gap-4">
        <Notes notes={notes} getNote={getNotes} loading={loading} />
        
      </div>
    </>
  );
};
