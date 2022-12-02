import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteNotes } from './notesSlice';
import { useState } from 'react';
import './NoteItem.css';
const NoteItem = ({note}) => {

  const [addReqStatus, setAddReqStatus] = useState('idle');

  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false); 

  const handleChange = () => { 
    
    setChecked(!checked); 
    
  }; 
  

  const onDeleteHanlder = () => {
    try {
      setAddReqStatus('pending')
      dispatch(deleteNotes({ id: note.id })).unwrap()

     /* setTitle('')
      setContent('')
      setUserId('')
      navigate('/')
      */
  } catch (err) {
      console.error('Failed to delete the post', err)
  } finally {
    setAddReqStatus('idle')
  }    
  }; 
  let style;
  if(checked){
    style="cross";
  }else{
    style="normal";
  }
  console.log(style)

  return (
    <tr key={note.id}>
    <td><input onClick={()=>handleChange()} type="checkbox" id="done" name="done" value="done"/></td>
    <td className={style}>{note.title}</td>
    <td className={style}>{note.priority}</td>
    <td className={style}>{note.dueDate}</td>
    <td className={style}> <Link to={`/note/put/${note.id}`}>Edit</Link><a onClick={()=>onDeleteHanlder()}>Delete</a></td>
    </tr>
  )
}

export default NoteItem