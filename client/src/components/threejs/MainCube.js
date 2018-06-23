import * as THREE from "three";

function MainCube(scene) {
    scene.background = new THREE.Color( 0x000104 );


    let geometry = new THREE.BoxGeometry( 50, 20, 20 );

    for ( let i = 0; i < geometry.faces.length; i += 2 ) {
            let hex = Math.random() * 0xffffff;
            geometry.faces[ i ].color.setHex( hex );
            geometry.faces[ i + 1 ].color.setHex( hex );
        }


    let material = new THREE.MeshBasicMaterial(
        {
            vertexColors: THREE.FaceColors,
            overdraw: 0.5,
            wireframe: true
        }
        );

    let cube = new THREE.Mesh( geometry, material );

    // createMesh()

    // var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
    //
    //
    //
    // var material = new THREE.MeshBasicMaterial(
    //     {
    //         color: 0x00ff00
    //     }
    //     );
    // var cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );

    // let geometry = new THREE.BoxGeometry( 20, 20, 20 );
    // for ( let i = 0; i < geometry.faces.length; i += 2 ) {
    //     let hex = Math.random() * 0xffffff;
    //     geometry.faces[ i ].color.setHex( hex );
    //     geometry.faces[ i + 1 ].color.setHex( hex );
    // }
    // let material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );
    // let cube = new THREE.Mesh( geometry, material );
    // cube.position.y = 150;
    scene.add( cube );
    
    
    this.update = function () {
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.005;
    }
}

export default MainCube;