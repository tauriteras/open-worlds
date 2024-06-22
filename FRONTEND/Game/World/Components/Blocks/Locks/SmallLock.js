import * as THREE from "three"

import { world } from "../../../Index";
import Block from "../Block";

class SmallLock extends Block {

    constructor(x, y) {

        this.owner = "SampleName";

        this.position = {
            x: x,
            y: y
        }

        this.measurements = {
            radius: 5,
            blockCount: 10
        }

        this.object = undefined;

    }

    place(scene) {

        const plane = new THREE.PlaneGeometry(1, 1);

        const material = new THREE.MeshBasicMaterial({ 
            color: new THREE.Color("brown"),
            side: THREE.DoubleSide,
            transparent: true,
         });

        const mesh = new THREE.Mesh(plane, material);
        
        mesh.name = 'SmallLock';

        mesh.position.x = this.position.x;
        mesh.position.y = this.position.y;

        this.object = mesh;

        this.findLockableArea(scene);

        return mesh;

    }

    findLockableArea(scene) {

        console.log("Lock")

        let startingX = this.position.x - 2;
        let startingY = this.position.y;

        for (let i = 0; i < 10; i++) {

            console.log(startingX, startingY)

            const plane = new THREE.PlaneGeometry(1, 1);

            const material = new THREE.MeshBasicMaterial({ 
                color: new THREE.Color("brown"),
                side: THREE.DoubleSide,
                transparent: true,
            });

            const mesh = new THREE.Mesh(plane, material);

            mesh.position.x = startingX;
            mesh.position.y = startingY;

            scene.add(mesh)


            if (startingX == this.position.x + 2) {

                startingX = this.position.x - 3;

                startingY++;

            }

            startingX++;

        }

    }

};

export default SmallLock;