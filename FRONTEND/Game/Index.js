import * as THREE from 'three';

import Camera from '../Game/Camera/Camera'
import World from './World/World';
import Player from './Player/Player';
import SmallLock from './World/Components/Locks/SmallLock';

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let intersects;
let mousedown = false;

const scene = new THREE.Scene();
const camera = new Camera();
const clock = new THREE.Clock();
let dt = 0;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

camera.initialize()

let world = new World();
world.load(scene);

let player = new Player();
scene.add(player.spawn());

function animate() {

	if (player.movement.jump == true) {
		player.jump(dt)
	}

	if (player.movement.left == true) {
		player.moveLeft(dt)
	}

	if (player.movement.right == true) {
		player.moveRight(dt)
	}

	if (player.movement.down == true) {
		player.moveDown(dt)
	}

	if (mousedown === true) {

		console.log(intersects)

	}

	requestAnimationFrame( animate );

	camera.update(player.position.x, player.position.y)

	dt = clock.getDelta();

	player.update(dt);

	raycaster.setFromCamera( pointer, camera.cameraObject );
	intersects = raycaster.intersectObjects( scene.children );

	renderer.render( scene, camera.cameraObject );
}

document.body.appendChild( renderer.domElement );

animate();

document.addEventListener("keydown", (e) => {

	let key = e.key.toUpperCase();

	if (key === 'W') {

		player.movement.jump = true;

	}

	if (key === 'A') {

		player.movement.left = true;

	}

	if (key === 'S') {

		player.movement.down = true;

	}

	if (key === 'D') {

		player.movement.right = true;

	}

})

document.addEventListener("keyup", (e) => {

	let key = e.key.toUpperCase();

	if (key === 'W') {

		player.movement.jump = false;

	}

	if (key === 'A') {

		player.movement.left = false;

	}

	if (key === 'S') {

		player.movement.down = false;

	}

	if (key === 'D') {

		player.movement.right = false;

	}

})

window.addEventListener( 'pointermove', (e) => {

	pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

});

document.addEventListener("pointerdown", () => {
	
	mousedown = true;

})

document.addEventListener("pointerup", () => {
	
	mousedown = false;

})

document.addEventListener("pointerleave", () => {
	
	mousedown = false;

})

export { world }