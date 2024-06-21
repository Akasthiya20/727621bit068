const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const TIMEOUT = 500; // 500 ms

let numbersStore = [];

// Define third-party server URLs for different number types
const numberUrls = {
  p: 'http://20.244.56.144/test/primes',
  f: 'http://20.244.56.144/test/fibonacci',
  e: 'http://20.244.56.144/test/even',
};

// Function to fetch numbers from third-party server with authorization token
const fetchNumbers = async (numberType, authToken) => {
  const url = numberUrls[numberType];
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      timeout: TIMEOUT,
    });
    return response.data.numbers;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error(`Error fetching ${numberType} numbers: timeout of ${TIMEOUT}ms exceeded`);
    } else if (error.response && error.response.status === 404) {
      console.error(`Error fetching ${numberType} numbers: Request failed with status code 404`);
    } else {
      console.error(`Error fetching ${numberType} numbers: ${error.message}`);
    }
    return [];
  }
};

// Helper function to calculate the average
const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return (sum / numbers.length).toFixed(2);
};

// Middleware function to validate authorization token
const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization !== 'YOUR_AUTH_TOKEN') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Endpoint to fetch numbers based on number type (p, f, e)
app.get('/numbers/:numberType', validateToken, async (req, res) => {
  const { numberType } = req.params;

  // Validate numberType
  if (!Object.keys(numberUrls).includes(numberType)) {
    return res.status(400).json({ error: 'Invalid number type' });
  }

  // Fetch numbers from the third-party server
  const fetchedNumbers = await fetchNumbers(numberType, 'YOUR_AUTH_TOKEN');
  if (fetchedNumbers.length === 0) {
    return res.status(500).json({ error: `Failed to fetch ${numberType} numbers` });
  }

  // Filter out duplicate numbers
  const uniqueNumbers = [...new Set(fetchedNumbers)];

  // Update the numbers store
  const windowPrevState = [...numbersStore];
  numbersStore = [...numbersStore, ...uniqueNumbers].slice(-WINDOW_SIZE);
  const windowCurrState = [...numbersStore];

  // Calculate the average
  const average = calculateAverage(numbersStore);

  res.json({
    windowPrevState,
    windowCurrState,
    numbers: uniqueNumbers,
    avg: average,
  });
});

app.listen(PORT, () => {
  console.log(`Average Calculator microservice running on port ${PORT}`);
});
