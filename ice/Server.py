#!/usr/bin/python
# -*- coding: utf-8 -*-

import sys
import Ice
Ice.loadSlice('Printer.ice')
import Example
import peewee
from peewee import *

db = MySQLDatabase('ubiqDB', user='root',passwd='root')


class Sensor(peewee.Model):
    coords = TextField()
    identificator = IntegerField(unique=True)
    temperature = IntegerField()

    class Meta:
        database = db

class Utils():
	def splitSensorMsg(self, message):
		splitedMsg = []

		splitedMsg = message.split('**')
		
		return splitedMsg

class PrinterI(Example.Printer):
	n = 0
	def write(self, message, current=None):
		print("{0}: {1}".format(self.n, message))
		utils = Utils()

		splitedMsg = utils.splitSensorMsg(message)
		sensor = Sensor.select().where(Sensor.identificator == splitedMsg[0])
		if sensor:
			Sensor.update(temperature = splitedMsg[2]).where(Sensor.identificator == splitedMsg[0]).execute()
		else:
			Sensor.create(identificator = splitedMsg[0], coords=splitedMsg[1], temperature=splitedMsg[2])
			
		sys.stdout.flush()
		self.n += 1

class Server(Ice.Application):
	def run(self, argv):
		broker = self.communicator()
		servant = PrinterI()

		adapter = broker.createObjectAdapter("PrinterAdapter")
		proxy = adapter.add(servant, broker.stringToIdentity("printer1"))
		
		print(proxy)
		sys.stdout.flush()
		if not Sensor.table_exists():
			Sensor.create_table()
		
		adapter.activate()
		self.shutdownOnInterrupt()
		broker.waitForShutdown()

		return 0

server = Server()
sys.exit(server.main(sys.argv))