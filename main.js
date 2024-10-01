console.log("Three.js script is running");

// Create the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set the background color to light gray (or use any other color)
renderer.setClearColor(0xd3d3d3); // Light gray background

// Add ambient light (increase intensity for overall brightness)
var ambientLight = new THREE.AmbientLight(0xffffff, 2); // Increase intensity to 2
scene.add(ambientLight);

// Add directional light (like sunlight, increase intensity and adjust position)
var directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Increase intensity
directionalLight.position.set(20, 20, 10); // Adjust light position for better illumination
scene.add(directionalLight);

// Add a spotlight (for focused lighting on the model)
var spotLight = new THREE.SpotLight(0xffffff, 2); // Bright spotlight with intensity of 2
spotLight.position.set(15, 40, 35); // Position the spotlight above the model
scene.add(spotLight);

// Add Orbit Controls for camera movement
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// Load the 3D model (replace 'buildingModelAtlanta.glb' with your actual model file name)
var loader = new THREE.GLTFLoader();
loader.load('buildingModelAtlanta.glb', function(gltf) {
    var model = gltf.scene;
    scene.add(model);
    
    // Adjust camera position and target to better fit the model in view
    camera.position.set(10, 10, 20); // Set the camera position further back and centered
    controls.target.set(0, 0, 0); // Make sure the camera looks at the center of the model
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
