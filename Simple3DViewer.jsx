import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
// FIX: Added the '.js' file extension to resolve the module path error for OrbitControls.
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; 

/**
 * Custom 3D Viewer component using vanilla Three.js integrated via React hooks.
 * It displays a rotating cube and a sphere, and allows camera manipulation via OrbitControls.
 */
const Simple3DViewer = () => {
    // 1. Ref to attach the Three.js canvas element
    const mountRef = useRef(null);

    // 2. State to track the currently active object type
    const [objectType, setObjectType] = useState('Cube');
    
    // State to hold the current animation frame ID for cleanup
    const animationFrameRef = useRef(null);

    // Function to initialize the scene and controls (wrapped in useCallback for useEffect dependency)
    const initThreeJs = useCallback(() => {
        if (!mountRef.current) return;

        // --- 1. Basic Setup ---
        // We use clientWidth/Height to get the dimensions of the parent div,
        // which makes the canvas responsive to its container size.
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a2e); // Dark purple background

        // Camera: PerspectiveCamera(FOV, Aspect, Near, Far)
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(0, 1, 5); // Set camera slightly back and up

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Append the canvas to the ref'd div, clearing any previous canvas
        while (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild);
        }
        mountRef.current.appendChild(renderer.domElement);
        
        // --- 2. Lighting ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const spotLight = new THREE.SpotLight(0xffffff, 1.5, 100, Math.PI * 0.25, 0.5, 2);
        spotLight.position.set(5, 5, 5);
        scene.add(spotLight);

        // --- 3. Objects (Cube and Sphere) ---
        // Cube Mesh (BoxGeometry)
        const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffaa, shininess: 50 });
        const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubeMesh.position.set(-1.5, 0, 0);
        scene.add(cubeMesh);

        // Sphere Mesh (SphereGeometry)
        const sphereGeometry = new THREE.SphereGeometry(1.2, 32, 32);
        const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffaa00, shininess: 50 });
        const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphereMesh.position.set(1.5, 0, 0);
        scene.add(sphereMesh);
        
        // --- 4. Controls ---
        // Initialize OrbitControls and bind it to the renderer's DOM element
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // For a smoother look
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 2;
        controls.maxDistance = 10;
        
        // --- 5. Animation Loop ---
        let animationId;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            // Update controls if damping is enabled
            controls.update();

            // Object specific rotation
            if (objectType === 'Cube') {
                cubeMesh.rotation.x += 0.005;
                cubeMesh.rotation.y += 0.005;
            } else if (objectType === 'Sphere') {
                sphereMesh.rotation.x += 0.005;
                sphereMesh.rotation.z += 0.005;
            }

            renderer.render(scene, camera);
        };
        
        animate();
        animationFrameRef.current = animationId;

        // --- 6. Resize Handling ---
        const handleResize = () => {
            const newWidth = mountRef.current.clientWidth;
            const newHeight = mountRef.current.clientHeight;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);
        
        // Return a cleanup function for useEffect
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameRef.current);
            controls.dispose(); // Dispose controls to remove event listeners
            // The renderer's DOM element is removed implicitly when React unmounts mountRef.current
        };
    }, [objectType]); // Re-run effect when objectType changes

    // Run the initialization function when the component mounts or objectType changes
    useEffect(() => {
        initThreeJs();
    }, [initThreeJs]); // Dependencies include the stable init function

    const toggleObject = () => {
        setObjectType(prev => (prev === 'Cube' ? 'Sphere' : 'Cube'));
    };

    return (
        <div className="flex flex-col h-full bg-gray-900 text-white font-inter"> 
            {/* Header and Controls */}
            <div className="p-4 bg-gray-800 shadow-lg flex flex-col sm:flex-row items-center justify-between">
                <h1 className="text-xl font-bold text-indigo-400 mb-2 sm:mb-0">
                    Interactive 3D Demo
                </h1>
                <div className="flex items-center space-x-4">
                    <p className="text-sm text-gray-400">
                        Animating: <span className="font-semibold text-white">{objectType}</span>
                    </p>
                    <button
                        onClick={toggleObject}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition duration-200"
                    >
                        Toggle Focus
                    </button>
                </div>
            </div>

            {/* 3D Canvas Container */}
            <div 
                ref={mountRef} 
                className="flex-grow w-full"
            >
                {/* The Three.js canvas will be injected here */}
            </div>

            {/* Footer / Instructions */}
            <div className="p-2 text-center text-xs bg-gray-800 text-gray-500">
                Use your mouse to drag (rotate) and scroll (zoom) the scene.
            </div>
        </div>
    );
};

export default Simple3DViewer;