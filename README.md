# Lipaworld – Gift a Voucher Backend

A backend simulation for Lipaworld's digital marketplace, allowing users to gift vouchers via email or wallet address. The system is designed using Fastify, AWS SQS, and DynamoDB with a serverless-oriented architecture.

---

## 🔧 Tech Stack

- **Node.js + TypeScript**
- **React + TypeScript**
- **Fastify** for HTTP API
- **Zod** for input validation
- **AWS SDK v3** (SQS + DynamoDB)
- **Vitest** for unit testing
- **Serverless-ready** Lambda-style consumer

---

## 📦 Features

### 🎁 Gift a Voucher
- `POST /v1/api/vouchers/sendVoucher`
- Accepts:
  - `recipient` (email or wallet address)
  - `amount`
  - Optional `message`
- Validates input
- Publishes message to **AWS SQS queue**

### 📬 Retrieve Recipient's Vouchers
- `GET /v1/api/vouchers/getVouchers?recipient=...`
- Returns all vouchers associated with the recipient
- Reads from **DynamoDB**

### 🛠️ SQS Consumer Handler (Lambda-style)
- Receives SQS messages
- Logs voucher gift simulation
- Persists gift records into DynamoDB
- Includes basic retry + DLQ simulation


## 📦 Pages

### 🌐 Home Page
- `http://localhost:5173/`
- `https://lipaworld.netlify.app/`
- 
### 🎁 Gift a Voucher
- `http://localhost:5173/gift`
- `https://lipaworld.netlify.app/gift`

---

## ⚙️ Local Development

### 🖥 Backend Setup

1. **Clone the repository & install dependencies**
```bash
git clone https://github.com/KingZedPriest/Lipaworld.git
cd backend
yarn
create a .env file, and add the following details or create yours and replace them accordingly
PORT=3000
AWS_REGION=
AWS_DYNAMO_TABLE_NAME=
AWS_SQS_QUEUE_URL=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
Start the backend server: yarn dev
Run backend tests: yarn test
Documentation: http://localhost:3000/documentation

🌐 Frontend Setup
cd ../frontend
yarn
Create a .env file, and add the following details
VITE_BASE_URL= http://localhost:3000/v1/api/
Start the frontend: yarn dev
Run frontend tests: yarn test