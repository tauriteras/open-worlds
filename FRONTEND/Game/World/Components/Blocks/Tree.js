import * as THREE from "three"
import Block from "./Block";


class Tree extends Block {
    
    constructor(id, x, y) {

        super()

        this.id = id;

        this.type = "Tree";

        this.position = {

            x: x,

            y: y

        }

        this.collisions = {
            top: false,
            bottom: false,
            left: false,
            right: false
        }

    }

};

export default Tree;