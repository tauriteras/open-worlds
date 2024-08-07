import * as THREE from "three"

import player from "../../mock-dev-data/playerinfo.json"
import { world } from "../Game";

class Player {

    constructor(scene, x, y) {

        this.name = player.name;

        this.width = 0.7;

        this.height = 0.8;

        this.velocity = 5;

        this.jumpStrenght = 3.75;

        this.position = {
            x: x,
            y: y,
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
        this.selectedItemId = 3;
        this.selectedItemType = "Block";

        this.object = undefined;

        this.scene = scene;

    }

    spawn() {

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

        this.scene.add(hitbox)

    }

    update(dt) {

        if (this.object === undefined) { return; }

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
                block.collisions.top === true
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
                block.collisions.right === true
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
                block.collisions.left === true
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

        let clicked;

        for (let i = 0; i < intersects.length; i++) {

            if (clicked === undefined) {

                clicked = intersects[i];

            }

        }

        if (clicked === undefined) { return; }

        if (clicked.object.name === "Block") {

            let blockObject = world.blocksData.blocks[clicked.object.userData.index]

            if (blockObject.id === 0) { return; }

            if (blockObject.isBreakable === false) {

                return;

            }

            blockObject.timeSinceLastHit = Date.now();
            
            blockObject.punchCount += 1;

            blockObject.breakAnimation();

            if (blockObject.punchCount === blockObject.hardness) {
                
                world.updateBlock(blockObject.object.userData.index, "Air");

                blockObject.updateBlocksAround();

            }

            console.log("clicked", world.blocksData.blocks[clicked.object.userData.index])

        }

        if (clicked.object.name === "BackgroundBlock") {

            let blockObject = world.blocksData.backgroundBlocks[clicked.object.userData.index]

            if (blockObject.id === 0) { return; }

            blockObject.timeSinceLastHit = Date.now();
            
            blockObject.punchCount += 1;

            blockObject.breakAnimation();

            console.log(blockObject, "blovk")

            if (blockObject.punchCount === blockObject.hardness) {
                
                world.updateBlock(blockObject.object.userData.index, "BackgroundAir");

            }

            console.log("clicked", world.blocksData.backgroundBlocks[clicked.object.userData.index])


        }

        if (clicked.object.name.includes("Player_")) {

            console.log(this)

        }

    }

    build(intersects) {

        if (intersects === undefined) { return; }

        let clicked;

        for (let i = 0; i < intersects.length; i++) {

            if (clicked === undefined) {

                clicked = intersects[i];

            }

        }

        console.log("clicked", clicked)

        if (clicked === undefined) { return; }

        if (clicked.object.name === "Air") {

            world.updateBlock(clicked.object.userData.index, "Block", this.selectedItemId);

        }

        if (clicked.object.name === "BackgroundAir") {

            world.updateBlock(clicked.object.userData.index, "Background", 7);

        }

    }

    plant(intersects) {

        if (intersects === undefined) { return; }

        let clicked = intersects[0];

        if (clicked === undefined) { return; }

    }

    settings(intersects) {

        if (intersects === undefined) { return; }

        let clicked = intersects[0];

        if (clicked === undefined) { return; }

    }

};

export default Player;