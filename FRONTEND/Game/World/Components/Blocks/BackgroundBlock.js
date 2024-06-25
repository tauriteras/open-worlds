import * as THREE from "three"

import blockdata from "../../../../mock-dev-data/blockinfo.json"

class BackgroundBlock {

    constructor(id, x, y) {

        this.id = id || 0;

        this.type = undefined;

        this.position = {

            x: x,

            y: y

        }

        this.object = undefined;

        this.timeSinceLastHit = 0;

        this.punchCount = 0;

        this.hardness = undefined;
        this.isBreakable = undefined;

    }

    render(index) {

        this.type = blockdata[this.id].type
        this.hardness = blockdata[this.id].hardness
        this.isBreakable = blockdata[this.id].breakable

        const plane = new THREE.PlaneGeometry(1, 1);

        const material = new THREE.MeshBasicMaterial({ 
            side: THREE.DoubleSide,
            transparent: true,
         });

        const mesh = new THREE.Mesh(plane, material);
        
        mesh.name = 'BackgroundBlock';
        mesh.userData.index = index;

        mesh.position.x = this.position.x;
        mesh.position.y = this.position.y;
        mesh.position.z = 0.0001;

        this.object = mesh;

       return mesh;

    }

    breakAnimation() {

        if (  this.object.children.length > 0 ) {
            this.object.remove(this.object.children[0])
        }

        const plane = new THREE.PlaneGeometry(this.width, this.height);

        const material = new THREE.MeshBasicMaterial({ 
            map: new THREE.TextureLoader().load("../../../../../public/static/images/Breaking/Breaking-1.png"),
            side: THREE.DoubleSide,
            transparent: true,
         });

        const mesh = new THREE.Mesh(plane, material);

        if (this.punchCount / this.hardness <= .40 && this.punchCount / this.hardness > .20) {
            material.map = new THREE.TextureLoader().load("../../../../../public/static/images/Breaking/Breaking-2.png")
        }

        if (this.punchCount / this.hardness <= .60 && this.punchCount / this.hardness > .40) {
            material.map = new THREE.TextureLoader().load("../../../../../public/static/images/Breaking/Breaking-3.png")
        }

        if (this.punchCount / this.hardness <= .80 && this.punchCount / this.hardness > .60) {
            material.map = new THREE.TextureLoader().load("../../../../../public/static/images/Breaking/Breaking-4.png")
        }

        if (this.punchCount / this.hardness < 1 && this.punchCount / this.hardness > .80) {
            material.map = new THREE.TextureLoader().load("../../../../../public/static/images/Breaking/Breaking-5.png")
        }

        this.object.add(mesh);

    }
};

export default BackgroundBlock;