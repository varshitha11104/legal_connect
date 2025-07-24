from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from summarizer.summarizer import extract_text, summarize_text
import os
import shutil

app = FastAPI()

# Allow React frontend to call this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "./uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    extracted_text = extract_text(file_path)
    summary = summarize_text(extracted_text)

    # Optional: delete after summarization
    os.remove(file_path)

    return {"summary": summary}
