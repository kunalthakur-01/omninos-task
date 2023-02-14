import './App.css';
import Login from './component/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Signup from './component/Signup';
import Header from './component/Header';
import Cart from './component/Cart';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<Navigate to={'/'} />} />
      </Routes>
    </div>
  );
}

export default App;
