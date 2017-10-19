from kafka import KafkaConsumer
from kafka import errors
import logging, time
import avro.schema
from avro.io import DatumReader, DatumWriter,BinaryDecoder
from constants import *
import io
import os
from avro.datafile import DataFileReader, DataFileWriter
from datetime import datetime
import sys
import subprocess

class ClickStreamLog:
    #daemon = True

	def __init__(self):
		self.count  = 0
	
	def run_spark(self):
		spark_command="/home/madhan/spark-1.4.0-bin-hadoop2.6/bin/spark-submit --jars $DIVOLTE_SPARK_JAR --driver-class-path $DIVOLTE_SPARK_JAR " + SPARK_SCRIPT_PATH+" "+OUTPUT_FILE_MERGED_AVRO
		print subprocess.Popen(spark_command, shell=True, stdout=subprocess.PIPE).stdout.read()

	def collect(self):
	#Listens  for kafka stream data and writes it to a file

		try:
			print "Starting.."
			date=datetime.now()
			# out_file_name=OUTPUT_BASE_DIR+"/"+str(date.year)+"/"+str(date.month)+"/"+str(date.day)+"/"
			# if not os.path.exists(out_file_name):
			# 	os.makedirs(out_file_name)
			out_file_name = OUTPUT_FILE
			#init KAFKA
			consumer = KafkaConsumer(bootstrap_servers=KAFKA_HOST,auto_offset_reset='earliest')
			consumer.subscribe([KAFKA_TOPIC])
			schema = avro.schema.parse(open(AVRO_SCHEMA_PATH).read())
			
			#while True:
			for msg in consumer:
				
				print "received data .." , self.count
				if not os.path.exists(out_file_name):

					# Adding Schema to new file
					writer = DataFileWriter(open(out_file_name, "wb+"), DatumWriter(), schema)
				else:

					# Discarding Schema since existing file already has schema defined
					writer = DataFileWriter(open(out_file_name, "ab+"), DatumWriter())
				bytes_reader = io.BytesIO(msg.value)
				decoder = BinaryDecoder(bytes_reader)
				reader = DatumReader(schema)
				record = reader.read(decoder)
				writer.append(record)
				writer.close()
				if self.count > 10:
					self.run_spark()
					self.count = 0
				else:
					self.count = self.count + 1

		except errors.NoBrokersAvailable:
			#kafka not running
			print "Unable to connect to kafka stream. is kafka running at "+KAFKA_HOST

		except KeyboardInterrupt as e:
			print "Exiting..."
			sys.exit()

if __name__ == "__main__":
		logging.basicConfig(filename='kafka_access.log',
				format='%(asctime)s.%(msecs)s:%(name)s:%(thread)d:%(levelname)s:%(process)d:%(message)s',
				level=logging.INFO)

		t=ClickStreamLog()
		t.collect()
		