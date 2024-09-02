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
  const startTime = performance.now();
  Promise.all(promises).then((results) => {
    const endTime = performance.now();
    const totalTime = ((endTime - startTime) / 1000).toFixed(3);

    // Clear the loading row
    outputTable.innerHTML = "";

    // Populate the table with the results of each promise
    results.forEach((result) => {
      const row = document.createElement("tr");
      
      const td1 = document.createElement("td");
      td1.textContent = `Promise ${result.promiseNumber}`;
      td1.id = `promise${result.promiseNumber}`; // Set the id for td1

      const td2 = document.createElement("td");
      td2.textContent = `${result.timeTaken} s`;
      td2.id = `time${result.promiseNumber}`; // Set the id for td2

      row.appendChild(td1);
      row.appendChild(td2);
      outputTable.appendChild(row);
    });

    // Add the total time row
    const totalRow = document.createElement("tr");
    
    const tdTotal1 = document.createElement("td");
    tdTotal1.textContent = "Total";
    tdTotal1.id = "totalLabel"; // Set the id for total label td

    const tdTotal2 = document.createElement("td");
    tdTotal2.textContent = `${totalTime} s`;
    tdTotal2.id = "totalTime"; // Set the id for total time td

    totalRow.appendChild(tdTotal1);
    totalRow.appendChild(tdTotal2);
    outputTable.appendChild(totalRow);
  });
});
