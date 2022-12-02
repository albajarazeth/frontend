import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "./notesSlice";
import { postNotes } from "./notesSlice";
import { useNavigate } from 'react-router-dom';
import './AddNotesForm.css';
const AddNotesForm = () => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [addReqStatus, setAddReqStatus] = useState('idle');

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onPriorityChanged = (e) => setPriority(e.target.value);
    const onDueDateChanged= (e) => setDueDate(e.target.value);

    const dispatch = useDispatch();

    //const disableBtn = Boolean(title) && Boolean(priority);
    const canSave = [title, priority].every(Boolean) && addReqStatus === 'idle';
    const navigate = useNavigate();
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
          dispatch(postNotes({title, priority, dueDate}));

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
      <div className="modal">
        <div className="modal-content">
          <div className="modal-title">
          <h2>Add a New Note</h2>
          </div>
          <div className="modal-body">
          <form className="add-container">

            <div className="add-content">
            <label className="add-one" htmlFor='noteTitle'>Note Title</label>
            <input
              type='text'
              id='noteTitle'
              name='noteTitle'
              value={title}
              onChange={onTitleChanged}
            />
            </div>

            <div className="add-content">
            <label className="add-two" htmlFor="notePriority">Priority</label>
            <select id='notePriority' value={priority} onChange={onPriorityChanged}>
                <option value=''></option>
                {options.map((option, id)=>{
                    return <option key={id}>
                             {option}
                           </option>
                })}
            </select>
            </div>
            
            <div className="add-content">
            <label className="add-three" htmlFor="dueDate" >Due Date</label>
            <input type='date' id='dueDate' value={dueDate} min="2022-01-01" max="2080-12-31" onChange={onDueDateChanged} />
            </div>

           
        </form>
          </div>
          <div className="modal-footer">
          <div className="add-content">
            <button onClick={onSaveNote} disabled={!canSave} type='button'>Save Note</button>
            </div>
          </div>

        </div>
      </div>

       
    </section>
  )
}

export default AddNotesForm;