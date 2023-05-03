import './App.css';
import { Route, Routes } from 'react-router-dom';
import Books from './compenents/Books';
import Book from './compenents/Book';
import Login from './compenents/Login';
import Home from './compenents/Home';
import { useEffect } from 'react';
import Register from './compenents/Register';
import NotFound from './compenents/NotFound';
import BookView from './compenents/BookView';

function App() {
  const emptyUser = {
    id: '',
    username: '',
    password: '',
    role: '',
    gmail: ''
  };

  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem('user'));
    if (!existingUser) {
      localStorage.setItem('user', JSON.stringify(emptyUser));
    }
  }, []);

  const user = JSON.parse(localStorage.getItem('user')) || emptyUser;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/books' element={<Books/>}/>
        {user.role === "admin" ? (
        <>
          <Route path='/book/:bookcode' element={<Book/>}/>
        </>
        ) : null}
        <Route path='/bookview/:bookcode' element={<BookView/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
