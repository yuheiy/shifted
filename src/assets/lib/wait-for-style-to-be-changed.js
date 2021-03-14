export async function waitForStyleToBeChanged(
	element,
	propertyName,
	value,
	timeout = 3000
) {
	let isTimedOut = false;

	const timeoutId = setTimeout(() => {
		isTimedOut = true;
	}, timeout);

	while (true) {
		if (isTimedOut) {
			throw new Error("Timed out in waitForStyleToBeChanged");
		}

		const hasChanged = getComputedStyle(element)[propertyName] === value;
		if (hasChanged) {
			clearTimeout(timeoutId);
			return;
		}

		await new Promise(requestAnimationFrame);
	}
}
