from fastapi import FastAPI
from Model.RAG_FILE_MODEL import RAG_FILE_MODEL , Retrival_Model
from RAG_MODEL.Embedding import embedd 
from RAG_MODEL.Retrival import Retrival
from Model.RAG_FILE_MODEL import FileReview
from RAG_MODEL.Project_suggestion import Project_suggestion
from FileReview import FileReviewForHOD
app = FastAPI() 


@app.get("/")
def init():
    return {"message": "HEllo world "}

@app.post("/Ai/vector")
def uploadFILE(docs:RAG_FILE_MODEL):
    embedd(docs)
    
@app.post("/Ai/Retrival")
def Retrival_doc(doc:Retrival_Model):
    res =Retrival(doc)
    return {"res": res}

@app.post("/Ai/ChatBot")
def ChatBot(query:str):
    res = Project_suggestion(query=query)
    return {"res" :res }

@app.post("/Ai/FileReview")
def FIleReview(doc:FileReview):
    FileReviewForHOD(doc)