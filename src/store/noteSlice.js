import { createSlice } from "@reduxjs/toolkit";

const initialState = [];


const noteSlice = createSlice({
    name:'note',
    initialState,
    reducers:{
        setNotes: (state, action) => {
            return action.payload; 
          },
        addNote:(state,action)=>{
            const updatedNotes = [...state,action.payload]
            localStorage.setItem("Notes", JSON.stringify(updatedNotes)); 
            return updatedNotes;
        },
        deleteNote:(state,action)=>{
            const updatedNotes = state.filter((_,i)=> i != action.payload)
            localStorage.setItem("Notes", JSON.stringify(updatedNotes)); 
            return updatedNotes;

        },
        editNote: (state, action) => {
            const { index, EditNote } = action.payload;
            const updatedState = [...state];
            updatedState[index] = EditNote;
            console.log(EditNote)
            localStorage.setItem("Notes", JSON.stringify(updatedState)); 
            return updatedState;
          },
    }
})



export const {addNote,setNotes,deleteNote,editNote} = noteSlice.actions;

export default noteSlice.reducer;
