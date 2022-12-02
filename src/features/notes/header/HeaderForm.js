import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortList, toggleFilter } from '../notesSlice'
import './HeaderForm.css'
const HeaderForm = () => {

     const [name, setName] = useState('');
     const [priority, setPriority] = useState('');
     const [state, setState] = useState('');

     const options = ["High", "Low", "Medium"];
     const states = ["All", "Done", "Undone"];

     const onNameChanged = (e) => setName(e.target.value);
     const onPriorityChanged = (e) => setPriority(e.target.value);
     const onStateChanged= (e) => setState(e.target.value);

     const dispatch = useDispatch();

     const onSaveHandler = ()=>{
      dispatch(sortList({name, priority, state}));
      dispatch(toggleFilter());
     }

  return (
    <section>
        <section className='header-form-main-container'>
        <form className='header-form-container'>
            <div className='header-inputs'>
            <div className='header-form-section'>
            <label className='header-labler-one' htmlFor='noteTitle'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              onChange={onNameChanged}
            />
            </div>

            <div className='header-form-section'>
            <label className='header-labler-two' htmlFor="priority">Priority</label>
            <select id='priority' value={priority} onChange={onPriorityChanged}>
                <option value=''></option>
                {options.map((option, id)=>{
                    return <option key={id}>
                             {option}
                           </option>
                })}
            </select>
            </div>



            <div className='header-form-section'>
            <label className='header-labler-three' htmlFor="state">State</label>
            <select id='state' value={state} onChange={onStateChanged}>
                <option value=''></option>
                {states.map((option, id)=>{
                    return <option key={id}>
                             {option}
                           </option>
                })}
            </select>
            </div>
            </div>

            <div className='header-form-btn'>
            <button onClick={()=>onSaveHandler()} className='add-btn header-btn' type='button'>Search</button>
            </div>

        </form>
    </section>
    </section>
  )
}

export default HeaderForm