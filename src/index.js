import * as sound from './sound.js';
import * as sphere from './sphere.js';


async function getComponent() {
	var element = document.createElement('div');
	const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');

	element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	return element;
}

getComponent().then(component => {
	console.log('start');
	document.body.style.margin = 0;
	var clientId = 'z8Q1qQoDpUMvc7EdzaMEBNCXxmtcCFHn';
	var analyser = new sound.default(clientId).analyser;
	var sphereVisualizer = new sphere.default(analyser);
	sphereVisualizer.loop();
})


