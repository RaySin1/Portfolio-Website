console.log("Three.js script is running");

// Create the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add Orbit Controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// Load the 3D model (replace 'your_model.glb' with your actual model file name)
var loader = new THREE.GLTFLoader();
loader.load('buildingModelAtlanta.glb', function(gltf) {
    var model = gltf.scene;
    scene.add(model);
    camera.position.z = 5;
}, undefined, function(error) {
    console.error(error);
});

// Animation loop to render the scene
var animate = function () {
    requestAnimationFrame(animate);
    controls.update(); // Update camera controls
    renderer.render(scene, camera);
};

animate();
