1. Introduction
This documentation provides instructions on setting up, configuring, and using the Bluetooth Location Tracking backend system. The system connects to a Bluetooth device, retrieves real-time location data, and exposes it through a RESTful API for client applications.

2. Getting Started
Prerequisites
Node.js and npm installed.
A Bluetooth device broadcasting location data.
Noble library for Bluetooth communication.


Installation:- 

1. Clone the repository:
cd repository

2. Install dependencies:
npm install

3. Run the application:
node server.js



3. Bluetooth Integration
Device Connection:
The system uses the Noble library to establish a connection with Bluetooth devices. Ensure your Bluetooth device is discoverable, and the system will automatically start scanning for devices.

Data Parsing:
Data received from the Bluetooth device is parsed using the parseLocationData function. Customize this function in server.js to match your device's data format.

4. Real-time Data and RESTful API
RESTful API Endpoints:
GET /location: Retrieves live location data from the Bluetooth device. Data is updated every 10 seconds.

5. Data Formatting:
Location data is formatted in JSON format for easy consumption by client applications. The updateLiveLocationData function in server.js handles the formatting.

6. Mapping Integration:
The frontend uses the Leaflet mapping library to visualize and display live locations. Customize . I used index.html to preferred mapping library or API.

7. Testing:
Thoroughly test the system to ensure the reliability and accuracy of location data retrieval and API responses. Utilize tools like Postman for API testing and simulate different scenarios.

8. Security:
Apply security best practices to protect both the Bluetooth device and the backend system. Ensure secure communication protocols and implement encryption where necessary.

9. Deployment:
Configure environment variables for production settings

Use a process manager like PM2 to keep the Node.js application running.

npm install -g pm2
pm2 start server.js

Set up a reverse proxy (e.g., Nginx or Apache) for improved security and performance.