import "./style.css";
import * as THREE from "three";
import planets from "./planetDefinitions";

const bg = document.getElementById("bg");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ canvas: bg });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(150);

const color = 0xffeb3b;
const intensity = 5;

const sunGeometry = new THREE.SphereGeometry(5, 100, 100);
const sunMaterial = new THREE.MeshStandardMaterial({
  emissive: color,
  emissiveIntensity: 1,
});

const light = new THREE.PointLight(color, intensity);
scene.add(light);

const supLight1 = new THREE.PointLight(color, 0.5);
const supLight2 = new THREE.PointLight(color, 0.5);
const supLight3 = new THREE.PointLight(color, 0.5);
const supLight4 = new THREE.PointLight(color, 0.5);
supLight1.position.set(-200, -100, 0);
supLight2.position.set(-200, 100, 0);
supLight3.position.set(200, 100, 0);
supLight4.position.set(200, -100, 0);
scene.add(supLight1);
scene.add(supLight2);
scene.add(supLight3);
scene.add(supLight4);

const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const planetMeshes = [];
planets.planets.forEach((planet) => {
  const material = new THREE.MeshPhongMaterial({ color: planet.color });
  const geometry = new THREE.SphereGeometry(5 * planet.size, 100, 100);
  const mesh = new THREE.Mesh(geometry, material);
  planetMeshes.push({
    mesh,
    distance: planet.distance,
    angle: 0.0,
    modifier: planet.speed,
  });
  scene.add(mesh);
});

const animate = () => {
  requestAnimationFrame(animate);
  planetMeshes.forEach((obj) => {
    obj.mesh.position.setX(Math.cos(obj.angle) * obj.distance * 15);
    obj.mesh.position.setY(Math.sin(obj.angle) * obj.distance * 15);
    obj.mesh.rotateX(0.02);
    obj.angle += obj.modifier;
  });
  renderer.render(scene, camera);
};

animate();
