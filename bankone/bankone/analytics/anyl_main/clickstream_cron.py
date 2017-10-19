import os
from GoogleStorage.Google_Storage import  GoogleStorage
from avro_merger import merge
from constants import *
import subprocess

class ClickStream_CRON:
    def __init__(self):
        self.googleStorage=GoogleStorage()
        self.hasFiles=False        

    def writeToGCS(self,avroFile):

       #Method to upload avro-logs to GCS
        self.googleStorage.setBucketName("clickstream-logs")
        self.googleStorage.upload_object(avroFile)


    def backup_logs(self):
        for root,dir_,files  in os.walk(OUTPUT_BASE_DIR):
            for file in files:
                self.hasFiles=True
                file_path=os.path.join(root,file)
                self.merge_AVRO(file_path)
                self.writeToGCS(file_path)
                os.remove(file_path)

    def run_spark(self):
        if self.hasFiles:
            spark_command="spark-submit --jars $DIVOLTE_SPARK_JAR --driver-class-path $DIVOLTE_SPARK_JAR " + SPARK_SCRIPT_PATH+" "+OUTPUT_FILE_MERGED_AVRO
            print subprocess.Popen(spark_command, shell=True, stdout=subprocess.PIPE).stdout.read()
    def merge_AVRO(self,path):
        base_dir=os.path.dirname(path)+"/"
        merge(OUTPUT_FILE_MERGED_AVRO,AVRO_SCHEMA_PATH,base_dir)
        
            



l=ClickStream_CRON()
l.backup_logs()
l.run_spark()