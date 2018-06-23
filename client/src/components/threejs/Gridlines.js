import * as THREE from "three";

function MainCube(scene) {

    var gridHelper = new THREE.GridHelper( 50, 40, 0x0000ff, 0x808080 );
    gridHelper.position.y = -15;
    // gridHelper.position.x = - 150;
    scene.add( gridHelper );


    this.update = function () {

    }
}

export default MainCube;