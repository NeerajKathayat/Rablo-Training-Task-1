"use client";
import React, { useState, useEffect } from "react";
import "./style.scss";
import { useDispatch,useSelector } from "react-redux";
import { addNote , setNotes , deleteNote, editNote} from "@/store/noteSlice";

const NotePage = () => {
  const [noteList, setNoteList] = useState([]);
  const [note, setNote] = useState("");
  const [Editnote, setEditNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();
  const NoteList = useSelector( (state)=>state.note)

  useEffect(() => {
    const storedNotes = localStorage.getItem("Notes");
    if (storedNotes) {
      dispatch(setNotes(JSON.parse(storedNotes)))
      setNoteList(JSON.parse(storedNotes));
    }
  }, [dispatch]);

  const AddNote = () => {
    if (note) {
      let Notes = localStorage.getItem("Notes");

      if (Notes) {
        Notes = JSON.parse(Notes);
      } else {
        Notes = [];
      }

      Notes.push(note);

      dispatch(addNote(note))


      localStorage.setItem("Notes", JSON.stringify(Notes));

      setNoteList([...noteList, note]);
      setNote("");
    }
  };

  const DeleteNote = (index) => {

   dispatch(deleteNote(index))

  };

  const EditNote = (index) => {
    setIndex(index);

    const Edit = noteList.filter((_, i) => i == index);

    setEditNote(Edit);

    setIsOpen(true);
  };

  const UpdateNote = () => {

    dispatch(editNote({index:index,EditNote:Editnote}))

    setIsOpen(false);
  };
  return (
    <div className="container">
      <h1>Add Your Daily Notes Here</h1>
      <div className="input">
        <textarea
          name=""
          id=""
          placeholder="Enter your Note"
          rows="10"
          cols="40"
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
        ></textarea>
        <button onClick={AddNote}>Add</button>
      </div>

      <div className="NoteContainer">

        
        {NoteList.map((item, index) => (
          <ul key={index}>
            <li>
              <span>{item}</span>
              <div>
                <i
                  onClick={() => {
                    DeleteNote(index);
                  }}
                  class="fa-solid fa-trash"
                ></i>
                <i
                  onClick={() => {
                    EditNote(index);
                  }}
                  class="fa-solid fa-pen"
                ></i>
              </div>
            </li>
          </ul>
        ))}
      </div>

      {isOpen && (
        <div className="updateContainer">
          <textarea
            name=""
            id=""
            placeholder="Enter your Note"
            rows="10"
            cols="40"
            value={Editnote}
            onChange={(e) => {
              setEditNote(e.target.value);
            }}
          ></textarea>
          <button onClick={UpdateNote}>Update</button>
        </div>
      )}
    </div>
  );
};

export default NotePage;
