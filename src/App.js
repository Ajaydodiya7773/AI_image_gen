
import React from 'react';
import './App.css';
import NavBar from './Component/Navbar/NavBar';
import ImageGen from './Component/ImageGenerator/ImageGen';
import Footer from './Component/Footer/Footer';
// import { Router, Routes ,Route} from 'react-router-dom';
import AIImages from './Component/AIimages/Images';
import About from './Component/About/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
 
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ImageGen/>} />
        <Route path="/ai-images" element={<AIImages />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer/>
    </Router>
  );
}


export default App;
