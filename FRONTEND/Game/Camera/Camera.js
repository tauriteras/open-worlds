import * as THREE from 'three'

class Camera {

    constructor(x, y, z) {

        this.position = {
            x: x,
            y: y,
            z: 5
        }

        this.cameraObject = undefined;

        this.zooming = false;
        this.zoomSpeed = 4.5;
        this.zoomDirection = 1;
        
    }

    initialize() {

        let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

        this.cameraObject = camera
        this.cameraObject.position.z = this.position.z

    }

    update(playerX, playerY) {

        this.position.x = playerX;
        this.position.y = playerY;

        this.cameraObject.position.x = playerX;
        this.cameraObject.position.y = playerY;

        this.cameraObject.position.z = this.position.z;

    }

}

export default Camera