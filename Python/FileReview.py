from langchain_ollama import OllamaEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader 
from pathlib import Path 
from dotenv import load_dotenv
import os 
import json
from fastapi import HTTPException , status
from Model.RAG_FILE_MODEL import RAG_FILE_MODEL
from Model.RAG_FILE_MODEL import FileReview
import requests
from openai import OpenAI
load_dotenv() 
HF_API_END_POINT=os.getenv("HF_API_END_POINT")
QDRANT_CLUSTER_END_POINT =  "http://localhost:6333"
Qdrant_API_KEY = os.getenv("Qdrant_API_KEY") or ""

def FileReviewForHOD(doc:FileReview):
    try: 
        url = doc.doc_link
        response = requests.get(url)
        response.raise_for_status()
        #Store PDF
        with open(f"FILES/{doc.doc_name}.pdf", "wb") as file:
            file.write(response.content)
        print(os.getcwd())
        #Path
        BASE_DIR = Path(__file__).resolve().parent
        pdf_path = BASE_DIR / "FILES" / f"{doc.doc_name}.pdf"
        
        print(f"Base Path : {pdf_path}")
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

        client = OpenAI(
            base_url=HF_API_END_POINT,
            api_key=os.getenv("HF_TOKEN"),
        )
        
        context_text = "\n".join([doc.page_content for doc in Chunks])
        
        query = f"""
            DOCUMENT:
            {context_text}

            You are an academic AI reviewer.

            Your role:
            Carefully analyze the DOCUMENT and evaluate the quality, clarity, and factual accuracy of the student's notes.

            Instructions:
            1. Read the DOCUMENT completely before responding.
            2. Evaluate:
            - Accuracy of information
            - Clarity of explanation
            - Completeness of coverage
            3. Provide exactly 3 concise lines of constructive feedback.
            4. Give a score out of 10 based strictly on academic quality.

            Scoring Guidelines:
            - 9-10 → Excellent, accurate and complete
            - 7-8 → Good, minor improvements needed
            - 5-6 → Average, noticeable gaps
            - 3-4 → Weak, major corrections required
            - 0-2 → Poor, mostly incorrect or incomplete

            IMPORTANT:
            - Response MUST be valid JSON.
            - Do NOT include any extra text outside JSON.
            - Do NOT use markdown formatting.
            - Do NOT add explanations outside the JSON object.

            RESPONSE FORMAT:
            {{
                "NOTES_REVIEW": "Three concise lines of academic feedback here.",
                "Points_out_of_10": 0
            }}
            """    

        completion = client.chat.completions.create(
            model="Qwen/Qwen2.5-7B-Instruct:together",
            messages=[
                {"role":"user" , "content":query},
            ],
      
        )
    
        message = completion.choices[0].message
        print("*****************DONE************************  \n")
        result = json.loads(message.content)
        print("Type:", type(result))
        print("Value:", result)   
        return result      
                                     
    except Exception as e : 
        print(e)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Something went wrong while uploading the file to vector DB  {e}"
        )
