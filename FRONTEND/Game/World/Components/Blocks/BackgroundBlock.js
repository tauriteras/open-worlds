import * as THREE from "three"

class BackgroundBlock {

    constructor() {

        this.width = 1;
        this.height = 1;

    }

    render() {

        const plane = new THREE.PlaneGeometry(this.width, this.height);

        const material = new THREE.MeshBasicMaterial({ 
            side: THREE.DoubleSide,
            transparent: true,
         });

        const mesh = new THREE.Mesh(plane, material);
        
        mesh.name = 'BackgroundBlock';

        mesh.position.z = 0.0001

       return mesh;

    }
};

export default BackgroundBlock;