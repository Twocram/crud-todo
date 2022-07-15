import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './pages/404';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Reg from './pages/Reg';
import Layout from './components/Layout/Layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/users/:id' element={<Home />} />
          <Route path='/reg' element={<Reg />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
