import sys

from langchain.document_loaders import TextLoader
from langchain.indexes import VectorstoreIndexCreator
from dotenv import load_dotenv

load_dotenv()


query = sys.argv[1]
print(query)

loader = TextLoader('./data.txt')

index = VectorstoreIndexCreator().from_loaders([loader])

print(index.query(query, retriever_kwargs={"search_kwargs": {"k": 1}}))
