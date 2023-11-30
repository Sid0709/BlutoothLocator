const noble = require('noble'); //Noble library to interact with Bluetooth devices.

noble.on('stateChange', (state) => {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', (peripheral) => {
  //Connect and retrieve data from the Bluetooth device
  if (peripheral.advertisement.localName === 'DESKTOP-CSLLL4G')//my device blutooth name
   {
    noble.stopScanning();
    connectToDevice(peripheral);
  }
});

function connectToDevice(peripheral) {
  peripheral.connect((error) => {
    if (error) {
      console.error('Error connecting to the Bluetooth device:', error);
    } else {
      console.log('Connected to the Bluetooth device:', peripheral.advertisement.localName);

      // logic to discover services and characteristics
      discoverServicesAndCharacteristics(peripheral);
    }
  });
}

function discoverServicesAndCharacteristics(peripheral) {
  peripheral.discoverAllServicesAndCharacteristics((error, services, characteristics) => {
    if (error) {
      console.error('Error discovering services and characteristics:', error);
    } else {
      // logic to extract and read location data from characteristics
      const locationCharacteristic = characteristics.find(char => char.uuid === '00001101-0000-1000-8000-00805F9B34FB'); //Universally Unique Identifier
     
      if (locationCharacteristic) {
        locationCharacteristic.read((error, data) => {
          if (error) {
            console.error('Error reading location data:', error);
          } else {
            const locationData = parseLocationData(data);
            console.log('Location Data:', locationData);
            updateLiveLocationData(locationData);
          }

          peripheral.disconnect(); // Disconnect after retrieving and processing data
        });
      } else {
        console.error('Location characteristic not found.');
        peripheral.disconnect();
      }
    }
  });
}

function parseLocationData(data) {
  try {
    return JSON.parse(data.toString('utf-8'));
  } catch (error) {
    console.error('Error parsing location data:', error);
    return null;
  }
}

function updateLiveLocationData(data) {
  // logic to update live location data (e.g., store in a variable, database, or push to clients)
  console.log('Updating live location data:', data);
}



//Use Node.js and Express.js to create a RESTful API that serves live location data.

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let liveLocationData = null;

app.get('/location', (req, res) => {
  res.json(liveLocationData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//Format the location data in a structured format like JSON.

function updateLiveLocationData(data) {
    liveLocationData = {
      timestamp: Date.now(),
      location: data,
    };
  }

  