# Futanari.app External Hosting Deployment Guide

## 🚀 Complete Deployment Package for ShockHosting.com

### Project Structure Overview
```
futanari-app/
├── frontend/          # React application
│   ├── build/         # Production build files (ready to deploy)
│   ├── src/           # Source code
│   ├── public/        # Static files
│   └── package.json   # Dependencies
├── backend/           # FastAPI Python application
│   ├── server.py      # Main server file
│   ├── requirements.txt # Python dependencies
│   └── .env           # Environment variables
└── deployment_guide.md # This file
```

## 📦 What You Need to Deploy

### Frontend (Static Files)
- **Location**: `/app/frontend/build/` folder
- **Type**: Static React application
- **Hosting**: Can be hosted on any static hosting service

### Backend (API Server)
- **Location**: `/app/backend/` folder
- **Type**: FastAPI Python application
- **Requirements**: Python 3.8+, MongoDB database

## 🏠 Hosting Options & Recommendations

### Option 1: Full Stack Hosting (Recommended)
**Services**: ShockHosting.com, DigitalOcean, Linode, AWS EC2

**Requirements**:
- VPS/Cloud server with Python support
- MongoDB database (managed or self-hosted)
- Domain configuration for futanari.app

### Option 2: Separate Frontend/Backend Hosting
**Frontend**: Netlify, Vercel, Cloudflare Pages (static hosting)
**Backend**: Railway, Render, Heroku (Python hosting)
**Database**: MongoDB Atlas (managed database)

## 🛠️ ShockHosting.com Deployment Steps

### Step 1: Order Hosting Package
1. Visit ShockHosting.com
2. Choose a VPS or shared hosting plan with:
   - Python 3.8+ support
   - SSH access
   - Domain management
   - SSL certificate support

### Step 2: Domain Configuration
1. Point your domain `futanari.app` to ShockHosting nameservers
2. Set up A record to point to your server IP
3. Configure SSL certificate for HTTPS

### Step 3: Server Setup

#### Upload Files:
```bash
# Upload these folders to your server:
/app/frontend/build/     → /var/www/futanari.app/
/app/backend/           → /var/www/api/
```

#### Install Python Dependencies:
```bash
cd /var/www/api/
pip install -r requirements.txt
```

#### Configure Web Server (Apache/Nginx):
```nginx
# Nginx configuration example
server {
    listen 80;
    server_name futanari.app www.futanari.app;
    
    # Serve static frontend files
    location / {
        root /var/www/futanari.app;
        try_files $uri $uri/ /index.html;
    }
    
    # Proxy API requests to FastAPI backend
    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Step 4: Database Setup

#### Option A: MongoDB Atlas (Recommended)
1. Create free account at mongodb.com/atlas
2. Create cluster and get connection string
3. Update backend/.env with new MONGO_URL

#### Option B: Self-hosted MongoDB
```bash
# Install MongoDB on your server
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Step 5: Backend Configuration

#### Update Environment Variables:
```env
# /var/www/api/.env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/futanari_db
DB_NAME=futanari_db
```

#### Start FastAPI Server:
```bash
cd /var/www/api/
uvicorn server:app --host 0.0.0.0 --port 8001
```

#### Set up Process Manager (PM2):
```bash
# Install PM2
npm install -g pm2

# Start backend with PM2
cd /var/www/api/
pm2 start "uvicorn server:app --host 0.0.0.0 --port 8001" --name futanari-api
pm2 save
pm2 startup
```

## 📁 Files You Need to Download

### Essential Files:
1. **Frontend Build**: `/app/frontend/build/` (entire folder)
2. **Backend Code**: `/app/backend/` (entire folder)
3. **Configuration Files**: nginx.conf, .env templates
4. **Dependencies**: package.json, requirements.txt

### File Checklist:
- ✅ React build files (static HTML/CSS/JS)
- ✅ FastAPI backend code
- ✅ Python requirements.txt
- ✅ Environment configuration
- ✅ Database schema/models

## 🔧 Alternative Hosting Solutions

### For Easier Setup:

#### 1. Netlify + Railway
- **Frontend**: Deploy build folder to Netlify
- **Backend**: Deploy backend folder to Railway
- **Database**: MongoDB Atlas
- **Domain**: Configure futanari.app in Netlify

#### 2. Vercel + Render
- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Render
- **Database**: MongoDB Atlas
- **Domain**: Configure in Vercel

#### 3. Cloudflare Pages + Backend
- **Frontend**: Cloudflare Pages
- **Backend**: Cloudflare Workers or external service
- **Database**: MongoDB Atlas

## 💰 Cost Estimate

### ShockHosting VPS:
- **Basic VPS**: $10-25/month
- **Domain**: $10-15/year
- **SSL**: Usually included

### Alternative Services:
- **Netlify**: Free for frontend
- **Railway**: $5-10/month for backend
- **MongoDB Atlas**: Free tier available
- **Total**: $5-15/month

## 🚀 Quick Start Commands

### Build Frontend:
```bash
cd /app/frontend
yarn build
```

### Test Backend Locally:
```bash
cd /app/backend
pip install -r requirements.txt
uvicorn server:app --reload
```

### Deploy to Server:
```bash
# Upload build folder
rsync -avz /app/frontend/build/ user@server:/var/www/futanari.app/

# Upload backend
rsync -avz /app/backend/ user@server:/var/www/api/
```

## 📞 Next Steps

1. **Choose hosting provider** (ShockHosting.com or alternative)
2. **Set up domain configuration**
3. **Upload project files**
4. **Configure database**
5. **Test deployment**

Would you like me to prepare a ZIP file with all the necessary files for deployment?