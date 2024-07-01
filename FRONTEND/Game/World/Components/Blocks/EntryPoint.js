import * as THREE from "three"
import Block from "./Block";

class EntryPoint extends Block {

    constructor(id, x, y) {

        super()

        this.id = id;

        this.type = "EntryPoint";

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

export default EntryPoint;