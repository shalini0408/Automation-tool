import React, { useEffect, useRef } from "react";
import Iframe from "react-iframe";

// import "./styles.css";
const demos = {
	soundcloud:
		'<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/379775672&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>',

	container:
		'<iframe width="100%" height="166" sandbox="" scrolling="no" frameborder="no" allow="autoplay" src="https://3.89.213.136/ping" style="position: absolute;z-index :999"></iframe>',

	plotly:
		'<iframe src="http://codesandbox.io/embed/q7jmjyplvq?fontsize=14" title="Plotly All Graph Types" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>',
};

function View() {
	const iframe = useRef();
	const html =
		'<html><body style="height: 100px"><div id="root" style="height: 100px"><iframe width="100%" height="166" sandbox="" scrolling="no" frameborder="no" allow="autoplay" src="https://googleweblight.com/?lite_url=http://3.89.213.136/ping" style="position: absolute;z-index :999"></iframe></div></body></html>';
	const ifr =
		'<iframe width="100%" height="166" sandbox="" scrolling="no" frameborder="no" allow="autoplay" src="http://3.89.213.136/ping" style="position: absolute;z-index :999"></iframe>';

	useEffect(() => {
		iframe.current.srcDoc = html;
		setTimeout(() => {
			iframe.current.contentWindow.postMessage(html, "*");
		}, 50);
	}, []);
	return (
		<div className='View'>
			<h1>Containers</h1>
			{/* <Iframe iframe={demos["container"]} allow='autoplay' />, */}
		</div>
	);
}

export default View;
