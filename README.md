# Setup Guide

## Prerequisites
- Node.js (v18+): Check with node -v.
- Angular CLI (v20): Install with npm install -g @angular/cli@20.
- Git: Check with git --version.

Project Structure
currency-converter/
├── web/                    # Angular 20 frontend
├── api/                    # Node.js/Express backend
└── README.md

Setup Steps
First Clone the Repository

Clone the project:
```sh
git clone https://github.com/Irtiza751/ta-currency-converter.git
```

```sh
cd ta-currency-converter
```

Second stip is to set Up the Backend

Go to the backend folder:

```sh
cd api
```

Install dependencies:

```sh
npm install
```

**Important** Create the `.env` file and copy from the `.env.example` and put the respective values.

Run the dev server

```sh
npm run dev
```

Or build the backend:

```sh
npm run build
```

Run the backend:

```sh
npm start
```

Backend runs on http://localhost:3000.
Test by visiting http://localhost:3000/api/currencies in a browser (should show currency data).

Third step is to set Up the Frontend

Go to the frontend folder:
```sh
cd ../web
```

Install dependencies:
```sh
npm install
```

Run the frontend:
```sh
ng serve
```
```
Frontend runs on http://localhost:4200.
```