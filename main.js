console.log("Three.js script is running");

// Create the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000); // Increase far plane for zoomed-out view

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
var loader = new THREE.GLTFLoader();

loader.load('buildingModelAtlanta.glb', function(gltf) {
    var model = gltf.scene;
    scene.add(model);
    
    // Keep the building stationary with an initial rotation
    model.rotation.y = -Math.PI / 3.5; // Adjust the initial rotation as needed

    // Set the camera to a fixed position
    camera.position.set(0, 300, 400); // Final camera position focused on the building
    
    // Adjust the target to focus slightly more to the left
    controls.target.set(-200, 60, 0); // Move the camera's focus point to the left (x = -50)
    controls.update(); // Update the camera position

    // Render the scene initially
    renderer.render(scene, camera);

}, undefined, function(error) {
    console.error(error);
});

// Animation loop to render the scene continuously
var animate = function () {
    requestAnimationFrame(animate);
    controls.update(); // Update camera controls
    renderer.render(scene, camera); // Render the scene
};

animate(); // Start the rendering loop
