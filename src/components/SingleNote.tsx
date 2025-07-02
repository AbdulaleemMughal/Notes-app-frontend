import { Trash2 } from "lucide-react";
import { NoteInterface } from "../Interfaces/note.interface";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/constant";

type SingleNoteProps = {
  data: NoteInterface;
  getNote: () => void;
};

export const SingleNote = ({ data, getNote }: SingleNoteProps) => {
  const deleteNote = async () => {
    try {
      const res = await axios.delete(
        BASE_URL + `/notes/delete-note/${data._id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      getNote();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="py-4 px-6 shadow-xl">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl">{data.title}</h2>
            <span className="cursor-pointer" onClick={deleteNote}>
              <Trash2 color="#8e6ad2" />
            </span>
          </div>
          <div className="w-full">
            <p className="break-words whitespace-pre-wrap">{data.content}</p>{" "}
          </div>
          <div className="mt-10">
            <p>
              {data?.createdAt?.split("T")[0]},{" "}
              {data?.createdAt?.split("T")[1]?.slice(0, 5)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
