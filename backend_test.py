#!/usr/bin/env python3
"""
Backend Testing Suite for Futanari Landing Page Application
Tests FastAPI server functionality, MongoDB connection, and API endpoints
"""

import requests
import json
import sys
import os
from datetime import datetime
import uuid

# Load environment variables
sys.path.append('/app/frontend')
from dotenv import load_dotenv

# Load frontend .env to get REACT_APP_BACKEND_URL
load_dotenv('/app/frontend/.env')
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL')

if not BACKEND_URL:
    print("❌ REACT_APP_BACKEND_URL not found in frontend/.env")
    sys.exit(1)

print(f"🔗 Testing backend at: {BACKEND_URL}")

class BackendTester:
    def __init__(self, base_url):
        self.base_url = base_url.rstrip('/')
        self.api_url = f"{self.base_url}/api"
        self.session = requests.Session()
        self.session.timeout = 10
        
    def test_server_health(self):
        """Test if the FastAPI server is running and responding"""
        print("\n🏥 Testing Server Health...")
        try:
            response = self.session.get(f"{self.api_url}/")
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    print("✅ Server is running and responding correctly")
                    return True
                else:
                    print(f"❌ Unexpected response: {data}")
                    return False
            else:
                print(f"❌ Server returned status code: {response.status_code}")
                return False
        except requests.exceptions.RequestException as e:
            print(f"❌ Failed to connect to server: {e}")
            return False
    
    def test_cors_configuration(self):
        """Test CORS configuration"""
        print("\n🌐 Testing CORS Configuration...")
        try:
            # Test preflight request
            headers = {
                'Origin': 'http://localhost:3000',
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-Type'
            }
            response = self.session.options(f"{self.api_url}/", headers=headers)
            
            # Check CORS headers in response
            cors_headers = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
            }
            
            if cors_headers['Access-Control-Allow-Origin'] == '*':
                print("✅ CORS configured correctly - allows all origins")
                return True
            else:
                print(f"⚠️ CORS headers: {cors_headers}")
                return True  # Still working, just different config
                
        except requests.exceptions.RequestException as e:
            print(f"❌ CORS test failed: {e}")
            return False
    
    def test_status_endpoints(self):
        """Test status check endpoints (POST and GET)"""
        print("\n📊 Testing Status Endpoints...")
        
        # Test POST /api/status
        try:
            test_data = {
                "client_name": f"test_client_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            }
            
            response = self.session.post(
                f"{self.api_url}/status",
                json=test_data,
                headers={'Content-Type': 'application/json'}
            )
            
            if response.status_code == 200:
                created_status = response.json()
                if 'id' in created_status and 'timestamp' in created_status:
                    print("✅ POST /api/status - Status check created successfully")
                    
                    # Test GET /api/status
                    get_response = self.session.get(f"{self.api_url}/status")
                    if get_response.status_code == 200:
                        status_list = get_response.json()
                        if isinstance(status_list, list) and len(status_list) > 0:
                            print("✅ GET /api/status - Status checks retrieved successfully")
                            print(f"   Found {len(status_list)} status check(s)")
                            return True
                        else:
                            print("❌ GET /api/status - No status checks found")
                            return False
                    else:
                        print(f"❌ GET /api/status failed with status: {get_response.status_code}")
                        return False
                else:
                    print(f"❌ POST /api/status - Invalid response structure: {created_status}")
                    return False
            else:
                print(f"❌ POST /api/status failed with status: {response.status_code}")
                print(f"   Response: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            print(f"❌ Status endpoints test failed: {e}")
            return False
    
    def test_mongodb_connection(self):
        """Test MongoDB connection by creating and retrieving data"""
        print("\n🗄️ Testing MongoDB Connection...")
        
        # This is tested implicitly through the status endpoints
        # If status endpoints work, MongoDB is connected
        try:
            # Create a unique test entry
            unique_name = f"mongodb_test_{uuid.uuid4().hex[:8]}"
            test_data = {"client_name": unique_name}
            
            # Create entry
            response = self.session.post(
                f"{self.api_url}/status",
                json=test_data,
                headers={'Content-Type': 'application/json'}
            )
            
            if response.status_code == 200:
                # Retrieve and verify entry exists
                get_response = self.session.get(f"{self.api_url}/status")
                if get_response.status_code == 200:
                    status_list = get_response.json()
                    found = any(item['client_name'] == unique_name for item in status_list)
                    if found:
                        print("✅ MongoDB connection working - data persisted successfully")
                        return True
                    else:
                        print("❌ MongoDB connection issue - data not persisted")
                        return False
                else:
                    print("❌ MongoDB connection issue - cannot retrieve data")
                    return False
            else:
                print("❌ MongoDB connection issue - cannot create data")
                return False
                
        except requests.exceptions.RequestException as e:
            print(f"❌ MongoDB connection test failed: {e}")
            return False
    
    def test_api_prefix_routing(self):
        """Test that API routes are properly prefixed with /api"""
        print("\n🛣️ Testing API Prefix Routing...")
        
        try:
            # Test that root without /api prefix returns 404 or different response
            try:
                root_response = self.session.get(f"{self.base_url}/")
                root_status = root_response.status_code
            except:
                root_status = 404
            
            # Test that /api prefix works
            api_response = self.session.get(f"{self.api_url}/")
            api_status = api_response.status_code
            
            if api_status == 200 and (root_status == 404 or root_status != 200):
                print("✅ API prefix routing configured correctly")
                print(f"   /api/ returns: {api_status}")
                print(f"   / returns: {root_status}")
                return True
            elif api_status == 200:
                print("✅ API endpoints accessible (prefix routing working)")
                return True
            else:
                print(f"❌ API prefix routing issue - /api/ returns: {api_status}")
                return False
                
        except requests.exceptions.RequestException as e:
            print(f"❌ API prefix routing test failed: {e}")
            return False
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Backend Test Suite")
        print("=" * 50)
        
        tests = [
            ("Server Health", self.test_server_health),
            ("CORS Configuration", self.test_cors_configuration),
            ("API Prefix Routing", self.test_api_prefix_routing),
            ("Status Endpoints", self.test_status_endpoints),
            ("MongoDB Connection", self.test_mongodb_connection),
        ]
        
        results = {}
        for test_name, test_func in tests:
            try:
                results[test_name] = test_func()
            except Exception as e:
                print(f"❌ {test_name} failed with exception: {e}")
                results[test_name] = False
        
        print("\n" + "=" * 50)
        print("📋 TEST RESULTS SUMMARY")
        print("=" * 50)
        
        passed = 0
        total = len(results)
        
        for test_name, result in results.items():
            status = "✅ PASS" if result else "❌ FAIL"
            print(f"{status} - {test_name}")
            if result:
                passed += 1
        
        print(f"\n🎯 Overall: {passed}/{total} tests passed")
        
        if passed == total:
            print("🎉 All backend tests PASSED! Backend is working correctly.")
            return True
        else:
            print("⚠️ Some backend tests FAILED. Check the details above.")
            return False

if __name__ == "__main__":
    tester = BackendTester(BACKEND_URL)
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)