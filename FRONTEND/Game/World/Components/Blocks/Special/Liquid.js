import * as THREE from "three"
import Block from "../Block";

class Liquid extends Block {

    constructor(id, x, y) {

        super()

        this.id = id

        this.position = {

            x: x,

            y: y

        }

    }

}

export default Liquid;