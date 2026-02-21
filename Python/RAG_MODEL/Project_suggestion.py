import os
from dotenv import load_dotenv
import json
from fastapi import FastAPI , status , HTTPException
from langchain_ollama import OllamaEmbeddings
from langchain_qdrant import QdrantVectorStore 
from openai import OpenAI
from Model.RAG_FILE_MODEL import Retrival_Model

load_dotenv()

HF_TOKEN=os.getenv("HF_TOKEN")
HF_API_END_POINT=os.getenv("HF_API_END_POINT")

client = OpenAI(
base_url=HF_API_END_POINT,
 api_key=os.getenv("HF_TOKEN"),
)



def Project_suggestion(query:str):
    try:   
        SYS_PROMPT ="""
         You are an AI ChatBot helping student to understand what type of Project he can do based on what he learnt 
         if user ask anything else do reply but not deeply. 
         make sure you drag user towards Career path and  project discussion 
         
         NOTE: Your Reply must be only  3 Line long.
         """
      
        print(f"the query users sent is : {query}")
        completion = client.chat.completions.create(
        model="Qwen/Qwen2.5-7B-Instruct:together",
        messages=[
            {"role":"system" , "content":SYS_PROMPT},
            {"role": "user" , "content": query}
        ],
      
        )
    
        message = completion.choices[0].message
        return message
    except Exception as e :
        return {"error" :f"{e}"}
        