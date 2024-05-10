import * as THREE from "three"

import player from "../../mock-dev-data/playerinfo.json"
import { world } from "../Index";

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

    update(dt) {

        // Gravity
        
        let gravityStrenght = 10 * dt * dt;

        let roundedX = Math.round(this.position.x)
        let roundedY = Math.round(this.position.y + 0.5)

        for (let i = 0; i < world.blocksData.blocks.length; i++){

            let block = world.blocksData.blocks[i];

            if (
                block.position.x === roundedX && block.position.y === (roundedY - 1)
            ) {

                gravityStrenght = 0;

            }

        }

        this.position.y -= gravityStrenght;

        this.object.position.y = this.position.y;
        this.object.position.x = this.position.x;
    
    }

    jump(dt) {

        this.position.y += 0.01;

    }

    moveLeft(dt) {

        this.position.x -= this.velocity * dt;

    }

    moveRight(dt) {

        this.position.x += this.velocity * dt;

    }

    moveDown(dt) {

        this.position.y -= this.velocity * dt;

    }

};

export default Player;