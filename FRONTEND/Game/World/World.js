import { InteractionManager } from 'three.interactive';

import Block from "./Components/Blocks/Block"
import BackgroundBlock from "./Components/Blocks/BackgroundBlock"

import world from "../../mock-dev-data/worldinfo.json"
import Door from './Components/Blocks/Door';

class World {

    constructor() {

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

    }

    load(scene) {

        //    let door = new Door(11, 1, 1)
          //  scene.add(door.render(11))
            //console.log("door", door)

        for(let i = 0; i < world.blockdata.blocks.length; i++) {
    
            let block = new Block(world.blockdata.blocks[i].id,
                 world.blockdata.blocks[i].position.x,
                 world.blockdata.blocks[i].position.y);
        
                 this.blocksData.blocks.push(block)
        
            scene.add( block.render(i) );
        
        }
        
        for(let i = 0; i < world.blockdata.backgroundblocks.length; i++) {
        
            let backgroundblock = new BackgroundBlock(world.blockdata.backgroundblocks[i].id,
                 world.blockdata.backgroundblocks[i].position.x,
                 world.blockdata.backgroundblocks[i].position.y);
        
                 this.blocksData.backgroundBlocks.push(backgroundblock)
        
            scene.add( backgroundblock.render(i) );
        
        }

    }

    updateBlock(index, isBackground) {

        let blockToUpdate;

        if (isBackground) {

            blockToUpdate = this.blocksData.backgroundBlocks[index];

        }

        if(!isBackground) {

            blockToUpdate = this.blocksData.blocks[index];
            
        }

    }

};

export default World;