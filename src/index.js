import * as sound from './sound.js';
import * as sphere from './sphere.js';


async function getComponent() {
	var element = document.createElement('div');
	const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');

	element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	return element;
}

getComponent().then(component => {
	document.body.style.margin = 0;


	var sphereVisualizer = new sphere.default(onclick_callback);
	sphereVisualizer.loop();

	function onclick_callback(event) {
		var clientId = 'z8Q1qQoDpUMvc7EdzaMEBNCXxmtcCFHn';
		var analyser = new sound.default(clientId).analyser;
		sphereVisualizer.setAnalyser(analyser)
		sphereVisualizer.changeStatus('READY')
	}

})

