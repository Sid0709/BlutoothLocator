const noble = require('noble');

noble.on('stateChange', (state) => {
  if (state === 'poweredOn') {
    noble.startScanning([], true); // Scan for any Bluetooth device
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', (peripheral) => {
  // Check if the discovered device is your Bluetooth device based on its unique identifier (UUID, name, etc.)
  if (peripheral.advertisement.localName === 'DESKTOP-CSLLL4G') {
    noble.stopScanning();

    // Connect to the Bluetooth device
    connectToDevice(peripheral);
  }
});

function connectToDevice(peripheral) {
  peripheral.connect((error) => {
    if (error) {
      console.error('Error connecting to the Bluetooth device:', error);
    } else {
      console.log('Connected to the Bluetooth device:', peripheral.advertisement.localName);

      peripheral.disconnect(); // Disconnect after retrieving data or performing actions
    }
  });
}



//function for connecting the blutooth

function connectToDevice(peripheral) {
    peripheral.connect((error) => {
      if (error) {
        console.error('Error connecting to the Bluetooth device:', error);
      } else {
        console.log('Connected to the Bluetooth device:', peripheral.advertisement.localName);
  
        // Discover services and characteristics
        peripheral.discoverAllServicesAndCharacteristics((error, services, characteristics) => {
          if (error) {
            console.error('Error discovering services and characteristics:', error);
          } else {
            // Find the characteristic containing location data based on its UUID()
            const locationCharacteristic = characteristics.find(char => char.uuid === '00001101-0000-1000-8000-00805F9B34FB'); //Universally Unique Identifier
  
            if (locationCharacteristic) {
              // Read data from the characteristic
              locationCharacteristic.read((error, data) => {
                if (error) {
                  console.error('Error reading location data:', error);
                } else {
                  // Parse and process the location data
                  const locationData = parseLocationData(data);
                  console.log('Location Data:', locationData);
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
    });
  }
  
  function parseLocationData(data) {
    // logic to parse location data based on the data format
    // For example, if data is in a specific format like JSON
    try {
      const parsedData = JSON.parse(data.toString('utf-8'));
      return parsedData;
    } catch (error) {
      console.error('Error parsing location data:', error);
      return null;
    }
  }
  