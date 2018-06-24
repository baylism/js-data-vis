import * as THREE from "three";

function Points(scene) {
    var particles = 5;

    var geometry = new THREE.BufferGeometry();

    // create a generic buffer of binary data (a single particle has 16 bytes of data)
    var arrayBuffer = new ArrayBuffer(particles * 16);


    // the following typed arrays share the same buffer
    var interleavedFloat32Buffer = new Float32Array(arrayBuffer);
    var interleavedUint8Buffer = new Uint8Array(arrayBuffer);


    var color = new THREE.Color();
    var n = 10, n2 = n / 2; // particles spread in the cube


    for (var i = 0; i < interleavedFloat32Buffer.length; i += 4) {

        // position (first 12 bytes)
        var x = Math.random() * n - n2;
        var y = Math.random() * n - n2;
        var z = Math.random() * n - n2;

        interleavedFloat32Buffer[i + 0] = x;
        interleavedFloat32Buffer[i + 1] = y;
        interleavedFloat32Buffer[i + 2] = z;
   
        // color (last 4 bytes)
        var vx = (x / n) + 0.5;
        var vy = (y / n) + 0.5;
        var vz = (z / n) + 0.5;
        color.setRGB(vx, vy, vz);
        var j = (i + 3) * 4;
        interleavedUint8Buffer[j + 0] = color.r * 255;
        interleavedUint8Buffer[j + 1] = color.g * 255;
        interleavedUint8Buffer[j + 2] = color.b * 255;
        interleavedUint8Buffer[j + 3] = 0; // not needed
    }

    var interleavedBuffer32 = new THREE.InterleavedBuffer(interleavedFloat32Buffer, 4);
    var interleavedBuffer8 = new THREE.InterleavedBuffer(interleavedUint8Buffer, 16);

    geometry.addAttribute('position', new THREE.InterleavedBufferAttribute(interleavedBuffer32, 3, 0, false));
    geometry.addAttribute('color', new THREE.InterleavedBufferAttribute(interleavedBuffer8, 3, 12, true));


    var material = new THREE.PointsMaterial(
        { 
            size: 15, 
            vertexColors: THREE.VertexColors 
        }
    );

    let points = new THREE.Points(geometry, material);
    scene.add(points);


    this.update = function () {
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.005;
    }
}

export default Points;