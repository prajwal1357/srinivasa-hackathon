from fastapi import FastAPI
from Model.RAG_FILE_MODEL import RAG_FILE_MODEL , Retrival_Model
from RAG_MODEL.Embedding import embedd 
from RAG_MODEL.Retrival import Retrival
app = FastAPI() 


@app.get("/")
def init():
    return {"message": "HEllo world "}

@app.post("/Ai/vector")
def uploadFILE(docs:RAG_FILE_MODEL):
    embedd(docs)
    
@app.post("/Ai/Retrival")
def Retrival_doc(doc:Retrival_Model):
    Retrival(doc)