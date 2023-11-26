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
    loader = TextLoader('./data.txt')
    index = VectorstoreIndexCreator().from_loaders([loader])
    result = index.query(query_param, retriever_kwargs={"search_kwargs": {"k": 1}})
    return { "data": result}
  else:
    return { "error": "query parameter is empty"}

port = int(os.environ.get('PORT', 3000))
run(host='0.0.0.0', port=port, debug=True)
