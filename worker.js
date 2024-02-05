// Listen for messages from the main thread
onmessage = (event) => {
    const dataToProcess = event.data;
  
    // Perform heavy data processing (sorting)
    const sortedData = sortLargeArray(dataToProcess);
  
    // Send sorted results back to the main thread
    postMessage(sortedData);
  };
  
  // Function to sort a large array
  function sortLargeArray(data) {
    // Sorting algorithm (e.g., quicksort)
    const sortedData = data.sort((a, b) => a - b);
  
    return sortedData;
  }
  