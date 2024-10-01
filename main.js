console.log("Three.js script is running");

// Create the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000); // Wider FOV for better view

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set the background color to light gray (or any other color you prefer)
renderer.setClearColor(0xd3d3d3); // Light gray background

// Handle window resizing to keep the renderer and camera responsive
window.addEventListener('resize', function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Add ambient light (increase intensity for overall brightness)
var ambientLight = new THREE.AmbientLight(0xffffff, 2); // Increase intensity to 2
scene.add(ambientLight);

// Add directional light (like sunlight, adjust its position and intensity)
var directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Increase intensity
directionalLight.position.set(50, 50, 50); // Move the light to a higher position to cover the entire model
scene.add(directionalLight);

// Add another directional light from a different angle
var directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight2.position.set(-50, 50, -50); // This will ensure better lighting coverage from another angle
scene.add(directionalLight2);

// Add Orbit Controls for camera movement
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// Load the 3D model using GLTFLoader
var loader = new THREE.GLTFLoader(); // Ensure that this line comes after loading GLTFLoader.js

loader.load('buildingModelAtlanta.glb', function(gltf) {
    var model = gltf.scene;
    scene.add(model);
    
    // Rotate the building 90 degrees to the left (on the Y-axis)
    model.rotation.y = -Math.PI / 3.5;

    // Adjust camera position to look down from a higher angle
    camera.position.set(0, 300, 400); 
    co
