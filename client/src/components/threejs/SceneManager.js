import * as THREE from 'three';
import MainCube from "./MainCube";
import Gridlines from "./Gridlines";
import Points from "./Points";
import Sphere from "./Sphere";
import PointCube from "./PointCube";

var OrbitControls = require('three-orbit-controls')(THREE)


export default canvas => {

    const clock = new THREE.Clock();
    const origin = new THREE.Vector3(0,0,0);

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    };

    const mousePosition = {
        x: 0,
        y: 0
    };

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const sceneSubjects = createSceneSubjects(scene);
    const controls = buildControls(camera);

    function createSceneSubjects(scene) {
        const sceneSubjects = [
            // new GeneralLights(scene),
            // new MainCube(scene),
            new Gridlines(scene),
            // new Points(scene)
            new Sphere(scene)
            // new PointCube(scene)
        ];

        return sceneSubjects;
    }

    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#FFF");

        return scene;
    }

    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });

        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true; 

        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 4;
        const farPlane = 200; 
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        camera.position.y = 60;
        camera.position.z = 60;

        return camera;
    }

    function buildControls(camera) {
        const controls = new OrbitControls(camera)

        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled

        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.minDistance = 2;
        controls.maxDistance = 1000;
        controls.maxPolarAngle = Math.PI / 2;

        return controls;
    }

    function update() {
        const elapsedTime = clock.getElapsedTime();

        // call the update method for each SceneSubject
        for(let i=0; i<sceneSubjects.length; i++)
            sceneSubjects[i].update(elapsedTime);

        // updateCameraPositionRelativeToMouse();
        controls.update();

        // call threejs render method
        renderer.render(scene, camera);
    }

    function updateCameraPositionRelativeToMouse() {
        camera.position.x += (  (mousePosition.x * 0.01) - camera.position.x ) * 0.01;
        camera.position.y += ( -(mousePosition.y * 0.01) - camera.position.y ) * 0.01;
        camera.lookAt(origin);
    }

    function onWindowResize() {
        const { width, height } = canvas;
        
        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    }

    function onMouseMove(x, y) {
        mousePosition.x = x;
        mousePosition.y = y;
    }

    // can add more public methods like onclick()

    return {
        update,
        onWindowResize,
        onMouseMove
    }
}