from pyspark import SparkConf, SparkContext
from datetime import datetime
import json
from operator import add
import os
import time
from constants import *

def f(iterator):
	for x in iterator:
		print x
	yield None
	
def secondToMin(sec):
	return time.strftime("%H:%M:%S", time.gmtime(sec))
def averageTime(type_,visits):
	# min_=int(min(visit_time,key=lambda item:item[1])[0])
    max_ =max(visits,key=lambda item:item[1])[1]
    min_=min(visits,key=lambda item:item[1])[1]
    
    return type_,secondToMin(max_-min_)
def printme(data):
	print data
def timestamp_to_string(_timestamp_):
	return datetime.fromtimestamp(_timestamp_/1000).strftime('%Y-%m-%d')

def toJSON(_dict):
	#modifies JSON format enabling key,value pairs
	
	data=list()
	for d in _dict:
		t=dict()
		t['key']=d[0]
		t['value']=d[1]
		data.append(t)
	return data

path=os.path.dirname(os.path.abspath(__file__))
output_file=path+"/"+JSON_OUTPUT_FILE
def customGroup(ev,u_type="business"):
	if ev['category_id'] == u_type:
		return ev['eventType'] , 1
	else:
		return "",1
def main(hdfs_uri):


	sc = SparkContext()
	events_rdd = sc.newAPIHadoopFile(
	    hdfs_uri,
	    'org.apache.avro.mapreduce.AvroKeyInputFormat',
	    'org.apache.avro.mapred.AvroKey',
	    'org.apache.hadoop.io.NullWritable',
	    keyConverter='io.divolte.spark.pyspark.avro.AvroWrapperToJavaConverter').map(lambda (k,v): k)

    
	events_rdd.cache()
	data=dict()
	total_event_count = events_rdd.count()
	data[VISITS]=total_event_count

	# Get the first event in our dataset (which isn't ordered yet).
	#an_event = events_rdd.take(1)

	# Find the session with the most events.
	distinct_event_names = events_rdd.map(lambda event:event['category_id'],1).distinct().collect()
	# result_ll = distinct_event_names.map( lambda elem: list(elem))
	t = dict()
	for d in distinct_event_names:
		_events = events_rdd.filter(lambda event:event['category_id']==d).map(lambda event:(event['event_name'],1)).reduceByKey(add).collect()
		t[d] = toJSON(_events)
	data['event_name'] = t
	distinct_events = events_rdd.map(lambda event: (event[EVENTYPE],1)).reduceByKey(add).collect()
	
	#.map(lambda event: (event['eventType'], event['timestamp'])) \
	# Simple function for rendering timestamps.

	# Print the results we accumulated, with some whitespace at the
	# front to separate this from the logging.
	#distinct_events= distinct_events
	data[DISTINCT_EVENTS]=toJSON(distinct_events)

	unique_visits=events_rdd.map(lambda event:event[REMOTE_HOST],1).distinct().count()
	data[UNIQUE_VISITS]=unique_visits

	session_rdd=events_rdd.map(lambda event:(event[REMOTE_HOST],event[TIMESTAMP]))
	
	avg = events_rdd.map(lambda event: (event[REMOTE_HOST],1)).reduceByKey(add).collect()
	# avg=session_rdd.groupBy(lambda e:e[0]).map(lambda e:averageTime(e[0],e[1])).collect()
	data[AVERAGE_VISIT]=toJSON(avg)

	visits_per_day=events_rdd.map(lambda event:(timestamp_to_string(event[TIMESTAMP]),1)).reduceByKey(add).collect()
	data[VISIT_PER_DAY]=toJSON(visits_per_day)

	event_name = events_rdd.filter(lambda event:event['eventType']=="click").map(lambda event:(event['event_name'],1)).reduceByKey(add).collect()
	data['click_events'] = event_name

	event_name = events_rdd.filter(lambda event:event['event_name']=="search").map(lambda event:(event['raw_query'],1)).reduceByKey(add).collect()
	data['search'] = toJSON(event_name)

	event_name = events_rdd.filter(lambda event:event['event_name']=="trending").map(lambda event:(event['raw_query'],1)).reduceByKey(add).collect()
	data['trending'] = toJSON(event_name)

	event_name = events_rdd.filter(lambda event:event['event_name']=="navigate").map(lambda event:(event['raw_query'],1)).reduceByKey(add).collect()

	# grouped_events = events_rdd.map(lambda e:(e[REMOTE_HOST],e['event_name'])).groupBy(lambda event:event[0]).collect()
	grouped_events = events_rdd.groupBy(lambda event:event[REMOTE_HOST]).collect()
	ip_events_d = dict()
	for k,v in grouped_events:
		ip_events = sc.parallelize(v).map(lambda e:(e['event_name'],1)).reduceByKey(add).collect()
		ip_events_page = sc.parallelize(v).map(lambda e:(e['category_id'],1)).reduceByKey(add).collect()
		ip_events_d[k] = dict()
		ip_events_d[k]['events'] =  toJSON(ip_events)
		ip_events_d[k]['page_visits'] =  toJSON(ip_events_page)
	data['ip_events'] = ip_events_d
	# ip_events = grouped_events.map(lambda event:(event[1]['event_name'],1)).reduceByKey(add).collect()
	# print ip_events
	# group_list = grouped_events.filter(lambda event:event['eventType']=="click").map(lambda event:(event['event_name'],1)).reduceByKey(add).collect()
	# with open("t") as h :
	# 	h.wr

	# data['ip_events'] = grouped_events

	data['navigate'] = toJSON(event_name)
	with open(output_file,"w") as h:
	    h.write(json.dumps(data, indent=2))
	    h.close()
if __name__ == "__main__":
    import sys
    if (len(sys.argv) >= 2):
        main(*sys.argv[1:])
    else:
        print >> sys.stderr, "Usage: spark-submit [...] analyse.py PATH_TO_DIVOLTE_LOGS"
