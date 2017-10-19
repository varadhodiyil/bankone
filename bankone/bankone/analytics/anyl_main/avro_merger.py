import avro.schema
from avro.datafile import DataFileReader, DataFileWriter
from avro.io import DatumReader, DatumWriter
import os
from datetime import datetime
import argparse

def merge(output,schema_path,avro_path):
	output_path = os.path.dirname(output)
	output_file=os.path.basename(output)
	processed_files_path="processed"


	output_file=output_path+"/"+output_file
	schema = avro.schema.parse(open(schema_path).read())
	
	if not os.path.exists(output_path):
	    os.makedirs(output_path)
	    
	if not os.path.exists(processed_files_path):
	    os.makedirs(processed_files_path)
	
	files=os.listdir(avro_path)
	hasFiles=False
	for file in files:
		if file.endswith(".avro"):
			hasFiles=True
			if not os.path.exists(output_file):
				# Adding Schema to new file
				writer = DataFileWriter(open(output_file, "wb+"), DatumWriter(), schema)
			else:
				# Discarding Schema since existing file already has schema defined
				writer = DataFileWriter(open(output_file, "ab+"), DatumWriter())
			path_file=avro_path+file
			reader = DataFileReader(open(path_file, "rb"), DatumReader())
			for r in reader:
				writer.append(r)
			reader.close()
			#os.rename(path_file,processed_files_path+"/"+file)
			writer.close()
	if hasFiles:
		print "Saved to : "+output_file
		return True
	else:
		print "No Files found to merge. try again with a different path"
	return False
	


if __name__ == '__main__':
	current_path=os.path.dirname(os.path.abspath(__file__))+"/"
	parser = argparse.ArgumentParser("Avro Merger")
	parser.add_argument('--path', action='store', dest='path',default="/home/madhan/",required=True,
                    help='Path to look for data files')

	parser.add_argument('--output', action='store', dest='output',default=current_path+"data/data.avro",
                    help='Path to store merged avro files')

	parser.add_argument('--schema', action='store', dest='schema',default=current_path+"Schema.avsc",
                    help='Path to look for  avro Schema ')

	args=parser.parse_args()
	merge(args.output,args.schema,args.path)
	#merge()