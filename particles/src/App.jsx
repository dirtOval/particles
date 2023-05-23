import { useState } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import Stars from './Stars.jsx';

function App() {


  return (
    <div id="main">
      <h1>WOW ITS STARS</h1>
      <div id="canvas-container">
        <Canvas
          camera={{ fov: 100, position: [5, 2.5, 5] }}>
          <Stars />
        </Canvas>
      </div>
    </div>
  )
}

export default App
