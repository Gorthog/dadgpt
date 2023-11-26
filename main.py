import os
from langchain.document_loaders import TextLoader
from langchain.indexes import VectorstoreIndexCreator
from dotenv import load_dotenv
from bottle import route, run, request

load_dotenv()

@route('/')
def index():
  if "query" in request.params:
    query_param = request.params.get("query")
    save_data_file_from_gcs('dadgpt', 'data.txt')
    loader = TextLoader('./data.txt')
    index = VectorstoreIndexCreator().from_loaders([loader])
    result = index.query(query_param, retriever_kwargs={"search_kwargs": {"k": 1}})
    return { "data": result}
  else:
    return { "error": "query parameter is empty"}

from google.cloud import storage

def save_data_file_from_gcs(bucket_name, blob_name):
    # Create a client
    client = storage.Client()
    # Get the bucket
    bucket = client.get_bucket(bucket_name)
    # Get the blob
    blob = bucket.blob(blob_name)

    # Download the blob to a string
    data = blob.download_as_text()

    if os.path.exists('data.txt'):
        os.remove('data.txt')

    with open('data.txt', 'w') as file:
      file.write(data)

port = int(os.environ.get('PORT', 3000))
run(host='0.0.0.0', port=port, debug=True)
