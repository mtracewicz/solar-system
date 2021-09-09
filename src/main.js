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
camera.position.setZ(25);

const color = 0xffeb3b;
const intensity = 5;

const sunGeometry = new THREE.SphereGeometry(0.75, 100, 100);
const sunMaterial = new THREE.MeshStandardMaterial({
  emissive: color,
  emissiveIntensity: 1,
});

const light = new THREE.PointLight(color, intensity);
scene.add(light);

const ambientLight = new THREE.AmbientLight(color, 0.75);
scene.add(ambientLight);

const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const planetMeshes = [];
planets.planets.forEach((planet) => {
  const material = new THREE.MeshPhongMaterial({ color: planet.color });
  const geometry = new THREE.SphereGeometry(planet.size, 100, 100);
  const mesh = new THREE.Mesh(geometry, material);
  planetMeshes.push({
    mesh,
    distance: planet.distance,
    angle: 0.0,
    modifier: planet.speed / 60,
  });
  scene.add(mesh);
});

const animate = () => {
  requestAnimationFrame(animate);
  planetMeshes.forEach((obj) => {
    obj.mesh.position.setX(Math.cos(obj.angle) * (0.75 + obj.distance * 10));
    obj.mesh.position.setY(Math.sin(obj.angle) * (0.75 + obj.distance * 10));
    obj.angle += obj.modifier;
  });
  renderer.render(scene, camera);
};

animate();
