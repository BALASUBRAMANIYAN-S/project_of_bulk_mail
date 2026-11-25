# BulkMail: Send Emails to a List

A small full-stack app for sending the same message to many people. Upload an Excel file with email addresses, type your message and send.

## How it works

1. Upload an Excel file (`.xlsx`) with one email address per row in **column A**.
2. The app shows how many emails were found.
3. Type your message and click **Send**.
4. The backend sends the mails one by one using Gmail through Nodemailer.

The Gmail account details are stored in a MongoDB collection (`bulkmail`) instead of the code.

## Tech Stack

| Part | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS 4, Axios, SheetJS (`xlsx`) |
| Backend | Node.js, Express 5, Nodemailer, Mongoose |
| Database | MongoDB |

## Project Structure

```
├── Frontend/    # React + Vite app
└── Backend/     # Express API (index.js)
```

## Getting Started

**Prerequisites:** Node.js 18+, a MongoDB database, and a Gmail account with an [App Password](https://support.google.com/accounts/answer/185833).

### 1. Database

In your MongoDB database, add one document to a collection named `bulkmail` with your Gmail login:

```json
{ "user": "your_email@gmail.com", "pass": "your_gmail_app_password" }
```

### 2. Backend

```bash
cd Backend
npm install
```

Set your own MongoDB connection string in `index.js`, ideally read from an environment variable, then run:

```bash
node index.js
```

The API runs on `http://localhost:5000`.

### 3. Frontend

```bash
cd Frontend
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## API

`POST /sendmail`

```json
{ "msg": "Your message", "emailList": ["a@example.com", "b@example.com"] }
```

Returns `true` if every mail was sent, otherwise `false`.

## Notes

- Never commit your MongoDB connection string or Gmail App Password. Use a `.env` file and add it to `.gitignore`.
- Gmail limits how many emails you can send per day. Use this only for people who agreed to receive your emails.
