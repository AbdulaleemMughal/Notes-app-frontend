import { useEffect, useState } from "react";
import { NoteInterface } from "../Interfaces/note.interface";
import { SingleNote } from "./SingleNote";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/constant";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

type NotesProps = {
  notes: NoteInterface[];
  getNote: () => void;
  loading: boolean;
};

export const Notes = ({ notes, getNote, loading }: NotesProps) => {
  useEffect(() => {
    getNote();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center animate-spin mt-5">
        <Loader size={30} color="#8e6ad2" />
      </div>
    );
  }
  return (
    <>
      {notes.length === 0 ? (
        <h1 className="col-span-12 text-center text-xl font-semibold">
          No Notes Found
        </h1>
      ) : (
        notes.map((note) => {
          return (
            <div className="col-span-6 max-sm:col-span-12">
              <SingleNote data={note} getNote={getNote} />
            </div>
          );
        })
      )}
    </>
  );
};
