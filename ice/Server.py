#!/usr/bin/python
# -*- coding: utf-8 -*-

import sys
import Ice
Ice.loadSlice('Printer.ice')
import Example
import peewee
from peewee import *

db = MySQLDatabase('ubiqDB', user='root',passwd='root')


class Sensors(peewee.Model):
    coords = CharField()
    identificator = IntegerField()
    noiseLvl = IntegerField()

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
		sensor = Sensors.select().where(Sensors.identificator == splitedMsg[0])
		if sensor:
			Sensors.update(noiseLvl = splitedMsg[2]).where(Sensors.identificator == splitedMsg[0]).execute()
		else:
			Sensors.create(identificator = splitedMsg[0], coords=splitedMsg[1], noiseLvl=splitedMsg[2])
			
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
		if not Sensors.table_exists():
			Sensors.create_table()
		
		adapter.activate()
		self.shutdownOnInterrupt()
		broker.waitForShutdown()

		return 0

server = Server()
sys.exit(server.main(sys.argv))