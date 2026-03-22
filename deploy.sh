#!/bin/bash

# Build and deploy the Lex Digitalis platform

echo "🚀 Starting deployment of Lex Digitalis..."

# Pull latest changes
git pull origin main

# Build backend
echo "📦 Building backend..."
cd backend
npm install
npm run build

# Build frontend
echo "📦 Building frontend..."
cd ../frontend
npm install
npm run build

# Run database migrations
echo "🗄️ Running database migrations..."
cd ../backend
npm run migrate

# Start Docker containers
echo "🐳 Starting Docker containers..."
cd ..
docker-compose down
docker-compose build
docker-compose up -d

# Run health checks
echo "🏥 Running health checks..."
sleep 10
curl -f http://localhost:5000/health || exit 1
curl -f http://localhost:3000 || exit 1

echo "✅ Deployment complete! Site is live at https://lexdigitalis.co.ke"