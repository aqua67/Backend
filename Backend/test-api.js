const API_BASE = 'http://localhost:5000';

async function testAPI(endpoint, method = 'GET', data = null) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };
    if (data) options.body = JSON.stringify(data);
    
    const response = await fetch(`${API_BASE}${endpoint}`, options);
    const result = await response.json();
    
    console.log(`✅ ${method} ${endpoint}:`, response.status, result);
    return result;
  } catch (error) {
    console.log(`❌ ${method} ${endpoint}:`, error.message);
  }
}

async function runTests() {
  console.log('🧪 Testing All API Endpoints...\n');
  
  // 1. Test server status
  await testAPI('/');
  
  // 2. Test user registration
  await testAPI('/api/auth/register', 'POST', {
    name: 'Test User',
    email: 'test@example.com',
    password: 'test123'
  });
  
  // 3. Test user login
  await testAPI('/api/auth/login', 'POST', {
    email: 'test@example.com',
    password: 'test123'
  });
  
  // 4. Test admin login
  await testAPI('/api/auth/login', 'POST', {
    email: 'admin@astrabeauty.com',
    password: 'Admin@123'
  });
  
  // 5. Test products
  await testAPI('/api/product');
  
  // 6. Add sample products
  await testAPI('/api/product/sample', 'POST');
  
  // 7. Test products again
  await testAPI('/api/product');
  
  // 8. Test admin stats
  await testAPI('/api/admin/stats');
  
  // 9. Test orders
  await testAPI('/api/admin/orders');
  
  // 10. Create test order
  await testAPI('/api/order/create', 'POST', {
    customerName: 'Test Customer',
    customerEmail: 'customer@test.com',
    items: [{name: 'Test Product', price: 500, quantity: 1}],
    total: 500
  });
  
  console.log('\n🏁 API Testing Complete!');
}

runTests();