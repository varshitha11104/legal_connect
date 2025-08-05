LIVE LINK -
https://legal-connect-jade.vercel.app/


# 🧾 LegalConnect – AI-Powered Legal Assistance Platform

**LegalConnect** is an AI-driven web platform designed to simplify legal assistance by allowing users to upload and analyze legal documents, connect with lawyers, and access legal knowledge—all from a single place.

## 🚀 Tech Stack

- **Frontend**: React.js,css
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **AI Integration**: Python + FastAPI
- **File Uploads**: Multer (Node.js)
- **Email Notifications**: Nodemailer
- **Authentication**: Role-based (User/Lawyer)

---

## 📦 Features

### 🧠 AI-Powered Document Analyzer
- Upload `.pdf` or `.txt` legal documents
- Backend sends file to a Python NLP model via FastAPI
- Returns a **clean summary** of the legal document

### 👨‍⚖️ Lawyer Connect
- Users can fill out a form to **request legal help**
- Submissions are stored in MongoDB
- Email notification is sent to the lawyer with request details

### 📚 Legal Dictionary
- Frontend page with searchable legal terms
- Powered by a static JSON (`legalTerms_large.json`) file

### 🧑‍💼 Lawyer Dashboard
- Lawyers can log in and view their dashboard
- Profile completion form:
  - Name, Email, Specialization
  - Case Stats (Dealt/Won/Lost)
  - Fee, Short Description

### 🧑 User Dashboard
- Users can upload documents, view summaries
- Connect with lawyers

### 🔐 Role-Based Authentication
- Separate login/signup for:
  - Users
  - Lawyers
- Redirects based on role

---

## 📁 Project Structure

