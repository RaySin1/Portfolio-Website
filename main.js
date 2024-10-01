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
    
    // Keep the building stationary
    model.rotation.y = -Math.PI / 3.5; // Adjust the initial rotation as needed

    // Set the initial camera position (zoomed out)
    let radius = 1000; // Radius for the camera's circular path
    let angle = 0; // Start at 0 degrees (facing the building)

    camera.position.set(radius * Math.cos(angle), 300, radius * Math.sin(angle)); // Set initial position
    controls.target.set(0, 60, 0); // Focus the camera on the middle of the building

    // Variables to control rotation
    const rotationSpeed = 0.001; // Rotation speed
    const fullRotation = Math.PI * 2; // Full 360 degrees (2π radians)

    // Animation loop to rotate the camera around the building
    var animate = function () {
        if (angle < fullRotation) {
            requestAnimationFrame(animate);

            // Rotate the camera around the Y-axis in a circle (360 degrees)
            angle += rotationSpeed; // Increment the angle for smooth rotation
            camera.position.x = radius * Math.cos(angle); // X position on the circle
            camera.position.z = radius * Math.sin(angle); // Z position on the circle

            // Keep the camera target fixed on the building
            controls.target.set(0, 60, 0); // Always focus on the building
            controls.update(); // Update the camera position

            renderer.render(scene, camera); // Render the scene
        } else {
            // Once the rotation is complete, set the final camera position and stop animation
            camera.position.set(0, 300, 400); // Final camera position
            controls.target.set(0, 60, 0); // Center the camera on the building
            controls.update();
            renderer.render(scene, camera); // Render the final scene
        }
    };

    animate(); // Start the animation loop

}, undefined, function(error) {
    console.error(error);
});
