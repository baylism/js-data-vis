import * as THREE from "three";

function Points(scene) {
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.Fog(0x050505, 2000, 3500);
    //
    var particles = 500000;
    var geometry = new THREE.BufferGeometry();
    var positions = [];
    var colors = [];
    var color = new THREE.Color();
    var n = 1000, n2 = n / 2; // particles spread in the cube
    for (var i = 0; i < particles; i++) {
        // positions
        var x = Math.random() * n - n2;
        var y = Math.random() * n - n2;
        var z = Math.random() * n - n2;
        positions.push(x, y, z);
        // colors
        var vx = (x / n) + 0.5;
        var vy = (y / n) + 0.5;
        var vz = (z / n) + 0.5;
        color.setRGB(vx, vy, vz);
        colors.push(color.r, color.g, color.b);
    }
    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.computeBoundingSphere();
    //


    // var material = new THREE.PointsMaterial({ size: 15, vertexColors: THREE.VertexColors });

    let material = new THREE.PointsMaterial( { size: 35, sizeAttenuation: false, alphaTest: 0.5, transparent: true } );
    material.color.setHSL( 1.0, 0.3, 0.7 );


    let points = new THREE.Points(geometry, material);
    scene.add(points);



    this.update = function () {
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.005;
    }
}

export default Points;