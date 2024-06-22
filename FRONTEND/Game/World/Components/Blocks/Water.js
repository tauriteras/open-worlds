import * as THREE from "three"
import Block from "./Block";

class Water extends Block {

    constructor(id, x, y) {

        super()

        this.id = id;

        this.position = {

            x: x,

            y: y

        }

    }

}

export default Water;