import React from 'react'
import { Outlet } from 'react-router-dom';
import Analytics from '../features/notes/footer/Analytics';
import Header from '../features/notes/header/Header';
import Pagination from '../features/notes/pagination/Pagination';
import Todo from '../features/notes/Todo';
import './Layout.css'
const Layout = () => {
  return (
    <main>
         <h1 className='heading'>To Do App</h1>
        <Header />
        <Todo />
        <Outlet />
        <div className='bottom'>
        <Pagination />
        <Analytics />
        </div>
    </main>
  )
}

export default Layout