import * as THREE from "three"

import Block from "./Block";

class Air extends Block {

    constructor(x, y) {

        super()

        this.position = {

            x: x,

            y: y

        };

    }

    render(index) {

        const plane = new THREE.PlaneGeometry(1, 1);

        const material = new THREE.MeshBasicMaterial({ 
            map: new THREE.TextureLoader().load("../../../../../public/static/images/Blocks/Air.png"),
            transparent: true,
         });

        const mesh = new THREE.Mesh(plane, material);

        mesh.name = "Air";
        mesh.userData.index = index;
        mesh.position.x = this.position.x;
        mesh.position.y = this.position.y;

        this.object = mesh;

        return mesh;

    }

}

export default Air