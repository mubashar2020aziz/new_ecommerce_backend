import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './container/Home';
import Signin from './container/Signin';
import Signup from './container/Signup';
import PrivateRoutes from './component/Hoc/PrivateRoutes';
import Product from './container/Home/Product';
import Orders from './container/Home/Orders';

function App(props) {
  return (
    <>
      <div className="App">
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<Home />} />
            <Route path="products" element={<Product />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
