import world from "../../mock-dev-data/worldinfo.json"
import blockdata from "../../mock-dev-data/blockinfo.json"

import Block from "./Components/Blocks/Block"
import BackgroundBlock from "./Components/Blocks/BackgroundBlock"
import Door from "./Components/Blocks/Door"
import EntryPoint from "./Components/Blocks/EntryPoint"
import Sign from "./Components/Blocks/Sign"
import Tree from "./Components/Blocks/Tree"
import Air from "./Components/Blocks/Special/Air"

class World {

    constructor(scene) {

        this.name = world.name

        this.owner = world.owner

        this.admins = world.admins

        this.blocksData = {
            blocks: [],
            backgroundBlocks: [],
            trees: []
        }

        this.hasWeatherMachine = false;
        this.weather = "Sunny";


        this.scene = scene;
    }

    load() {

        for(let i = 0; i < world.blockdata.blocks.length; i++) {
    
            let block;
            let currentIndex = world.blockdata.blocks[i]
            let blocktype = blockdata[currentIndex.id].type

            if ( blocktype === "Block" ) {

                console.log("Block!")

                block = new Block(
                    currentIndex.id,
                    currentIndex.position.x,
                    currentIndex.position.y);

            } else if( blocktype === "Air" ) {

                console.log("Air!")

                block = new Air(
                    currentIndex.position.x,
                    currentIndex.position.y
                )  
                
                this.scene.add( block.createAir(i) ); 

            } else if( blocktype === "Door" ) {

                console.log("Door!")

                block = new Door(
                    currentIndex.id,
                    currentIndex.position.x,
                    currentIndex.position.y);

            } else if( blocktype === "EntryPoint" ) {

                console.log("EntryPoint!")

                block = new EntryPoint(
                    currentIndex.id,
                    currentIndex.position.x,
                    currentIndex.position.y);

            } else if( blocktype === "Sign" ) {

                console.log("Sign!")

                block = new Sign(
                    currentIndex.id,
                    currentIndex.position.x,
                    currentIndex.position.y);

            } else if( blocktype === "Tree" ) {

                console.log("Tree!")

                block = new Tree(
                    currentIndex.id,
                    currentIndex.position.x,
                    currentIndex.position.y);

            }
       
            this.blocksData.blocks.push(block)

            if (block.type != "Air") {

                this.scene.add( block.render(i) ); 

            }


        
        }
        
        for(let i = 0; i < world.blockdata.backgroundblocks.length; i++) {
        
            let backgroundblock = new BackgroundBlock(
                world.blockdata.backgroundblocks[i].id,
                world.blockdata.backgroundblocks[i].position.x,
                world.blockdata.backgroundblocks[i].position.y);
        
            this.blocksData.backgroundBlocks.push(backgroundblock)
        
            this.scene.add( backgroundblock.render(i) );
        
        }

    }

    updateBlock(index, newType, newId) {

        let blockToUpdate = this.blocksData.blocks[index];

        let newBlock;

        switch(newType) {

            case "Air":

                newBlock = new Air(blockToUpdate.position.x, blockToUpdate.position.y);
                break;

            case "Block": 

                newBlock = new Block(newId, blockToUpdate.position.x, blockToUpdate.position.y);
                break;

        }

        console.log(this.blocksData.blocks[index])

        this.blocksData.blocks[index] = newBlock;

        console.log(this.blocksData.blocks[index])

        this.scene.add( newBlock.render(index) );

        this.scene.remove( blockToUpdate.object )

    }

};

export default World;