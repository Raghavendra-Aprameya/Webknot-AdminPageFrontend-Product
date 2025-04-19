# Project Estimation Tool

A Next.js application for creating and managing project estimates from Statement of Work (SOW) documents.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:8000`

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd presales-nextjs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```



## Running the Application

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Open your browser and navigate to:
```
http://localhost:8080
```

## Features

- Upload SOW documents
- Create project estimates
- Download Excel estimates
- View project presentations
- Real-time status updates

## Project Structure

```
presales-nextjs/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── hooks/         # Custom hooks
│   └── lib/           # Utility functions
├── public/            # Static assets
└── package.json       # Project dependencies
```

## API Endpoints

The application expects the following backend endpoints:

- `POST /estimate` - Create new estimate
- `GET /status/:projectId` - Get project status
- `GET /projects/:projectId/excel` - Get Excel file
- `GET /projects/:projectId/presentation` - Get presentation

## Notes

- The estimation process takes approximately 15 minutes
- Keep the page open during the estimation process
- You can create multiple estimates
- Each estimate has a unique Project ID 