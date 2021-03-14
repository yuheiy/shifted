export async function waitForStyleToBeSet(
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
			throw new Error("Timed out in waitForStyleToBeSet");
		}

		const hasSet = getComputedStyle(element)[propertyName] === value;
		if (hasSet) {
			clearTimeout(timeoutId);
			return;
		}

		await new Promise(requestAnimationFrame);
	}
}
