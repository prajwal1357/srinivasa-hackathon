from fastapi import FastAPI
from Model.RAG_FILE_MODEL import RAG_FILE_MODEL
from RAG_MODEL.Embedding import embedd
app = FastAPI() 


@app.get("/")
def init():
    return {"message": "HEllo world "}

@app.post("/Ai/vector")
def uploadFILE(docs:RAG_FILE_MODEL):
    embedd(docs)