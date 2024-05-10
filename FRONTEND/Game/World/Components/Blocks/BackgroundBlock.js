import * as THREE from "three"

class BackgroundBlock {

    constructor(id, x, y) {

        this.width = 1;
        this.height = 1;

        this.id = id;

        this.position = {

            x: x,

            y: y

        }

        this.object = undefined;

    }

    render(id) {

        const plane = new THREE.PlaneGeometry(this.width, this.height);

        const material = new THREE.MeshBasicMaterial({ 
            color: new THREE.Color("gray"),
            side: THREE.DoubleSide,
            transparent: true,
         });

        const mesh = new THREE.Mesh(plane, material);
        
        mesh.name = 'BackgroundBlock';
        mesh.userData.id = id;

        mesh.position.x = this.position.x;
        mesh.position.y = this.position.y;
        mesh.position.z = 0.0001;

        this.object = mesh;

       return mesh;

    }
};

export default BackgroundBlock;