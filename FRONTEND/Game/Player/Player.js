import * as THREE from "three"

import player from "../../mock-dev-data/playerinfo.json"
import { world } from "../Index";

class Player {

    constructor() {

        this.name = player.name;

        this.width = 0.7;

        this.height = 0.8;

        this.velocity = 5;

        this.jumpStrenght = 3.75;

        this.position = {
            x: 1,
            y: 3,
            z: 0.0100,
            roundedX: 0,
            roundedY: 1
        }

        this.movement = {
            jump: false,
            left: false,
            right: false,
            down: false
        }

        this.collisions = {
            top: false,
            bottom: false,
            left: false,
            right: false
        }

        this.collidesWith = {
            top: undefined,
            bottom: undefined,
            left: undefined,
            right: undefined
        }

        this.airTime = 0.5;
        this.timeSinceLastPunch = 3;

        this.mouseAction = "Punch";

        this.object = undefined;

    }

    spawn(scene) {

        const plane = new THREE.PlaneGeometry(this.width, this.height);

        const material = new THREE.MeshBasicMaterial({ 
            color: new THREE.Color("red"),
            side: THREE.DoubleSide,
            transparent: true,
         });

        const hitbox = new THREE.Mesh(plane, material);

        hitbox.name = `Player_${this.name}`

        hitbox.position.x = this.position.x;
        hitbox.position.y = this.position.y;

        this.object = hitbox;

        const playerPlane = new THREE.PlaneGeometry((this.width * 0.85), (this.height * 0.85));

        const playerMaterial = new THREE.MeshBasicMaterial({ 
            color: new THREE.Color("orange"),
            side: THREE.DoubleSide,
            transparent: true,
         });

        const player = new THREE.Mesh(playerPlane, playerMaterial);

         hitbox.add(player)

        scene.add(hitbox)

    }

    update(dt) {

        this.timeSinceLastPunch += dt;

        // Gravity
        this.airTime += dt;
        let gravityStrenght = (1 * (this.airTime * this.airTime));

        for (let i = 0; i < world.blocksData.blocks.length; i++) {

            let block = world.blocksData.blocks[i];

            if (
                ( ( (block.position.x - 0.8) < this.position.x ) && ( (block.position.x + 0.8) > this.position.x) )
                &&
                ( ( (block.position.y - 0.5) < (this.position.y - (this.height / 2)) ) && ( (block.position.y + 0.5) > (this.position.y - (this.height / 2)) ) )
                &&
                block.id != 0
            ) {

                this.airTime = 0;
                gravityStrenght = 0;

            }

        }

        this.position.y -= gravityStrenght * dt;

        this.position.roundedX = Math.round(this.position.x)
        this.position.roundedY = Math.round(this.position.y)

        this.object.position.y = this.position.y;
        this.object.position.x = this.position.x;
    
    }

    jump(dt) {

        this.position.y += this.jumpStrenght * dt;

    }

    moveLeft(dt) {

        for (let i = 0; i < world.blocksData.blocks.length; i++) {

            let block = world.blocksData.blocks[i];

            if (
                ( ( (block.position.x + 0.5) > (this.position.x - (this.width / 2) ) ) && ( (block.position.x - 0.5) < (this.position.x - (this.width / 2) ) ) )
                &&
                ( ( (block.position.y - 0.45 ) < (this.position.y - (this.height / 2) + 0.1 ) ) && ( (block.position.y + 0.45) > (this.position.y - (this.height / 2) + 0.1 ) ) )
                &&
                block.id != 0
            ) {

                console.log(block.position, this.position)

                return;

            }

        }

        this.position.x -= this.velocity * dt;

    }

    moveRight(dt) {

        for (let i = 0; i < world.blocksData.blocks.length; i++) {

            let block = world.blocksData.blocks[i];

            if (
                ( ( (block.position.x + 0.5) > (this.position.x + (this.width / 2) ) ) && ( (block.position.x - 0.5) < (this.position.x + (this.width / 2) ) ) )
                &&
                ( ( (block.position.y - 0.5) < (this.position.y - (this.height / 2) + 0.1 ) ) && ( (block.position.y + 0.5) > (this.position.y - (this.height / 2) + 0.1 ) ) )
                &&
                block.id != 0
            ) {

                console.log(block.position, this.position)

                return;

            }

        }

        this.position.x += this.velocity * dt;

    }

    moveDown(dt) {

        this.position.y -= this.velocity * dt;

    }

    punch(intersects, dt) {

        if (this.timeSinceLastPunch < 0.25) { return; }

        this.timeSinceLastPunch = 0;

        if (intersects === undefined) { return; }

        let clicked = intersects[0];

        if (clicked === undefined) { return; }

        if (clicked.object.name === "Block") {

            let blockObject = world.blocksData.blocks[clicked.object.userData.index]

            if (blockObject.id === 0) { return; }

            blockObject.timeSinceLastHit = Date.now();
            
            blockObject.punchCount += 1;

            blockObject.breakAnimation();

        }

        if (clicked.object.name === "BackgroundBlock") {

            let blockObject = world.blocksData.backgroundBlocks[clicked.object.userData.index]

            console.log(clicked.object.name, clicked.object.userData)

        }

        if (clicked.object.name.includes("Player_")) {

            console.log(clicked.object.name, clicked.object.userData)

        }

        if (clicked.object.name === "Tree") {

            let blockObject = world.blocksData.blocks[clicked.object.userData.index]

            console.log(clicked.object.name, clicked.object.userData)

        }

        if (clicked.object.name === "Sign") {

            let blockObject = world.blocksData.blocks[clicked.object.userData.index]

            console.log(clicked.object.name, clicked.object.userData)

        }

        if (clicked.object.name === "Door") {

            let blockObject = world.blocksData.blocks[clicked.object.userData.index]

            console.log(clicked.object.name, clicked.object.userData)

        }

        if (clicked.object.name === "EntryPoint") {

            let blockObject = world.blocksData.blocks[clicked.object.userData.index]

            console.log(clicked.object.name, clicked.object.userData)

        }
        
    }

    build() {

    }

    plant() {

    }

    settings() {

    }

};

export default Player;