import * as THREE from 'three'

import blockfactsheet from "../../mock-dev-data/blockinfo.json"

import { world } from '../Index.js'

import Block from "./Components/Blocks/Block"
import BackgroundBlock from "./Components/Blocks/BackgroundBlock"
import BackgroundAir from "./Components/Blocks/BackgroundAir"
import Door from "./Components/Blocks/Door"
import EntryPoint from "./Components/Blocks/EntryPoint"
import Sign from "./Components/Blocks/Sign"
import Tree from "./Components/Blocks/Tree"
import Air from "./Components/Blocks/Air"
import Liquid from "./Components/Blocks/Special/Liquid"
import SmallLock from './Components/Blocks/Locks/SmallLock'

class World {

    constructor(scene) {

        this.scene = scene;

        this.entryPos = {
            x: undefined,
            y: undefined
        }

        this.modifiers = undefined;

        this.size = undefined;

        this.blocksData = {
            blocks: [],
            backgroundBlocks: []
        };

        this.customWeather = undefined;

        this.loadingDone = false;
    }

    load(worldData) {

        console.log('Loading world')

        let worldSize = worldData.size.width * worldData.size.height
        this.size = worldData.size

        let x = 1;
        let y = 1;

        for(let i = 0; i < worldSize; i++) {

            let block, backgroundblock;

            let blockId = worldData.blocks[i][0]
            //let bgId = worldData.backgroundBlocks[i][0];

            let blocktype = blockfactsheet[blockId].type;

            console.log(blockId)

            switch(blocktype) {
                case "Air":
                    block = new Air(blockId, x, y);
                    break;
                case "Block":
                    block = new Block(blockId, x, y);
                    break;
                case "Door":
                    block = new Door(blockId, x, y);
                    break;
                case "Sign":
                    block = new Sign(blockId, x, y);
                    break;
                case "EntryPoint":
                    block = new EntryPoint(blockId, x, y);
                    this.entryPos.x = x;
                    this.entryPos.y = y;
                    break;
                case "Tree":
                    block = new Tree(blockId, x, y);
                    break;
                case "Liquid":
                    block = new Liquid(blockId, x, y);
                    break;
                case "Lock":
                    if (blockId === 8) {
                        block = new SmallLock(blockId, x, y);
                        console.log("Small Lock", block);
                    }
                    break;
            }

            if (worldData.freshGeneration === true) {

                if(y <= 23) {
                    backgroundblock = new BackgroundBlock(7, x, y)
                } else {
                    backgroundblock = new BackgroundAir(x, y)
                }

            } else {

                if (bgId != 0) {
                    backgroundblock = new BackgroundBlock(bgId, x, y)
                } else {
                    backgroundblock = new BackgroundAir(x, y)
                }

            }
       
            this.blocksData.blocks.push(block)
            this.blocksData.backgroundBlocks.push(backgroundblock)

            this.scene.add ( backgroundblock.render(i) ) 
            this.scene.add( block.render(i) ); 

            if (x === worldData.size.width) {
                x = 0;
                y++;
            }
        
            x++; 

        }

        console.log("World loaded!")

        for (let i = 0; i < this.blocksData.blocks.length; i++) {

            let block = this.blocksData.blocks[i];

            block.blocksAround.top = world.blocksData.blocks[block.object.userData.index + world.size.width];

            block.blocksAround.bottom = world.blocksData.blocks[block.object.userData.index - world.size.width];

            if(world.blocksData.blocks[block.object.userData.index + 1] != undefined) {
                if(world.blocksData.blocks[block.object.userData.index + 1].position.x === (block.position.x + 1)) {
                    block.blocksAround.right = world.blocksData.blocks[block.object.userData.index + 1];
                }
            } else {
                block.blocksAround.right = undefined;
            }

            if(world.blocksData.blocks[block.object.userData.index - 1] != undefined) {
                if(world.blocksData.blocks[block.object.userData.index - 1].position.x === (block.position.x - 1)) {
                    block.blocksAround.left = world.blocksData.blocks[block.object.userData.index - 1];
                }
            } else {
                block.blocksAround.left = undefined
            }

            if (block.blocksAround.top != undefined && 
                block.blocksAround.top.id === block.id &&
                block.id === 2)
                 {
                block.object.material.map = new THREE.TextureLoader().load(
                    '../../public/static/images/Blocks/' 
                    + blockfactsheet[block.id].textures[1] 
                    + '.png')
            }

            if (block.type === "Lock") {
                findLockableTiles(block);
            }

        }

    }

    updateBlock(index, newType, newId) {

        let blockToUpdate;
        let newBlock;

        switch(newType) {

            case "Air":
                blockToUpdate = this.blocksData.blocks[index];
                newBlock = new Air(blockToUpdate.position.x, blockToUpdate.position.y);
                this.blocksData.blocks[index] = newBlock;
                break;

            case "Block": 
                blockToUpdate = this.blocksData.blocks[index];
                newBlock = new Block(newId, blockToUpdate.position.x, blockToUpdate.position.y);
                this.blocksData.blocks[index] = newBlock;
                break;
            case "BackgroundAir":
                blockToUpdate = this.blocksData.backgroundBlocks[index];
                newBlock = new BackgroundAir(blockToUpdate.position.x, blockToUpdate.position.y);
                this.blocksData.backgroundBlocks[index] = newBlock;
                break;
            case "Background":
                blockToUpdate = this.blocksData.backgroundBlocks[index];
                newBlock = new BackgroundBlock(newId, blockToUpdate.position.x, blockToUpdate.position.y)
                this.blocksData.backgroundBlocks[index] = newBlock;
                break;

        }

        this.scene.remove( blockToUpdate.object );
        this.scene.add( newBlock.render(index) );

    }

};

async function findLockableTiles(lock) {

    let frontier = [];
    frontier.push(lock);

    let reached = [lock];
    let neighbours = [];

    let i = 0;

    while (!(frontier.length === 0)) {   

        let current = frontier[i];

        let surrounding = [
            current.blocksAround.top,
            current.blocksAround.left,
            current.blocksAround.right,
            current.blocksAround.bottom
        ];;

        // Kontrolli igat naaber plokki
        surrounding.forEach(block => {

            let alreadyReached = false;

            reached.forEach(reachedBlock => {
                if (block === reachedBlock) {
                    alreadyReached = true;
                }
            })

            if (!alreadyReached && block != undefined) {

                if (
                    (
                    (block.locked === false &&
                    block.isBreakable === true)
                    &&
                    block.type != "EntryPoint" 
                    ||
                    block.type === "Air") 
                    &&
                    lock.size < lock.maxSize) {
            
                        frontier.push(block);
                        reached.push(block);

                        lock.size++;
            
                }
            }

        });

        i++;

        if (i > lock.maxSize || lock.size === lock.maxSize) {

            frontier = [];

        }

    }

    lock.createLockOverlay(reached);

}

export default World;