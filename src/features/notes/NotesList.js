import { useSelector, useDispatch } from "react-redux";
import { selectAllNotes, getNotesStatus, getNotesError, getNotes } from "./notesSlice";
import { useEffect } from "react";
import NoteItem from "./NoteItem";
import './NotesList.css';

const NotesList = () => {
    const dispatch = useDispatch();

    const notes = useSelector(selectAllNotes);
    const noteStatus = useSelector(getNotesStatus);
    const error = useSelector(getNotesError);
    const filters = useSelector((store)=>store.notes.filters);
    

    //Makes get request when page loads

    useEffect(()=>{
      if(noteStatus === 'idle'){
        dispatch(getNotes())
      }
    }, [noteStatus, dispatch]);
    let content; 
    if(noteStatus === 'loading'){
      content = <li>"Loading...."</li>
    }else if(noteStatus === 'succeeded'){
          
          content = notes.map((note)=> <NoteItem key={note.id} note={note} />)
        
    }


  return (
    <tbody className='list'>
        <tr>
            <th>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
            </th>
            <th>Name</th>
            <th>Priority{"<>"}</th>
            <th>Due Date{"<>"}</th>
            <th>Actions</th>
        </tr>
        {content}
        
      </tbody>
  )
}

export default NotesList