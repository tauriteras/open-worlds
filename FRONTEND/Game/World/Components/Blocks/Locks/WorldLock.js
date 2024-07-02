import * as THREE from "three"
import Block from "../Block";

class WorldLock extends Block {

    constructor() {

        super()

        this.collisions = {
            top: true,
            bottom: true,
            left: true,
            right: true
        }

    }

};

export default WorldLock;