#!/usr/bin/python
# -*- coding: utf-8 -*-

import sys
import Ice
import time
import random
Ice.loadSlice('Printer.ice')
import Example

class Sensor:
	coords = ''
	id = ''

class Client(Ice.Application):
	
	def run(self, argv):
		coords = ['38.990602, -3.920474' , '38.991703, -3.919787' , '38.992170, -3.922373', '38.990310, -3.921611', '38.991352, -3.917201']
		sensors = []
		for count in xrange(5):
		    x = Sensor()
		    x.coords = coords[count]
		    x.id = count +1
		    sensors.append(x)
		    print("{0}: {1}".format(x.id, x.coords))

		while 1:
			proxy = self.communicator().stringToProxy(argv[1])
			printer = Example.PrinterPrx.checkedCast(proxy)

			if not printer:
				raise RuntimeError('Invalid proxy')
				
			temperature = random.randint(1,1000)
			randomSensor = random.choice(sensors)
			printer.write(str(randomSensor.id) + '**' + randomSensor.coords + '**' + str(temperature))
			
			print(randomSensor.coords + ' ' + str(randomSensor.id))
			#time.sleep(3)

		return 0

sys.exit(Client().main(sys.argv))