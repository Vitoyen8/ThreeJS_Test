import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const script = document.querySelector('.model_container script');
const container = document.querySelector('.model_container');

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
)

const loader = new GLTFLoader();

loader.load('models/logo/scene.gltf', function (gltf) {
    const model = gltf.scene;
    const material = new THREE.MeshStandardMaterial({
        color: 0xFF0000,
        roughness: 0,
        transmission: 1,
        thickness: 2,
    });
    model.traverse((child) => {
        if (child.isMesh) {
            child.material = material;
        }
    });
    scene.add(model);
    model.scale.set(2, 2, 2);
    model.rotation.set(0, -20, 0);
}, undefined, function (error) {
    console.error("An error occurred:", error);
});

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 6);
scene.add(light);


const renderer = new THREE.WebGLRenderer({
    alpha: true
})

let dirLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(dirLight);

renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

camera.position.z = 10


function update(deltaTime) {
    const ROTATE_TIME = 10; // Time in seconds for a full rotation
    const rotateX = (deltaTime / ROTATE_TIME) * Math.PI * 2;
    const rotateY = (deltaTime / ROTATE_TIME) * Math.PI * 2;

    meshes.forEach((mesh) => {
        model.rotateX(rotateX);
        model.rotateY(rotateY);
    });
}

function render() {
    requestAnimationFrame(render);

    update(0.01);

    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()