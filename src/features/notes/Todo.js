import React from 'react'
import { Link} from 'react-router-dom';
import './Todo.css'

const Todo = () => {
  return (
    <div>
        <Link to={`/note`}><div className='add-btn'>+Add Note</div></Link>
    </div>
  )
}

export default Todo