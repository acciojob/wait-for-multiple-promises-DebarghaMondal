document.addEventListener("DOMContentLoaded", () => {
  // Reference to the output tbody
  const outputTable = document.getElementById("output");

  // Add a loading row by default
  const loadingRow = document.createElement("tr");
  loadingRow.innerHTML = `<td id="loading" colspan="2">Loading...</td>`;
  outputTable.appendChild(loadingRow);

  // Function to create a promise that resolves after a random time between 1 and 3 seconds
  const createPromise = (promiseNumber) => {
    return new Promise((resolve) => {
      const timeToResolve = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
      setTimeout(() => {
        resolve({ promiseNumber, timeTaken: timeToResolve.toFixed(3) });
      }, timeToResolve * 1000); // Convert to milliseconds
    });
  };

  // Create an array of promises
  const promises = [createPromise(1), createPromise(2), createPromise(3)];

  // Use Promise.all to wait for all promises to resolve
  const startTime = performance.now();
  Promise.all(promises).then((results) => {
    const endTime = performance.now();
    const totalTime = ((endTime - startTime) / 1000).toFixed(3);

    // Clear the loading row
    outputTable.innerHTML = "";

    // Populate the table with the results of each promise
    results.forEach((result) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>Promise ${result.promiseNumber}</td><td>${result.timeTaken} s</td>`;
      outputTable.appendChild(row);
    });

    // Add the total time row
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td>Total</td><td>${totalTime} s</td>`;
    outputTable.appendChild(totalRow);
  });
});
