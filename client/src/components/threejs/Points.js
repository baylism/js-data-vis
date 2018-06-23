import * as THREE from "three";

class Points {
    constructor(scene) {
        let maxAmount = 10; // allocate typed array to maximum size needed
        let numAdded = 0;

        let radius = 20; // to limit point positions

        let positions = new Float32Array(maxAmount * 3);
        let colors = new Float32Array(maxAmount * 3);
        let sizes = new Float32Array(maxAmount);


        let color = new THREE.Color();
        let vertex = new THREE.Vector3();
        for (let i = 0; i < maxAmount; i++) {
            // set positions
            vertex.x = (Math.random() * 2 - 1) * radius;
            vertex.y = (Math.random() * 2 - 1) * radius;
            vertex.z = (Math.random() * 2 - 1) * radius;
            vertex.toArray(positions, i * 3);
            // set colours
            color.setRGB(Math.random(), Math.random(), Math.random());
            color.toArray(colors, i * 3);
        }
        // create geometry and add attributes
        let geometry = new THREE.BufferGeometry();
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.computeBoundingSphere();
        let material = new THREE.PointsMaterial({
            size: 5,
            vertexColors: THREE.VertexColors
        });
        let sphere = new THREE.Points(geometry, material);
        scene.add(sphere);
        this.update = function () {
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.005;
        };
    }

    addPoint(x, y, z, hexColour) {
        let colour = new THREE.Color();
        let vertex = new THREE.Vector3(x, y, z);

        colour==undefined ? color.setRGB(Math.random(), Math.random(), Math.random()) : color.set(hexColour);

        vertex.toArray(positions, (numAdded * 3))
        color.toArray(colors, numAdded * 3);

        numAdded += 1;

        console.log("added point to index " + numAdded);
    }
}

export default Points;