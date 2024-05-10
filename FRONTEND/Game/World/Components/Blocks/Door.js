import * as THREE from "three"

class Door {

    constructor(x, y) {

        this.position = {

            x: x,

            y: y

        }

        this.collisions = {
            top: false,
            bottom: false,
            left: false,
            right: false
        }

        this.object = undefined;

    }

    render(id) {

        const plane = new THREE.PlaneGeometry(1, 1);

        const material = new THREE.MeshBasicMaterial({ 
            color: new THREE.Color("green"),
            side: THREE.DoubleSide,
            transparent: true,
         });

        const mesh = new THREE.Mesh(plane, material);
        
        mesh.name = 'Door';
        mesh.userData.id = id;
        mesh.position.x = this.position.x;
        mesh.position.y = this.position.y;


        mesh.position.z = 0.0010
        
        this.object = mesh;

       return mesh;

    }

};

export default Door;