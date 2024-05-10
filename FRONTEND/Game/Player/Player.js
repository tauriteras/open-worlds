import * as THREE from "three"

import player from "../../mock-dev-data/playerinfo.json"

class Player {

    constructor() {

        this.name = player.name;

        this.width = 1;

        this.height = 1;

        this.velocity = 5;

        this.position = {
            x: 0,
            y: 1,
            z: 0.0100
        }

        this.movement = {
            jump: false,
            left: false,
            right: false,
            down: false
        }

        this.object = undefined;

    }

    spawn() {

        const plane = new THREE.PlaneGeometry(this.width, this.height);

        const material = new THREE.MeshBasicMaterial({ 
            color: new THREE.Color("red"),
            side: THREE.DoubleSide,
            transparent: true,
         });

        const mesh = new THREE.Mesh(plane, material);

        mesh.name = `Player_${this.name}`

        mesh.position.x = this.position.x;
        mesh.position.y = this.position.y;

        this.object = mesh;

        return mesh;

    }

    jump(dt) {

    }

    moveLeft(dt) {

        this.position.x -= this.velocity * dt;
        this.object.position.x = this.position.x;

    }

    moveRight(dt) {

        this.position.x += this.velocity * dt;
        this.object.position.x = this.position.x;

    }

    moveDown(dt) {

        this.position.y -= this.velocity * dt;
        this.object.position.y = this.position.y;

    }

};

export default Player;