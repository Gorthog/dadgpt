import os
from langchain.document_loaders import TextLoader
from langchain.indexes import VectorstoreIndexCreator
from dotenv import load_dotenv
from bottle import run, request, post, get, app
from google.cloud import storage
from bottle_cors_plugin import cors_plugin

load_dotenv()

@get('/')
def query():
  print("Open api key: " + os.environ.get('OPENAI_API_KEY'))
  if "query" in request.params:
    query_param = request.params.get("query")
    save_data_file_from_gcs('dadgpt', 'data.txt')
    loader = TextLoader('./data.txt')
    index = VectorstoreIndexCreator().from_loaders([loader])
    result = index.query(query_param, retriever_kwargs={"search_kwargs": {"k": 1}})
    return { "data": result.strip() }
  else:
    return { "error": "query parameter is empty."}



@post('/append')
def append():
  if "text" in request.json:
    text = request.json["text"]
    append_text_to_file_in_gcs('dadgpt', 'data.txt', text)
  else:
    return { "error": "text parameter is empty"}

def save_data_file_from_gcs(bucket_name, blob_name):
  _, existing_data = get_data_from_blob(bucket_name, blob_name)

  if os.path.exists('data.txt'):
      os.remove('data.txt')

  with open('data.txt', 'w') as file:
    file.write(existing_data)

def append_text_to_file_in_gcs(bucket_name, blob_name, text):
  blob, existing_data = get_data_from_blob(bucket_name, blob_name)
  new_data = existing_data + '\n' + text + '\n'
  blob.upload_from_string(new_data)

def get_data_from_blob(bucket_name, blob_name):
  client = storage.Client()
  bucket = client.get_bucket(bucket_name)
  blob = bucket.blob(blob_name)
  existing_data = blob.download_as_text()
  return blob,existing_data

app = app()
app.install(cors_plugin('*'))

port = int(os.environ.get('PORT', 4000))
run(host='0.0.0.0', port=port, debug=True)
