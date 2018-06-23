import * as THREE from "three";

class Points {
    constructor(scene) {
        this.maxAmount = 10; // pre-allocate typed arrays
        this.numAdded = 0;

        let radius = 20; // to limit point positions

        this.positions = new Float32Array(this.maxAmount * 3);
        this.colors = new Float32Array(this.maxAmount * 3);

        while ((this.numAdded < 1) && (this.numAdded < this.maxAmount)) {
            // this.addPoint(Math.random() * 10, Math.random() * 10, Math.random() * 10, 0x03a0dd)
            this.addPoint(10, 10, 10, 0x03a0dd)
        }

        // create geometry
        let geometry = new THREE.BufferGeometry();
        geometry.addAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        geometry.addAttribute('color', new THREE.BufferAttribute(this.colors, 3));
        geometry.computeBoundingSphere();

        // create materials
        let material = new THREE.PointsMaterial({
            size: 5,
            vertexColors: THREE.VertexColors
        });

        // create pointcloud
        this.points = new THREE.Points(geometry, material);
        scene.add(this.points);

        // TODO updates for this component
        this.update = function () {
            // this.movePoint(0, 5, 5, 5);
            // this.nudgePoint(0);
        };
    }

    // TODO optimisations reusing same Color and Vector objects
    addPoint(x, y, z, hexColour) {
        if (this.numAdded == this.maxAmount) {
            console.log("Point buffer full, not adding point");
            return;
        }

        let colour = new THREE.Color();
        let vertex = new THREE.Vector3(x, y, z);

        colour == undefined ? color.setRGB(Math.random(), Math.random(), Math.random()) : colour.set(hexColour);

        vertex.toArray(this.positions, (this.numAdded * 3))
        colour.toArray(this.colors, this.numAdded * 3);
        // console.log("added point to index " + this.numAdded);

        this.numAdded += 1;
    }

    movePoint(index, toX, toY, toZ) {

        console.log("moving ")
        this.points.geometry.attributes.position.needsUpdate = true;

        // console.log(points.geometry.attributes.position.array)
        this.points.geometry.getAttribute('position').setXYZ(index, toX, toY, toZ);
    }

    nudgePoint(index) {
        let toX = this.points.geometry.getAttribute('position').getX(index);
        let toY = this.points.geometry.getAttribute('position').getY(index);
        let toZ = this.points.geometry.getAttribute('position').getZ(index);

        toX += 0.01;
        toY += 0.01;
        toZ += 0.01;

        // console.log("moving " + toX)
        this.points.geometry.attributes.position.needsUpdate = true;

        this.movePoint(index, toX, toY, toZ)
    }
}

export default Points;