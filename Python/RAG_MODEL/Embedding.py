from langchain_ollama import OllamaEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader 
from pathlib import Path 
from dotenv import load_dotenv
import os 
import requests
import tempfile
from fastapi import HTTPException , status
from Model.RAG_FILE_MODEL import RAG_FILE_MODEL
load_dotenv() 


QDRANT_CLUSTER_END_POINT =  "http://localhost:6333"
Qdrant_API_KEY = os.getenv("Qdrant_API_KEY") or ""

def embedd(doc:RAG_FILE_MODEL):
    try: 
         
        pdf_path = Path(__file__).parent / "PY1.pdf"
        print("YES! Got the Path of the PDF")

        PDFLoader = PyPDFLoader(pdf_path)
        docs = PDFLoader.load()
        print("YES! PDF Loaded")
        
        #Split the text 
        Text_Splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=400 
        )
        Chunks = Text_Splitter.split_documents(docs)
        print("YES! Done Creating Chunks")

        #init Embedding model 
        embedding = OllamaEmbeddings(
         model="nomic-embed-text",
         base_url="http://localhost:11434"   
        )

        #Store it in vector DB  #Embedd the text
        vector_search = QdrantVectorStore.from_documents(
         documents=Chunks,
         embedding=embedding,
         url="http://localhost:6333",
         # api_key=Qdrant_API_KEY,
         collection_name=doc.doc_name
        )
        print("Done storing the Vector embedded Data to the Local Vector DB")
        print("*****************DONE************************")
    except Exception as e : 
        print(e)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Something went wrong while uploading the file to vector DB  {e}"
        )

















