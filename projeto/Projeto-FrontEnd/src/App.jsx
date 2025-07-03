import React, { useState, useEffect, useCallback } from 'react';
import HomePage, { Formulario } from './pages/Home';
import { Layout } from './components/Layout';
import { BrowserRouter } from 'simple-react-routing';

class Aluno { }

const array = [10, 12];

const primeiroItem = array[0];
const segundoItem = array[1];

const [primeiro, segundo] = [10, 12];

const aluno = {
  nome: "rodrigo",
  email: "email",
  idade: 10
};

const nomeAluno = aluno.nome;
const idadeAluno = aluno.idade;

const { nome, idade } = aluno;

function App() {

  return <BrowserRouter routes={[{
    path: "",
    component: <HomePage></HomePage>
  }]}>
    <Layout></Layout>
  </BrowserRouter>
}


export default App;
