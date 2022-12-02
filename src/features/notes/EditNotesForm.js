import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  { useParams, useNavigate } from 'react-router-dom';
import  { selectAllNotes, selectNoteById, putNotes,  } from '../notes/notesSlice';

const EditNotesForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const note = useSelector((state) => selectNoteById(state, Number(id)));

    const [title, setTitle] = useState(note?.title)
    const [priority, setPriority] = useState(note?.priority)
    const [dueDate, setDueDate] = useState(note?.dueDate)
    const [addReqStatus, setAddReqStatus] = useState('idle')
    

    const dispatch = useDispatch()

    if (!note) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }




    const onTitleChanged = (e) => setTitle(e.target.value);
    const onPriorityChanged = (e) => setPriority(e.target.value);
    const onDueDateChanged= (e) => setDueDate(e.target.value);

    //const disableBtn = Boolean(title) && Boolean(priority);
    const canSave = [title, priority].every(Boolean) && addReqStatus === 'idle';
    //On save we send the title,priotrity,DueDate to redux store
    const onSaveNote = ()=>{
       /* if(title && priority)
            dispatch(addNote(title, priority, dueDate));
            setTitle('');
            setPriority('');
            setDueDate('');
        }
        */
       if(canSave){
        try{
          setAddReqStatus('pending');
          dispatch(putNotes({id, title, priority, dueDate}));

          setTitle('');
          setPriority('');
          setDueDate('');
          navigate('/');
        }catch (err){
          console.log('Failed to save note', err);
        }finally{
          setAddReqStatus('idle');
        }
       }
        
    }

    const options = ["High", "Low", "Medium"];


    //The form for the user to create a new note
  return (
    <section>
        <h2>Edit Note</h2>
        <form>

            <label htmlFor='noteTitle'>Note Title:</label>
            <input
              type='text'
              id='noteTitle'
              name='noteTitle'
              value={title}
              onChange={onTitleChanged}
            />


            <label htmlFor="notePriority">Priority</label>
            <select id='notePriority' value={priority} onChange={onPriorityChanged}>
                <option value=''></option>
                {options.map((option, id)=>{
                    return <option key={id}>
                             {option}
                           </option>
                })}
            </select>

            <label htmlFor="dueDate" >Due Date</label>
            <input type='date' id='dueDate' value={dueDate} min="2022-01-01" max="2080-12-31" onChange={onDueDateChanged} />

            <button onClick={onSaveNote} disabled={!canSave} type='button'>Save Note</button>


        </form>
    </section>
  /*return (
    <div>EditNotesForm</div>
  )*/
)};

export default EditNotesForm