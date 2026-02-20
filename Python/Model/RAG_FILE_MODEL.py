from pydantic import BaseModel


class RAG_FILE_MODEL(BaseModel):
    doc_link: str 
    doc_name: str 
    
    