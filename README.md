# (Noise Urban Maps Viewer) ITSUE Study Case

Basic useful feature list:

 * View sensors on map
 * Sensors measure noise level
 * Friendly UI


## Running the app

### ZeroC / [code folder](https://github.com/JoseGCheca/noiseMaps-ITSUE/tree/master/ice)

The Client.py file generates random values between 5 sensors located in 5 diferents points along the Ciudad Real School of Computer Science of Ciudad Real (these points are simulated too, hardcoded). Server.py collect values from sensors and store them in a mysql database. 

To run the demo, first start the server:
	
    $ python Server.py --Ice.Config=Server.config
    
Server will output the line below according to Server.config properties
	
    printer1 -t:tcp -h 192.168.0.12 -p 90900:tcp -h 10.1.1.10 -p 9090


To run the Client, use the remote proxy object printed by server
	
    $ python Client "printer1 -t:tcp -h 192.168.0.12 -p 90900:tcp -h 10.1.1.10 -p 9090"
    
![Alt text](https://raw.github.com/JoseGCheca/noiseMaps-ITSUE/master/screenshots/ice.png)

### Server  / [code folder](https://github.com/JoseGCheca/noiseMaps-ITSUE/tree/master/server/noiseMaps)

Use the command below to run node.js environment. This will deploy the application on localhost:3000 

	$ npm start


### Web  Client   / [code folder](https://github.com/JoseGCheca/noiseMaps-ITSUE/tree/master/web-client/public)

Web client is developed with AngularJS.

![ScreenShot](https://raw.githubusercontent.com/JoseGCheca/noiseMaps-ITSUE/master/screenshots/noiseMaps.png)


## Techs

![ScreenShot](https://raw.githubusercontent.com/JoseGCheca/noiseMaps-ITSUE/master/screenshots/techs.png)

