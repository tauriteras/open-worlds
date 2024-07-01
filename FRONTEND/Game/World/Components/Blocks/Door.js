import * as THREE from "three"
import Block from "./Block";

class Door extends Block {

    constructor(id, x, y) {

        super()

        this.id = id;

        this.type = "Door";

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

export default Door;