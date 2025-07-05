import React, { useState, useEffect, useCallback } from 'react';
import HomePage from './pages/Home';
import ClientePage from './pages/Cliente';
import { Layout } from './components/Layout';
import { BrowserRouter } from 'simple-react-routing';
import DividaPage from './pages/Divida';

function App() {

  return <BrowserRouter routes={[{
    path: "",
    component: <HomePage></HomePage>
  }, {
    path: "clientes",
    component: <ClientePage></ClientePage>
  }, {
    path: "dividas",
    component: <DividaPage></DividaPage>
  }]}>
    <Layout></Layout>
  </BrowserRouter>
}


export default App;
