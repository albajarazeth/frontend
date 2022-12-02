import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const URL = 'http://localhost:9090/notes';


//State
const initialState = {
    notes: [],
    status: 'idle', 
    error: null,
    filters:{
        filter:false,
        name:null,
        priority:null,
        state:null
    }
}

//AsyncThunk to handle asynchronus operations will respond to extra reducers
export const getNotes = createAsyncThunk('notes/getNotes', async () => {
    const response = await axios.get(URL);
    return response.data;
});

export const postNotes = createAsyncThunk('notes/postNotes', async (initialNote)=>{
    const response = await axios.post(URL, initialNote)
    return response.data;
})

export const putNotes = createAsyncThunk('notes/putNotes', async (initialNote)=>{
    //const { id } = initialNote;
    const response = await axios.put(URL, initialNote)
    return response.data;
})

export const deleteNotes = createAsyncThunk('posts/deletePost', async (initialNote) => {
    const { id } = initialNote;
    try {
        const response = await axios.delete(`${URL}/${id}`)
        if (response?.status === 200) return initialNote;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})



//This slice contains all of our app state
export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: {
            reducer(state,action){
                state.notes.push(action.payload)
            },
            prepare(title,priority,dueDate){
                return{
                    payload: {
                        id: nanoid(),
                        title,
                        priority,
                        dueDate
                    }
                }
            }
        },
        sortList: (state, action) =>{
            console.log(action.payload);
        },
        toggleFilter: (state, action) =>{
            state.filters.filter = !state.filters.filter;
        }

    },
    extraReducers(builder){
        builder
        .addCase(getNotes.pending, (state, action) => {
            state.status = 'loading'
           })
           .addCase(getNotes.fulfilled, (state, action) => {
             state.status = 'succeeded'
             //current payload are the loaded Notes
             state.notes = [...state.notes, ...action.payload];

           })
           .addCase(getNotes.rejected,(state, action) => {
             state.status = 'failed';
             state.error = action.error.message;
           })
           .addCase(postNotes.fulfilled, (state, action) => {
            //action.payload.id
            state.status = 'succeeded'
            //state.notes = [...state.notes, ...action.payload];
            state.notes.push(action.payload);
          }) .addCase(putNotes.fulfilled, (state, action) => {
            if (!action.payload?.id) {
                console.log('Update could not complete')
                console.log(action.payload)
                return;
            }
            const { id } = action.payload;
            const notes = state.notes.filter(note => note.id !== id);
            state.notes = [...notes, action.payload];
            console.log(action.payload)
        })
        .addCase(deleteNotes.fulfilled, (state, action) => {
            if (!action.payload?.id) {
                console.log('Delete could not complete')
                console.log(action.payload)
                return;
            }
            const { id } = action.payload;
            const notes = state.notes.filter(post => post.id !== id);
            state.notes = notes;
        })
          
    }

})


export const selectAllNotes = (state) => state.notes.notes;
export const getNotesStatus = (state) => state.notes.status;
export const getNotesError = (state) => state.notes.error;

export const selectNoteById = (state, postId) =>
    state.notes.notes.find(post => post.id === postId);
//state.notes.find(note => note.id === noteId);

export const { addNote, sortList, toggleFilter } = notesSlice.actions;
export default notesSlice.reducer;