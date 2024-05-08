import * as THREE from 'three';
import Block from './World/Components/Blocks/Block';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let block = new Block();
scene.add( block.render() );

camera.position.z = 5;

function animate() {



	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate();