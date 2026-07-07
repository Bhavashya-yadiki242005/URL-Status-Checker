# URL Status Checker

## Overview

URL Status Checker is a simple web application that checks whether a website is reachable over the internet. The application allows users to enter a website URL and quickly view its availability, HTTP response status, and response time.

The project was built to understand how a Node.js application communicates with external websites using HTTP requests. It also serves as a hands-on project for learning Docker containerization and basic application deployment.

The application is intentionally kept simple so that the focus remains on deployment, containerization, and backend fundamentals rather than complex business logic.

---

# Features

- Check whether a website is online or offline
- Display the HTTP status code returned by the website
- Measure and display the response time
- Validate user input before sending a request
- Health Check API endpoint (`/health`)
- Simple and responsive user interface

---

# Technology Stack

- Node.js
- Express.js
- HTML
- CSS
- JavaScript
- Docker
- Docker Compose (Optional)

---

# Project Structure

```
url-status-checker/

├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── routes/
├── controllers/
│
├── app.js
├── package.json
├── Dockerfile
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

# How the Application Works

The application follows a simple client-server architecture.

1. The user enters a website URL.
2. The frontend sends the URL to the Express server.
3. The server sends an HTTP request to the entered website.
4. The server measures the response time and receives the HTTP status code.
5. The server sends the results back to the frontend.
6. The frontend displays whether the website is online or offline along with the response details.

### Application Flow

```
User
   │
   ▼
Enter Website URL
   │
   ▼
Express Server
   │
   ▼
HTTP Request
   │
   ▼
Target Website
   │
   ▼
Response Received
   │
   ▼
Display Result
```

---

# API Endpoint

## Health Check

```
GET /health
```

Example Response

```json
{
  "status": "Healthy",
  "version": "1.0.0"
}
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/yourusername/url-status-checker.git
```

Move into the project folder

```bash
cd url-status-checker
```

Install project dependencies

```bash
npm install
```

---

# Running the Application

Start the application

```bash
npm start
```

If your project uses a development server, run

```bash
npm run dev
```

After the server starts successfully, open your browser and visit

```
http://localhost:3000
```

or the port shown in your terminal.

---

# Using the Application

1. Enter a valid website URL.
2. Click the **Check Status** button.
3. Wait for the application to send the request.
4. View the result, including:

- Website Status (Online / Offline)
- HTTP Status Code
- Response Time

---

# Docker

Build the Docker image

```bash
docker build -t url-status-checker .
```

Run the Docker container

```bash
docker run -p 3000:3000 url-status-checker
```

If Docker Compose is configured

```bash
docker compose up
```

---

# Example Output

```
Website URL

https://google.com

--------------------------------

Status

Online

HTTP Status Code

200

Response Time

124 ms
```

---

# Future Improvements

Some features that can be added in the future include:

- Monitoring multiple websites simultaneously
- Scheduled health checks
- Email notifications
- Response history
- SSL certificate validation
- Docker deployment to cloud platforms

---

# What I Learned

Working on this project helped me understand:

- Building REST APIs with Express.js
- Sending HTTP requests from a backend server
- Handling responses and errors
- Measuring response time
- Input validation
- Docker containerization
- Basic deployment concepts
- Organizing a Node.js project

---

# Why I Built This Project

I built this project to gain practical experience with backend development and application containerization. Rather than creating a feature-rich application, I wanted to focus on understanding how web servers communicate with external services and how applications can be packaged and run consistently using Docker. The simplicity of the project allowed me to spend more time learning deployment and containerization concepts that are commonly used in DevOps and Site Reliability Engineering.

---

# License

This project was created for educational purposes to practice backend development, Docker, and application deployment concepts.
