import sys
import os
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
import torch
import PyPDF2

def extract_text(file_path):
    text = ""
    if file_path.endswith(".pdf"):
        with open(file_path, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text()
    elif file_path.endswith(".txt"):
        with open(file_path, "r", encoding="utf-8") as file:
            text = file.read()
    return text

def summarize_text(text):
    summary = ""
    max_chunk_size = 1024
    chunks = [text[i:i+max_chunk_size] for i in range(0, len(text), max_chunk_size)]

    for chunk in chunks:
        result = summarizer(chunk, max_length=150, min_length=40, do_sample=False)
        summary += result[0]['summary_text'] + " "
    return summary

# ✅ Use your actual local model path
local_model_path = r"C:/Users/HI/Desktop/new_project/legal_analyzer/backend/summarizer/model_cache"
local_model_path = os.path.abspath(local_model_path)

print("Using local model path:", local_model_path)
print("Model directory exists?", os.path.exists(local_model_path))

if not os.path.exists(local_model_path):
    print("Model path does not exist. Please make sure you've downloaded the model to the correct folder.")
    sys.exit(1)

# ✅ Select device: GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Device set to use:", device)

# ✅ Load model/tokenizer and move model to GPU if available
tokenizer = AutoTokenizer.from_pretrained(local_model_path, local_files_only=True)
model = AutoModelForSeq2SeqLM.from_pretrained(local_model_path, local_files_only=True).to(device)

# ✅ Setup summarization pipeline with device=0 if GPU is available
pipeline_device = 0 if torch.cuda.is_available() else -1
summarizer = pipeline("summarization", model=model, tokenizer=tokenizer, device=pipeline_device)

if len(sys.argv) < 2:
    print("Usage: python summarizer.py <path_to_pdf_or_txt>")
    sys.exit(1)

# Process input file
file_path = sys.argv[1]
text = extract_text(file_path)
summary = summarize_text(text)
print(summary)
# #############################
# import os
# import torch
# from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
# import PyPDF2

# def extract_text(file_path):
#     text = ""
#     if file_path.endswith(".pdf"):
#         with open(file_path, "rb") as file:
#             reader = PyPDF2.PdfReader(file)
#             for page in reader.pages:
#                 text += page.extract_text()
#     elif file_path.endswith(".txt"):
#         with open(file_path, "r", encoding="utf-8") as file:
#             text = file.read()
#     return text

# def summarize_text(text):
# # Get absolute path to the model directory
#     BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Points to backend/
#     model_path = os.path.join(BASE_DIR, "summarizer", "model_cache")

#     #local_model_path = os.path.abspath("backend/summarizer/model_cache/facebook/snapshots")
#     model_path = os.path.abspath(model_path)
#     print("Model Path:", model_path)

#     tokenizer = AutoTokenizer.from_pretrained(model_path, local_files_only=True)
#     model = AutoModelForSeq2SeqLM.from_pretrained(model_path, local_files_only=True)

#     device = 0 if torch.cuda.is_available() else -1
#     summarizer = pipeline("summarization", model=model, tokenizer=tokenizer, device=device)

#     summary = ""
#     max_chunk_size = 1024
#     chunks = [text[i:i+max_chunk_size] for i in range(0, len(text), max_chunk_size)]

#     for chunk in chunks:
#         result = summarizer(chunk, max_length=150, min_length=40, do_sample=False)
#         summary += result[0]["summary_text"] + " "
#     return summary

   