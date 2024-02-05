// Create Web Worker
const worker = new Worker('worker.js');

// Get UI elements
const generateButton = document.getElementById('generateDataButton');
const sortButton = document.getElementById('sortDataButton');
const container = document.querySelector('.container');

// Set event listeners for buttons
generateButton.addEventListener('click', generateDataAndSendToWorker);
sortButton.addEventListener('click', sendToWorkerForSorting);

// Function to generate an array with 10 million numbers (replace with your data)
function generateLargeArray() {
  const array = [];
  for (let i = 0; i < 10000000; i++) {
    array.push(Math.random());
  }
  return array;
}

// Function to display a loading message in the UI
function displayLoadingMessage() {
  const loadingElement = document.createElement('p');
  loadingElement.textContent = 'Processing data...';
  container.innerHTML = ''; // Clear previous content
  container.appendChild(loadingElement);
}

// Function to display processed data in the UI
function displayProcessedData(data) {
  const resultElement = document.createElement('p');
  resultElement.textContent = `Sorted Data: ${data.slice(0, 10).join(', ')}, ...`;
  container.innerHTML = ''; // Clear previous content
  container.appendChild(resultElement);
}

// Function to generate data and send to Web Worker for sorting
function generateDataAndSendToWorker() {
  const dataToProcess = generateLargeArray();
  worker.postMessage(dataToProcess);
  displayLoadingMessage();
}

// Function to send data to Web Worker for sorting
function sendToWorkerForSorting() {
    const dataToProcess = generateLargeArray();
    worker.postMessage(dataToProcess);
    displayLoadingMessage();
  }
  

// Receive results from Web Worker
worker.onmessage = (event) => {
  const sortedData = event.data;
  // Handle processed data
  displayProcessedData(sortedData);
};

// Handle errors
worker.onerror = (error) => {
  console.error(`Web Worker error: ${error.message}`);
};
