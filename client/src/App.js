import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProtectedPage from './components/ProtectedPage';
import Profile from './pages/Profile';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedPage><Home></Home></ProtectedPage>} />
        <Route path='/profile' element={<Profile></Profile>} />
        <Route path='/login' element={<Login></Login>} />
        <Route path='/register' element ={ <Register></Register>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
