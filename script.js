//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {

	const outputTable = document.getElementById("output");

	const loadingRow = document.createElement("tr");
	loadingRow.innerHTML = `<td colspan"2">Loading...</td>`;
	outputTable.appendChild(loadingRow);

	const createPromise = (promiseNumber) => {
		return new Promise((resolve) => {
			const timeToResolve = Math.random() * 2 + 1;
			setTimeout(() => {
				resolve({ promiseNumber, timeTaken: timeToResolve.toFixed(3)});
			}, timeToResolve * 1000);
		});
	};

	const promise = [createPromise(1), createPromise(2), createPromise(3)];

	const startTime = performance.now();
	promise.all(promise).then((results) => {
		const endTime = performance.now();
		const totalTime = ((endTime - startTime) / 1000).toFixed(3);

		outputTable.innerHTML = "";

		results.forEach((result) => {
			const row = document.createElement("tr");
			row.innerHTML = `<td>Promise ${result.promiseNumber}</td> <td>${result.timetaken} s</td>`;
			outputTable.appendChild(row);
		});

		const totalRow = document.createElement("tr");
		totalRow.innerHTML = `<td>Total</td>${totalTime} s</td>`;
		outputTable.appendChild(totalRow);
	});
});