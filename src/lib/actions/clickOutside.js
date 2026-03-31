export function clickOutside(node, callback) {
	function handleClick(event) {
		if (node.contains(event.target)) return;
		if (typeof callback === 'function') callback();
	}

	document.addEventListener('click', handleClick);

	return {
		update(newCallback) {
			callback = newCallback;
		},
		destroy() {
			document.removeEventListener('click', handleClick);
		}
	};
}
