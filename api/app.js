const express = require('express');
const app = express();
const moment = require('moment'); 
const fs = require('fs');
const path = require('path');

app.use(express.json());

let jsonData;
try {
  const dataPath = path.join(__dirname, 'schwarzDummyData.json');
  const data = fs.readFileSync(dataPath, 'utf8');
  jsonData = JSON.parse(data);
  console.log('Data loaded successfully from schwarzDummyData.json');
} catch (err) {
  console.error('Error loading data from schwarzDummyData.json:', err);
  jsonData = [];  
}

//products to be categorized as B2B
app.get('/api/items/getB2BProducts', (req, res) => {

  const { days = 1 } = req.query; 
  const currentDate = moment(); 


  const expiringItems = jsonData.filter((item) => {
    const expiresAt = moment(item.expiresAt, 'YYYY-MM-DD');
    console.log(expiresAt)
    const diffDays = expiresAt.diff(currentDate, 'days');
    return diffDays <= days && diffDays >= 0; 
  });

  if (expiringItems.length === 0) {
    return res.status(404).json({
      status: 'error',
      message: `No items expiring within ${days} days.`,
    });
  }

  res.status(200).json({
    status: 'success',
    data: expiringItems,
  });
});

//products to be categorized as B2C

app.get('/api/items/getB2CProducts', (req, res) => {
  const { days = 4 } = req.query; 
  const currentDate = moment(); 


  const expiringItems = jsonData.filter((item) => {
    const expiresAt = moment(item.expiresAt, 'YYYY-MM-DD');
    console.log(expiresAt)
    const diffDays = expiresAt.diff(currentDate, 'days');
    return diffDays <= days && diffDays >= 0; 
  });

  if (expiringItems.length === 0) {
    return res.status(404).json({
      status: 'error',
      message: `No items expiring within ${days} days.`,
    });
  }

  res.status(200).json({
    status: 'success',
    data: expiringItems,
  });
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
