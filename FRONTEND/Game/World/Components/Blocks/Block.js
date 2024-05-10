import * as THREE from "three";

class Block {

    constructor(id, x, y, isForeground) {

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

    }

    render(id) {

        const plane = new THREE.PlaneGeometry(this.width, this.height);

        const material = new THREE.MeshBasicMaterial({ 
            side: THREE.DoubleSide,
            transparent: true,
         });

        const mesh = new THREE.Mesh(plane, material);
        
        mesh.name = 'Block';
        mesh.userData.id = id;
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
};

export default Block;