# 2019_IS4302_Fri_2-4
## Setup Environment
1. Download the setup from: https://github.com/suenchunhui/easy-hyperledger-composer
2. Enter the following commands to start the environment:
```
npm run build_image
npm run setup_crypto
npm run start_fabric
npm run start_playground
```
3. Playground will be accessible from http://localhost:8080

## Running the BNA file on Playground
1. Open playground and create a new business network
2. Import the BNA file under the BNA folder in the repository
3. Select ID and Secret credentials as:
  - Enrollment ID: admin
  - Enrollment Secret: adminpw
4. Using admin role, create the participants: 
  - 2 farmers with IDs farmer1 and farmer2
  - 2 processors with IDs processor1 and processor2
  - 2 certifiers with IDs certifier1 and certifier2
  - 2 wholesalers with IDs wholesaler1 and wholesaler2
5. Create composer credentials for each of the 4 participant: farmer1@beef-network, processor1@beef-network, certifier1@beef-network, wholesaler1@beef-network
6. Feel free to experiment with different identities

## Starting the REST-server
1. Create a REST server connecting to each participant using the following commands:
```
npm run start_rest-server farmer1@beef-network 3001
npm run start_rest-server processor1@beef-network 3002
npm run start_rest-server certifier1@beef-network 3003
npm run start_rest-server wholesaler1@beef-network 3004
```

## Setting up ExpressJS reverse proxy
1. Enter following commands:
```
mkdir express_server
cd express_server
npm install express express-http-proxy
```
2. Inside the express_server folder, copy the server.js file from this repository over
3. Copy the entire html folder from this repository into the express_server folder
4. To start the server, enter the following command:
```
node server.js
```

## Running Application in browser
1. Open http://localhost:3000 in web browser
2. Login credentials for the 4 different participants are as follows:
  - Username: farmer1 / Password: password
  - Username: processor1 / Password: password
  - Username: certifier1 / Password: password
  - Username: wholesaler1 / Password: password
3. Explore!
