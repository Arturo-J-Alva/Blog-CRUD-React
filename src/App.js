import React from 'react';
import './assets/css/App.css';
//import { write } from 'fs';



//import SeccionPruebas from './components/SeccionPruebas'
//import Peliculas from './components/peliculas'
import Router from './routes'


function App() {

  return (
    <div className="App">

        {/* <Peliculas/> */}

        <Router/>

    </div>
  );
}

export default App;
