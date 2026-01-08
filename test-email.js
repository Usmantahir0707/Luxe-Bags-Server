// Test email functionality
import { sendOrderConfirmationEmail } from './src/utils/emailService.js';

// Create a test order object
const testOrder = {
  customerEmail: 'u.t.032276444668@gmail.com', // Your email for testing
  customerName: 'Test Customer',
  _id: '507f1f77bcf86cd799439011', // Test ObjectId
  products: [
    {
      product: {
        name: 'Test Bag',
        price: 99.99
      },
      quantity: 2,
      color: 'Black',
      size: 'M'
    }
  ],
  totalPrice: 199.98,
  shippingAddress: {
    address: '123 Test Street',
    city: 'Test City',
    postalCode: '12345',
    country: 'Test Country'
  },
  createdAt: new Date()
};

console.log('Testing email functionality...');

try {
  await sendOrderConfirmationEmail(testOrder);
  console.log('✅ Email sent successfully!');
} catch (error) {
  console.error('❌ Email failed:', error.message);
}
