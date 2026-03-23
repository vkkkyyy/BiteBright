
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import GetProducts from './components/GetProducts';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
      <header className="App-header">
        <h1>Welcome to BiteBright - Every bite brightens your day</h1>
      </header>

       <Navbar/>

      <Routes>
        <Route path='/' element={<GetProducts/>}/>
        <Route path='./Navbar' element={<Navbar/>}/>
        <Route path='/signup' element={<Signup/>}/>  
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/addproducts' element={<Addproducts/>}/>
        <Route path='/makepayment' element={<Makepayment/>}/>                  
          <Route path='*' element={<Notfound/>}/>
      </Routes>
    </div>
    <Footer /> 
    </Router>
  );
}

export default App;

