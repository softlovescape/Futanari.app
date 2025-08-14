# 🚀 ShockHosting.com Deployment Instructions for futanari.app

## 📦 Deployment Package Contents
- **frontend/build/** - Production React application (static files)
- **backend/** - FastAPI Python server
- **nginx.conf** - Web server configuration
- **deployment_guide.md** - Complete deployment guide
- **.env.example** - Environment variables template

## 🏠 Step 1: Order ShockHosting Package

### Recommended Plan:
- **VPS SSD 2** or higher ($15-25/month)
- **Requirements**: 
  - Python 3.8+ support
  - SSH access
  - Root access
  - 2GB+ RAM
  - 20GB+ SSD storage

### During Checkout:
1. Select **CentOS 7** or **Ubuntu 20.04** as OS
2. Choose **Chicago** or **Germany** datacenter
3. Add **SSL certificate** addon
4. Select **1 year** for better pricing

## 🌐 Step 2: Domain Configuration

### At Your Domain Registrar:
1. **Login to your domain registrar** (where you bought futanari.app)
2. **Change nameservers** to:
   - ns1.shockhosting.com
   - ns2.shockhosting.com
3. **Wait 2-24 hours** for propagation

### In ShockHosting Control Panel:
1. **Login** to your ShockHosting account
2. **Go to Domain Management**
3. **Add domain**: futanari.app
4. **Point to your VPS IP** (A record)
5. **Add www subdomain** (CNAME to futanari.app)

## 🛠️ Step 3: Server Setup

### Connect to Your VPS:
```bash
ssh root@your-vps-ip
```

### Update System:
```bash
# Ubuntu/Debian:
apt update && apt upgrade -y

# CentOS:
yum update -y
```

### Install Required Software:
```bash
# Ubuntu/Debian:
apt install -y python3 python3-pip nginx mongodb-server unzip

# CentOS:
yum install -y python3 python3-pip nginx mongodb-server unzip
```

### Start Services:
```bash
systemctl start nginx
systemctl enable nginx
systemctl start mongodb
systemctl enable mongodb
```

## 📁 Step 4: Upload Your Files

### Extract Deployment Package:
```bash
cd /root
# Upload futanari-app-deployment.tar.gz to your server
tar -xzf futanari-app-deployment.tar.gz
```

### Create Web Directories:
```bash
mkdir -p /var/www/futanari.app
mkdir -p /var/www/api
```

### Copy Files:
```bash
# Copy frontend files
cp -r frontend/build/* /var/www/futanari.app/

# Copy backend files
cp -r backend/* /var/www/api/

# Set permissions
chown -R nginx:nginx /var/www/futanari.app
chown -R root:root /var/www/api
chmod -R 755 /var/www/futanari.app
```

## 🐍 Step 5: Setup Python Backend

### Install Python Dependencies:
```bash
cd /var/www/api
pip3 install -r requirements.txt
```

### Configure Environment:
```bash
cd /var/www/api
cp .env.example .env
nano .env
```

### Edit .env file:
```env
MONGO_URL=mongodb://localhost:27017/
DB_NAME=futanari_db
HOST=0.0.0.0
PORT=8001
ENV=production
FRONTEND_URL=https://futanari.app
```

### Test Backend:
```bash
cd /var/www/api
python3 -m uvicorn server:app --host 0.0.0.0 --port 8001
# Press Ctrl+C to stop
```

## 🔧 Step 6: Configure Nginx

### Replace Nginx Configuration:
```bash
cp nginx.conf /etc/nginx/sites-available/futanari.app
ln -s /etc/nginx/sites-available/futanari.app /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
```

### Edit nginx.conf for your server:
```bash
nano /etc/nginx/sites-available/futanari.app
```

### Update SSL paths (if using SSL):
```nginx
# Update these lines with your SSL certificate paths
ssl_certificate /path/to/your/ssl/certificate.crt;
ssl_certificate_key /path/to/your/ssl/private.key;
```

### Test Nginx Configuration:
```bash
nginx -t
systemctl reload nginx
```

## 🚀 Step 7: Setup Process Manager

### Install PM2:
```bash
npm install -g pm2
```

### Start Backend with PM2:
```bash
cd /var/www/api
pm2 start "python3 -m uvicorn server:app --host 0.0.0.0 --port 8001" --name futanari-api
pm2 save
pm2 startup
```

## 🔒 Step 8: SSL Certificate Setup

### Option A: Let's Encrypt (Free):
```bash
# Install certbot
apt install certbot python3-certbot-nginx

# Get certificate
certbot --nginx -d futanari.app -d www.futanari.app
```

### Option B: ShockHosting SSL:
1. **Order SSL** from ShockHosting
2. **Upload certificate** files
3. **Update nginx.conf** with certificate paths

## 🔥 Step 9: Firewall Configuration

### Configure UFW:
```bash
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
```

## ✅ Step 10: Test Your Website

### Check Services:
```bash
systemctl status nginx
systemctl status mongodb
pm2 status
```

### Test Website:
1. **Visit**: https://futanari.app
2. **Check**: Auto-rotating gallery works
3. **Test**: All CTA buttons link to lovescape.com
4. **Verify**: Mobile responsiveness

## 🔍 Troubleshooting

### Common Issues:

#### Website Not Loading:
```bash
# Check nginx logs
tail -f /var/log/nginx/error.log

# Check if nginx is running
systemctl status nginx
```

#### API Not Working:
```bash
# Check PM2 logs
pm2 logs futanari-api

# Restart API
pm2 restart futanari-api
```

#### Database Issues:
```bash
# Check MongoDB status
systemctl status mongodb

# Restart MongoDB
systemctl restart mongodb
```

### Performance Optimization:
```bash
# Enable gzip compression (already in nginx.conf)
# Optimize images (already optimized in build)
# Enable caching (configured in nginx.conf)
```

## 🔄 Maintenance

### Update Website:
```bash
# Stop API
pm2 stop futanari-api

# Replace files
rm -rf /var/www/futanari.app/*
cp -r new-build/* /var/www/futanari.app/

# Update backend
cp -r new-backend/* /var/www/api/

# Restart
pm2 restart futanari-api
systemctl reload nginx
```

### Backup:
```bash
# Create backup
tar -czf futanari-backup-$(date +%Y%m%d).tar.gz /var/www/futanari.app /var/www/api

# Database backup
mongodump --db futanari_db --out /backup/mongodb/
```

## 📞 Support

### ShockHosting Support:
- **Ticket System**: Available in client area
- **Live Chat**: Available during business hours
- **Email**: support@shockhosting.com

### Your Website Status:
- **Frontend**: Static files served by Nginx
- **Backend**: Python FastAPI with PM2
- **Database**: MongoDB (local)
- **SSL**: Let's Encrypt or ShockHosting SSL

## 🎯 Expected Result

After following these steps, your futanari.app website will be:
- ✅ **Live** on https://futanari.app
- ✅ **Secure** with SSL certificate
- ✅ **Fast** with optimized static files
- ✅ **Reliable** with PM2 process management
- ✅ **Professional** with proper web server setup

**Total Setup Time**: 2-4 hours (including domain propagation)
**Monthly Cost**: $15-25 (VPS) + $10-15 (SSL if not using Let's Encrypt)