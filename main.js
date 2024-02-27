/**
 * STYLE
 */
import "./style.css";
/**
 * MODULES
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
/**
 * IMAGES
 */
import starsTexture from "./img/stars.jpg";
import sunTexture from "./img/sun.jpg";
import mercuryTexture from "./img/mercury.jpg";
import venusTexture from "./img/venus.jpg";
import earthTexture from "./img/earth.jpg";
import marsTexture from "./img/mars.jpg";
import jupiterTexture from "./img/jupiter.jpg";
import saturnTexture from "./img/saturn.jpg";
import saturnRingTexture from "./img/saturn ring.png";
import uranusTexture from "./img/uranus.jpg";
import uranusRingTexture from "./img/uranus ring.png";
import neptuneTexture from "./img/neptune.jpg";
import plutoTexture from "./img/pluto.jpg";
/**
 * Canvas
 */
const canvas = document.querySelector(".webgl");
/**
 * PARAMS
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
/**
 * RENDERER
 */
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
/**
 * SCENE
 */
const scene = new THREE.Scene();
/**
 * CAMERA & CONTROLS
 */
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  1000
);

const orbitControls = new OrbitControls(camera, canvas);
camera.position.set(-90, 140, 140);
orbitControls.update();

/**
 * TEXTURE
 */
// TODO: init this texture for the background
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);
// TODO: init this texture for the Meshes
const textureLoader = new THREE.TextureLoader();
/**
 * CREATE MESHES
 */

//? SUN
const sunGeometry = new THREE.SphereGeometry(16, 30, 30);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);
/**
 * TODO: CREATE A PLANETE
 */
const createPlanete = (size, texture, position, spd1, spd2) => {
  const geometry = new THREE.SphereGeometry(size, 30, 30);
  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(texture),
  });
  const mesh = new THREE.Mesh(geometry, material);
  const obj = new THREE.Object3D();
  obj.add(mesh);
  scene.add(obj);
  mesh.position.x = position;

  return {
    mesh: mesh,
    obj: obj,
    animation: () => {
      mesh.rotateY(spd1);
      obj.rotateY(spd2);
    },
  };
};
//? MERCURY
const mercury = createPlanete(3.2, mercuryTexture, 28, 0.004, 0.04);
//? VENUS
const venus = createPlanete(5.8, venusTexture, 38, 0.002, 0.015);
//? EARTH
const earth = createPlanete(6, earthTexture, 62, 0.02, 0.01);
//? MARS
const mars = createPlanete(4, marsTexture, 78, 0.018, 0.008);
//? JUPITER
const jupiter = createPlanete(12, jupiterTexture, 100, 0.04, 0.002);
//? SATURN
const saturn = createPlanete(10, saturnTexture, 138, 0.038, 0.0009);
//! Saturn Ring
const saturnRingGeometry = new THREE.RingGeometry(10, 20, 32);
const saturnRingMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(saturnRingTexture),
  side: THREE.DoubleSide,
});
const saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
saturn.obj.add(saturnRing);

saturnRing.position.x = 138;
saturnRing.rotation.x = -0.5 * Math.PI;

/**
 * Light
 */
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);

/**
 * SPACE RENDER & ANIMATE FUNCTION
 */
const motion = () => {
  sun.rotateY(0.004);
  mercury.animation();
  venus.animation();
  earth.animation();
  mars.animation();
  jupiter.animation();
  saturn.animation();

  renderer.render(scene, camera);
};

renderer.setAnimationLoop(motion);

window.addEventListener("resize", () => {
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});
