import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(3000 * 3);
    for (let i = 0; i < starPos.length; i++) starPos[i] = (Math.random() - 0.5) * 100;
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0x00aaff, size: 0.07, transparent: true, opacity: 0.6 }));
    scene.add(stars);

    // Geometric shapes
    const shapes = [];
    for (let i = 0; i < 14; i++) {
      const geo = [new THREE.OctahedronGeometry(0.35), new THREE.TetrahedronGeometry(0.28), new THREE.IcosahedronGeometry(0.22)][i % 3];
      const mat = new THREE.MeshBasicMaterial({ color: Math.random() > 0.5 ? 0x00aaff : 0x0055cc, wireframe: true, transparent: true, opacity: 0.25 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 16, (Math.random() - 0.5) * 10 - 5);
      mesh.userData = { rx: Math.random() * 0.01 + 0.002, ry: Math.random() * 0.01 + 0.002 };
      scene.add(mesh); shapes.push(mesh);
    }

    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll);

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      stars.rotation.y += 0.0002; stars.rotation.x += 0.0001;
      shapes.forEach(s => { s.rotation.x += s.userData.rx; s.rotation.y += s.userData.ry; });
      camera.position.y = -scrollY * 0.003;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%', zIndex:0, pointerEvents:'none' }} />;
}
