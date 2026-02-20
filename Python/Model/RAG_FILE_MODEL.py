from pydantic import BaseModel


class RAG_FILE_MODEL(BaseModel):
    doc_link: str 
    doc_name: str 
    
class Retrival_Model(BaseModel):
    doc_name: str 
    user_query: str 
    
class FileReview(BaseModel):
    doc_name:str
    doc_valid:bool
    doc_link:str 