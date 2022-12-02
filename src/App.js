import logo from './logo.svg';
import './App.css';
import NotesList from './features/notes/NotesList';
import AddNotesForm from './features/notes/AddNotesForm';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import EditNotesForm from './features/notes/EditNotesForm';

function App() {
  //1:50 link
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Layout />}>
  
        <Route path='/' element={<NotesList />} />
       

        <Route path='note'>
          <Route path=':id' /*element={}*/ />
          <Route index element={<AddNotesForm/>} />
          <Route path='put/:id' element={<EditNotesForm />} />
        </Route>
        </Route>
      </Routes>

      
    </div>
  );
}

export default App;
