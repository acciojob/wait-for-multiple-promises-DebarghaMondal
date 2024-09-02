document.addEventListener("DOMContentLoaded", () => {
  // Reference to the output tbody
  const outputTable = document.getElementById("output");

  // Create a loading row with an id of 'loading'
  const loadingRow = document.createElement("tr");
  loadingRow.id = "loading"; // Add the id attribute here
  loadingRow.innerHTML = `<td colspan="2">Loading...</td>`;
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
Promise.all(promises).then((results) => {
  // This block will run after all promises have resolved
  // 'results' is an array of the resolved values of the promises

  // Here you can process the results and update your table
  // For example, you can loop over the results and create a new row for each one
  results.forEach((result) => {
    console.log(`Promise ${result.promiseNumber} took ${result.timeTaken} seconds to resolve`);
  });
});
