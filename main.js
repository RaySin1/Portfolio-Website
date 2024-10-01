console.log("Three.js script is running");

// Create the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000); // Wider FOV for better view

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set the background color to light gray (or any other color you prefer)
renderer.setClearColor(0xd3d3d3); // Light gray background

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

// Load the 3D model (replace 'buildingModelAtlanta.glb' with your actual model file name)
var loader = new THREE.GLTFLoader();
loader.load('buildingModelAtlanta.glb', function(gltf) {
    var model = gltf.scene;
    scene.add(model);
    
    // Adjust camera position and target to capture the entire building
    camera.position.set(0, 40, 200); // Move the camera much farther back to fit the entire building
    controls.target.set(0, 40, 0); // Center the camera's target on the building's middle
    controls.update(); // Update controls with new target

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
