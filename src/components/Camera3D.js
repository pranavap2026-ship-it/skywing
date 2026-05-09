import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Camera3D({ height = 300 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.clientWidth || 600;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / height, 0.1, 100);
    camera.position.set(0, 0, 7);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const group = new THREE.Group();

    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 1.2), new THREE.MeshPhongMaterial({ color: 0x111827, shininess: 100, specular: 0x00aaff }));
    group.add(body);

    // Lens
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.9, 1.4, 32), new THREE.MeshPhongMaterial({ color: 0x0a0f1a, shininess: 200, specular: 0x00aaff }));
    lens.rotation.z = Math.PI / 2; lens.position.set(1.8, 0, 0);
    group.add(lens);

    // Glass
    const glass = new THREE.Mesh(new THREE.CircleGeometry(0.65, 64), new THREE.MeshPhongMaterial({ color: 0x00aaff, transparent: true, opacity: 0.5, shininess: 300, specular: 0xffffff, emissive: 0x001133 }));
    glass.rotation.y = Math.PI / 2; glass.position.set(2.5, 0, 0);
    group.add(glass);

    // Grip
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.6, 1.4), new THREE.MeshPhongMaterial({ color: 0x0d1520 }));
    grip.position.set(-1.5, -0.2, 0); group.add(grip);

    // Viewfinder
    const vf = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.35, 0.6), new THREE.MeshPhongMaterial({ color: 0x1a2438 }));
    vf.position.set(-0.3, 1.15, 0); group.add(vf);

    // Shutter
    const shutter = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.1, 16), new THREE.MeshPhongMaterial({ color: 0x00aaff, emissive: 0x003366 }));
    shutter.position.set(-1.5, 0.85, 0.5); group.add(shutter);

    // Rings
    const rings = [];
    for (let i = 0; i < 2; i++) {
      const r = new THREE.Mesh(new THREE.TorusGeometry(2.5 + i * 0.5, 0.015, 2, 120), new THREE.MeshBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.3 - i * 0.1 }));
      r.rotation.x = Math.PI / 4 + i * 0.5; group.add(r); rings.push(r);
    }

    // Particles
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(120 * 3);
    for (let i = 0; i < 120; i++) {
      const theta = Math.random() * Math.PI * 2, phi = Math.random() * Math.PI, r = 2 + Math.random() * 2;
      pPos[i*3] = r*Math.sin(phi)*Math.cos(theta); pPos[i*3+1] = r*Math.sin(phi)*Math.sin(theta); pPos[i*3+2] = r*Math.cos(phi);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x00aaff, size: 0.04, transparent: true, opacity: 0.8 }));
    group.add(particles);
    scene.add(group);

    // Lights
    scene.add(new THREE.AmbientLight(0x112244, 1.5));
    const bl = new THREE.PointLight(0x00aaff, 3, 20); bl.position.set(5, 5, 5); scene.add(bl);
    scene.add(new THREE.PointLight(0x0044ff, 2, 15)).position?.set(-5, -3, 3);
    scene.add(new THREE.DirectionalLight(0xffffff, 0.5)).position?.set(0, 5, -5);

    let mx = 0, my = 0, t = 0;
    const onMove = e => { mx = (e.clientX / window.innerWidth - 0.5) * 2; my = -(e.clientY / window.innerHeight - 0.5) * 2; };
    document.addEventListener('mousemove', onMove);

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate); t += 0.01;
      group.rotation.y += (mx * 0.3 - group.rotation.y) * 0.05;
      group.rotation.x += (my * 0.15 - group.rotation.x) * 0.05;
      group.position.y = Math.sin(t * 0.7) * 0.15;
      rings.forEach((r, i) => { r.rotation.y += 0.005 + i * 0.003; r.rotation.z += 0.003; });
      particles.rotation.y += 0.003;
      bl.position.x = Math.sin(t) * 6; bl.position.z = Math.cos(t) * 6;
      glass.material.opacity = 0.4 + Math.sin(t * 2) * 0.15;
      renderer.render(scene, camera);
    };
    animate();

    return () => { cancelAnimationFrame(frame); document.removeEventListener('mousemove', onMove); renderer.dispose(); };
  }, [height]);

  return <canvas ref={canvasRef} style={{ width:'100%', height }} />;
}
