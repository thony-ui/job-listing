# AI-Powered Job Listing Platform

A full-stack application that helps job seekers overcome resume rejection by tailoring resumes to job descriptions using AI. This project was built to solve the common problem of resumes getting filtered out by Applicant Tracking Systems (ATS) before reaching human recruiters.

## 📁 Project Structure

- `/frontend` – Next.js + Tailwind CSS (User Interface)
- `/backend` – Node.js + Supabase (API and Database)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/thony-ui/job-listing
cd job-listing
````

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```
Make sure to create a `.env` file in `/frontend` and add your environment variables.

```bash
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
NEXT_PUBLIC_API_URL="http://localhost:8000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Setup Backend

```bash
cd /backend
npm install
npm run dev
```

Make sure to create a `.env` file in `/backend` and add your environment variables.

```bash
SECRET_KEY=""
SUPABASE_URL=""
SUPABASE_SERVICE_ROLE_KEY=""
ALLOWED_ORIGIN_PRODUCTION=""
ALLOWED_ORIGIN_DEVELOPMENT="http://localhost:3000"
PORT=8000
LOG_LEVEL=debug
OPENROUTER_API_KEY=""
OPENROUTER_URL=""
```


## 🛠 Tech Stack

* **Frontend**: Next.js, Tailwind CSS
* **Backend**: Node.js, Supabase

## 📌 Notes

* Both frontend and backend need to be running for full functionality.
* This project is organized as a monorepo. Make sure you're in the right directory when running each part.

## 📬 Contact

Feel free to connect or reach out on [LinkedIn](https://www.linkedin.com/in/anthony-hermanto-043097211/)

