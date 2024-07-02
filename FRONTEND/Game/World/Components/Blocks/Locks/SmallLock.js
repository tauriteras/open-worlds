import * as THREE from "three"

import player from "../../../../../mock-dev-data/playerinfo.json"

import Block from "../Block";

class SmallLock extends Block {

    constructor(id, x, y) {

        super()

        this.id = id;

        this.type = "Lock";

        this.owner = player.name;

        this.data = {
            hasAccess: undefined,
            ignoreEmptyAir: false,
            openToPublic: false
        };

        this.position = {
            x: x,
            y: y
        }

        this.collisions = {
            top: true,
            bottom: true,
            left: true,
            right: true
        }

        this.object = undefined;

        this.size = 0;
        this.maxSize = 9;
        this.lockedTiles = [];

    }

    render(index) {

        const plane = new THREE.PlaneGeometry(1, 1);

        const material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            transparent: true,
         });

        const mesh = new THREE.Mesh(plane, material);

         if(this.owner === player.name) {
            console.log("Owner of " + this)
            mesh.material.map = new THREE.TextureLoader().load(
                "../../../../../public/static/images/Locks/SmallLock_Owner.png");
         }
        
        mesh.name = 'SmallLock';

        mesh.userData.index = index;

        mesh.position.x = this.position.x;
        mesh.position.y = this.position.y;

        this.object = mesh;

        this.locked = true;

        return mesh;

    }

};

export default SmallLock;