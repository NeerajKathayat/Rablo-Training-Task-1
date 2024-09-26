"use client";
import React, { useState, useEffect } from "react";
import "./style.scss";

const NotePage = () => {
  const [noteList, setNoteList] = useState([]);
  const [note, setNote] = useState("");
  const [Editnote, setEditNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const storedNotes = localStorage.getItem("Notes");
    if (storedNotes) {
      setNoteList(JSON.parse(storedNotes));
    }
  }, [noteList]);

  const addNote = () => {
    if (note) {
      let Notes = localStorage.getItem("Notes");

      if (Notes) {
        Notes = JSON.parse(Notes);
      } else {
        Notes = [];
      }

      Notes.push(note);

      localStorage.setItem("Notes", JSON.stringify(Notes));

      setNoteList([...noteList, note]);
      setNote("");
    }
  };

  const deleteNote = (index) => {
    const filteredNote = noteList.filter((_, i) => i != index);

    let storedNotes = JSON.parse(localStorage.getItem("Notes"));
    storedNotes = storedNotes.filter((_, i) => i != index);
    localStorage.setItem("Notes", JSON.stringify(storedNotes));

    setNoteList(filteredNote);
  };

  const editNote = (index) => {
    setIndex(index);

    const Edit = noteList.filter((_, i) => i == index);

    setEditNote(Edit);

    setIsOpen(true);
  };

  const UpdateNote = () => {
    let updatedNotes = [...noteList];

    updatedNotes[index] = Editnote;

    setNoteList(updatedNotes);

    localStorage.setItem("Notes", JSON.stringify(updatedNotes));

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
        <button onClick={addNote}>Add</button>
      </div>

      <div className="NoteContainer">

        
        {noteList.map((item, index) => (
          <ul key={index}>
            <li>
              <span>{item}</span>
              <div>
                <i
                  onClick={() => {
                    deleteNote(index);
                  }}
                  class="fa-solid fa-trash"
                ></i>
                <i
                  onClick={() => {
                    editNote(index);
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
