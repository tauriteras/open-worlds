import * as THREE from "three";

import blockdata from "../../../../mock-dev-data/blockinfo.json"

class Block {

    constructor(id, x, y, isForeground, data) {

        this.id = id;

        this.type = "Block";

        this.position = {

            x: x,

            y: y

        }

        this.blocksAround = {
            top: undefined,
            bottom: undefined,
            right: undefined,
            left: undefined
        }

        this.isForeground = isForeground || false;

        this.collisions = undefined;

        this.object = undefined;

        this.data = data;

        this.timeSinceLastHit = 0;

        this.punchCount = 0;

        this.hardness = undefined;
        this.isBreakable = undefined;

        this.locked = false;

    }

    render(index) {

        this.hardness = blockdata[this.id].hardness
        this.isBreakable = blockdata[this.id].breakable

        this.collisions = blockdata[this.id].collisions

        const plane = new THREE.PlaneGeometry(1, 1);

        const material = new THREE.MeshBasicMaterial({ 
            map: new THREE.TextureLoader().load("../../../../public/static/images/Blocks/" +
             blockdata[this.id].textures[0] +
              ".png"),
            transparent: true,
         });

        const mesh = new THREE.Mesh(plane, material);
        
        mesh.name = "Block";
        mesh.userData.index = index;
        mesh.position.x = this.position.x;
        mesh.position.y = this.position.y;

        if (this.isForeground) {
            mesh.position.z = 0.1000
        } else {
            mesh.position.z = 0.0010
        }

        this.object = mesh;

       return mesh;

    }

    breakAnimation() {

        if (  this.object.children.length > 0 ) {
            this.object.remove(this.object.children[0])
        }

        const plane = new THREE.PlaneGeometry(this.width, this.height);

        const material = new THREE.MeshBasicMaterial({ 
            map: new THREE.TextureLoader().load("../../../../public/static/images/Breaking/Breaking-1.png"),
            side: THREE.DoubleSide,
            transparent: true,
         });

        const mesh = new THREE.Mesh(plane, material);

        if (this.punchCount / this.hardness <= .40 && this.punchCount / this.hardness > .20) {
            material.map = new THREE.TextureLoader().load("../../../../public/static/images/Breaking/Breaking-2.png")
        }

        if (this.punchCount / this.hardness <= .60 && this.punchCount / this.hardness > .40) {
            material.map = new THREE.TextureLoader().load("../../../../public/static/images/Breaking/Breaking-3.png")
        }

        if (this.punchCount / this.hardness <= .80 && this.punchCount / this.hardness > .60) {
            material.map = new THREE.TextureLoader().load("../../../../public/static/images/Breaking/Breaking-4.png")
        }

        if (this.punchCount / this.hardness < 1 && this.punchCount / this.hardness > .80) {
            material.map = new THREE.TextureLoader().load("../../../../public/static/images/Breaking/Breaking-5.png")
        }

        this.object.add(mesh);

    }

    createLockOverlay(reached) {

        reached.forEach(block => {

            const plane = new THREE.PlaneGeometry(1, 1);

            const material = new THREE.MeshBasicMaterial({ 
                color: new THREE.Color("green"),
                opacity: 0.1,
                transparent: true,
             });
    
            const mesh = new THREE.Mesh(plane, material);
            
            block.object.add( mesh )

        });
        
    }
};

export default Block;