import * as THREE from "three";

class Block {

    constructor(isForeground) {

        this.width = 1;
        this.height = 1;

        this.isForeground = isForeground;

    }

    render() {

        const plane = new THREE.PlaneGeometry(this.width, this.height);

        const material = new THREE.MeshBasicMaterial({ 
            side: THREE.DoubleSide,
            transparent: true,
         });

        const mesh = new THREE.Mesh(plane, material);
        
        mesh.name = 'Block';

        if (this.isForeground) {
            mesh.position.z = 0.1000
        } else {
            mesh.position.z = 0.0010
        }

       return mesh;

    }
};

export default Block;