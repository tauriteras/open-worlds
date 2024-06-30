import * as THREE from 'three'

import blockfactsheet from "../../mock-dev-data/blockinfo.json"

import Block from "./Components/Blocks/Block"
import BackgroundBlock from "./Components/Blocks/BackgroundBlock"
import BackgroundAir from "./Components/Blocks/BackgroundAir"
import Door from "./Components/Blocks/Door"
import EntryPoint from "./Components/Blocks/EntryPoint"
import Sign from "./Components/Blocks/Sign"
import Tree from "./Components/Blocks/Tree"
import Air from "./Components/Blocks/Air"
import Liquid from "./Components/Blocks/Special/Liquid"

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

            switch(blocktype) {
                case "Air":
                    block = new Air(x, y);
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

            block.blocksAround.top = this.blocksData.blocks[i + this.size.width];
            block.blocksAround.bottom = this.blocksData.blocks[i - this.size.width];
            block.blocksAround.right = this.blocksData.blocks[i + 1];
            block.blocksAround.left = this.blocksData.blocks[i - 1];

            if (block.blocksAround.top != undefined && 
                block.blocksAround.top.id === block.id &&
                block.id === 2)
                 {
                block.object.material.map = new THREE.TextureLoader().load(
                    '../../public/static/images/Blocks/' 
                    + blockfactsheet[block.id].textures[1] 
                    + '.png')
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

    update() {

    }

};

export default World;