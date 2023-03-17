import Header from './components/layout/Header/Header.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Product/Products.js'
import Search from './components/Product/Search.js'
import webfont from "webfontloader"
import { useEffect } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Drold Sans", "Chilanka"],
      }
    })
  }, [])

  return (
    <Router>
      <Header />
      <Routes>
        <Route exacts path='/' element={<Home />} />
        <Route exacts path='/product/:id' element={<ProductDetails />} />
        <Route exacts path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route exacts path='/search' element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
