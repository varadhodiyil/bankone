OUTPUT_BASE_DIR = "clickstream"
OUTPUT_FILE = "data.avro"
AVRO_SCHEMA_PATH = "Schema.avsc"
KAFKA_HOST = "localhost:9092"

KAFKA_TOPIC = "clickstream-logs"



#HDFS_PATH = "/home/madhan/"


#output file path for merged avro files . This will be used as src for spark
OUTPUT_FILE_MERGED_AVRO = "data.avro"
SPARK_SCRIPT_PATH = "analyse.py"
#constants for reporting API

#keys for avro

VISITS = 'visits'
EVENTYPE = 'eventType'
REMOTE_HOST = 'remoteHost'
TIMESTAMP = 'timestamp'


#json keys for output file
JSON_OUTPUT_FILE = 'data.json'


DISTINCT_EVENTS = 'distinctEvents'
UNIQUE_VISITS = 'unique_visits'
AVERAGE_VISIT = 'average_visit'
VISIT_PER_DAY = 'visit_timeline'
