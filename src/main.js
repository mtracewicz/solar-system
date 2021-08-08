import "./style.css";
import * as THREE from "three";
import { planets } from "./planetDefinitions";

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
camera.position.setZ(50);

const color = 0xffeb3b;
const intensity = 5;
const geometry = new THREE.SphereGeometry(5, 100, 100);
const material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
const sunMaterial = new THREE.MeshStandardMaterial({
  emissive: color,
  emissiveIntensity: 1,
});

const light = new THREE.PointLight(color, intensity);
scene.add(light);

const sun = new THREE.Mesh(geometry, sunMaterial);
scene.add(sun);

const planet = new THREE.Mesh(geometry, material);
scene.add(planet);

const planet2 = new THREE.Mesh(geometry, material);
scene.add(planet2);

let angle = 0;
let angle2 = 0;
const animate = () => {
  requestAnimationFrame(animate);
  angle += 0.01;
  angle2 += 0.02;

  planet.position.z = Math.cos(angle) * planets.mercury.distance * 15;
  planet.position.x = Math.sin(angle) * 15;
  planet.rotateX(0.02);

  planet2.position.z = Math.cos(angle2) * 35;
  planet2.position.x = Math.sin(angle2) * 35;
  planet2.rotateX(0.02);
  renderer.render(scene, camera);
};

animate();
