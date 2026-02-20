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


def Retrival(doc:Retrival_Model):
    try: 
        client = OpenAI(
        base_url="https://router.huggingface.co/v1",
        api_key=os.getenv("HF_TOKEN"),
          )

        embeddinng_model= OllamaEmbeddings(
            model="nomic-embed-text",
            base_url="http://localhost:11434"
        )

        vecotr_store = QdrantVectorStore.from_existing_collection(
            embedding=embeddinng_model,
            url="http://localhost:6333",
            collection_name=doc.doc_name
        )

        user_query = doc.user_query

        search_result = vecotr_store.similarity_search(query=user_query)
        # print(search_result[0])
        context=[
            f"Page Content: {result.page_content}"
            f"Page NUMBER: {result.metadata['page']}"
            f"Total Page: {result.metadata['total_pages']}"
            f"Source: {doc.doc_name}"
            for result in search_result
        ]

        SYS_PROMPT = f"""
         You are an AI learning assistant designed to help students prepare for exams.

                Your task:
                - You will receive a CONTEXT extracted from study materials.
                - You must carefully read the CONTEXT before answering.
                - Answer the user's question strictly based on the provided CONTEXT.

                Rules:
                1. If the answer is clearly available in the CONTEXT, provide a clear, structured, and easy-to-understand explanation.
                2. If the CONTEXT does not contain enough information to answer the question, respond with:
                "The provided context does not contain enough information to answer this question."
                3. Do NOT make up information.
                4. Do NOT use outside knowledge.
                5. If the user asks something unrelated to studies or the provided context, respond with:
                   "I am here to help you with your studies."

                Response Guidelines:
                - Keep answers clear and student-friendly.
                - Use simple language.
                - If appropriate, explain in short paragraphs.
                - Avoid unnecessary details.

                CONTEXT:
             {context}
            """

        def AiAgentReply(query:str):
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

        result = AiAgentReply(user_query)
        print(result)
        return {"res": result}
    except Exception as e : 
         raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Something went wrong while Retriving the Data "
        )
    
        
