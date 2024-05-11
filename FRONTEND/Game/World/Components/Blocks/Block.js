import * as THREE from "three";

class Block {

    constructor(id, x, y, isForeground, data) {

        this.width = 1;
        this.height = 1;

        this.id = id;

        this.position = {

            x: x,

            y: y

        }

        this.isForeground = isForeground || false;

        this.collisions = {
            top: true,
            bottom: true,
            left: true,
            right: true
        }

        this.object = undefined;

        this.data = data;

        this.timeSinceLastHit = 0;

        this.punchCount = 0;

        this.hardness = 10;

    }

    render(index) {

        const plane = new THREE.PlaneGeometry(this.width, this.height);

        const material = new THREE.MeshBasicMaterial({ 
            side: THREE.DoubleSide,
            transparent: true,
         });

        const mesh = new THREE.Mesh(plane, material);
        
        mesh.name = 'Block';
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

        const plane = new THREE.PlaneGeometry(this.width, this.height);

        const material = new THREE.MeshBasicMaterial({ 
            side: THREE.DoubleSide,
            transparent: true,
         });

        const mesh = new THREE.Mesh(plane, material);

        if (this.punchCount / this.hardness <= .20) {
            material.color = new THREE.Color("red")
        }

        if (this.punchCount / this.hardness <= .40 && this.punchCount / this.hardness > .20) {
            material.color = new THREE.Color("green")
        }

        if (this.punchCount / this.hardness <= .60 && this.punchCount / this.hardness > .40) {
            material.color = new THREE.Color("blue")
        }

        if (this.punchCount / this.hardness <= .80 && this.punchCount / this.hardness > .60) {
            material.color = new THREE.Color("yellow")
        }

        if (this.punchCount / this.hardness < 1 && this.punchCount / this.hardness > .80) {
            material.color = new THREE.Color("orange")
        }

        this.object.add(mesh);

        if (this.punchCount === this.hardness) {

            this.id = 0;
            this.isForeground = false;
  
            this.timeSinceLastHit = 0;

            this.punchCount = 0;

            this.collisions = {
                top: false,
                bottom: false,
                left: false,
                right: false
            }
          
            mesh.remove()

            return;

        }

    }
};

export default Block;