import React, { useState, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const randomRange = (min, max) => {
  return min + Math.floor(Math.random() * max)
}

let Stars = (props) => {
  let [count, setCount] = useState(100);
  const mesh = useRef();
  const light = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = randomRange(0, 100);
      const factor = randomRange(20, 120);
      const speed = randomRange(0.01, 0.015) / 2;
      const x = randomRange(-50, 50);
      const y = randomRange(-50, 50);
      const z = randomRange(-50, 50);

      temp.push({ time, factor, speed, x, y , z});
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, index) => {
      let { factor, speed, x, y, z } = particle;

      // Update the particle time
      const t = (particle.time += speed);

      // Update the particle position based on the time
      // This is mostly random trigonometry functions to oscillate around the (x, y, z) point
      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );

      // Derive an oscillating value which will be used
      // for the particle size and rotation
      const s = Math.cos(t);
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  })

  return (
    <>
      {/* <pointLight ref={light} distance={40} intensity={8} color="lightblue" /> */}
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronBufferGeometry args={[0.5, 0]} />
        <meshPhongMaterial color="#050505" />
      </instancedMesh>
    </>
  )
}

export default Stars;