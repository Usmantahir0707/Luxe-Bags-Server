
# Luxe Bags API

This project is a Node.js backend server for the Luxe Bags e-commerce platform, built using Express and MongoDB. It provides a complete RESTful API for managing users, orders, products, and uploads, including both public endpoints (accessible by customers) and admin-only endpoints for store management.

The API is designed to be modular and scalable, with separate routes, controllers, and models, making it easy to extend or integrate with any frontend application. All routes follow standard REST conventions, and protected routes use JWT authentication for secure access.

## Features

- ✅ User authentication with email verification
- ✅ Password reset functionality
- ✅ Social login (Google & Facebook) - *optional, server works without it*
- ✅ Product management (CRUD operations)
- ✅ Order management with status tracking
- ✅ File uploads via Cloudinary
- ✅ Admin panel functionality
- ✅ Email notifications with beautiful templates

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Gmail account (for email functionality)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd luxe-bags-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database
   MONGO_URI=mongodb+srv://your-mongodb-connection-string

   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key

   # Cloudinary (for image uploads)
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret

   # Email Configuration (for verification emails)
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-gmail-app-password

   # URLs
   BACKEND_URL=https://your-backend-url.com
   FRONTEND_URL=https://your-frontend-url.com

   # Social Auth (Optional - server works without these)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   FACEBOOK_APP_ID=your-facebook-app-id
   FACEBOOK_APP_SECRET=your-facebook-app-secret
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

### Email Setup

The server uses Gmail to send verification and password reset emails. To set this up:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password: Go to Google Account → Security → 2-Step Verification → App passwords
3. Use this app password (not your regular password) for `EMAIL_PASS`

### Social Authentication (Optional)

To enable Google and Facebook login:

1. **Google OAuth:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create/select a project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `YOUR_BACKEND_URL/api/auth/google/callback`

2. **Facebook OAuth:**
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create an app
   - Add Facebook Login product
   - Add redirect URI: `YOUR_BACKEND_URL/api/auth/facebook/callback`

## API Documentation

This documentation provides a complete reference for all endpoints, including:

- HTTP method and URL
- Required headers
- Example request bodies
- Example responses
- Access level (public, protected, or admin-only)

**Note:** Social login endpoints (Google/Facebook) will return 404 if credentials are not configured.



API Documentation
////////  Auth Routes  ///////////

///////////////////////////////////////////////////////////////////////////////////////
* Register User (Public) ****

Method: POST

URL: /api/auth/register

Body (JSON):

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}


Response: Returns user object with verification message (email sent)
///////////////////////////////////////////////////////////////////////////////////////////
Verify Email (Public) ****

Method: POST

URL: /api/auth/verify-email

Body (JSON):

{
  "token": "verification_token_from_email"
}


Response: Returns verified user object with JWT token
///////////////////////////////////////////////////////////////////////////////////////////
Resend Verification Email (Public) ****

Method: POST

URL: /api/auth/resend-verification

Body (JSON):

{
  "email": "john@example.com"
}


Response: Success message
///////////////////////////////////////////////////////////////////////////////////////////
Forgot Password (Public) ****

Method: POST

URL: /api/auth/forgot-password

Body (JSON):

{
  "email": "john@example.com"
}


Response: Success message (email sent with reset link)
///////////////////////////////////////////////////////////////////////////////////////////
Reset Password (Public) ****

Method: POST

URL: /api/auth/reset-password

Body (JSON):

{
  "token": "reset_token_from_email",
  "password": "newpassword123"
}


Response: Success message
///////////////////////////////////////////////////////////////////////////////////////////
Login User (Public) ****

Method: POST

URL: /api/auth/login

Body (JSON):

{
  "email": "john@example.com",
  "password": "secret123"
}


Response: Returns user object with JWT token (requires email verification)
///////////////////////////////////////////////////////////////////////////////////////////
Google Login (Public) ****

Method: GET

URL: /api/auth/google

Response: Redirects to Google OAuth
///////////////////////////////////////////////////////////////////////////////////////////
Google OAuth Callback (Internal) ****

Method: GET

URL: /api/auth/google/callback

Response: Redirects to frontend with token
///////////////////////////////////////////////////////////////////////////////////////////
Facebook Login (Public) ****

Method: GET

URL: /api/auth/facebook

Response: Redirects to Facebook OAuth
///////////////////////////////////////////////////////////////////////////////////////////
Facebook OAuth Callback (Internal) ****

Method: GET

URL: /api/auth/facebook/callback

Response: Redirects to frontend with token
///////////////////////////////////////////////////////////////////////////////////////
Get Current User (Protected) ****

Method: GET

URL: /api/auth/me

Headers: Authorization: Bearer <token>

Response: Returns current logged-in user details
///////////////////////////////////////////////////////////////////////////////////////
Update Current User (Protected) ****

Method: PUT

URL: /api/auth/me

Headers: Authorization: Bearer <token>

Body (JSON):

{
  "name": "Updated Name",
  "email": "newemail@example.com",
  "password": "newpassword123"
}


Response: Returns updated user object
///////////////////////////////////////////////////////////////////////////////////////
Delete Current User (Protected) ****

Method: DELETE

URL: /api/auth/me

Headers: Authorization: Bearer <token>

Response: Confirmation of deletion
///////////////////////////////////////////////////////////////////////////////////////
Get All Users (Admin Only) ****

Method: GET

URL: /api/auth/users

Headers: Authorization: Bearer <admin-token>

Response: Returns all users (excluding passwords)
///////////////////////////////////////////////////////////////////////////////////////
Delete Any User (Admin Only) ****

Method: DELETE

URL: /api/auth/users/:id

Headers: Authorization: Bearer <admin-token>

Response: Confirmation of deletion
///////////////////////////////////////////////////////////////////////////////////////
Order Routes
Create Order (Public) ****

Method: POST

URL: /api/orders

Body (JSON):

{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1234567890",
  "shippingAddress": {
    "address": "123 Main Street",
    "city": "Springfield",
    "postalCode": "12345",
    "country": "USA"
  },
  "products": [
    {
      "productId": "64f0c3b2a1d4e12345abcd68",
      "quantity": 2,
      "color": "red",
      "size": "M"
    }
  ],
  "totalPrice": 199.99
}


Response: Returns created order object
///////////////////////////////////////////////////////////////////////////////////////
Cancel Order (Customer, Public) ****

Method: PUT

URL: /api/orders/:id/cancel

Headers: Authorization: optional if logged-in

Body: None

Response: Updated order with status cancelled
///////////////////////////////////////////////////////////////////////////////////////
Get Order by ID (Public) ****

Method: GET

URL: /api/orders/:id

Response: Returns order details
///////////////////////////////////////////////////////////////////////////////////////
Get All Orders (Admin Only) ****

Method: GET

URL: /api/orders

Headers: Authorization: Bearer <admin-token>

Response: Returns all orders
///////////////////////////////////////////////////////////////////////////////////////
Cancel Any Order (Admin Only) ****

Method: PUT

URL: /api/orders/:id/admin-cancel

Headers: Authorization: Bearer <admin-token>

Response: Updated order with status cancelled
///////////////////////////////////////////////////////////////////////////////////////
Update Order Status (Admin Only) ****

Method: PUT

URL: /api/orders/:id/status

Headers: Authorization: Bearer <admin-token>

Body (JSON):

{
  "status": "shipped"
}


Response: Updated order with new status
///////////////////////////////////////////////////////////////////////////////////////
Product Routes
Create Product (Admin Only) ****

Method: POST

URL: /api/products

Headers: Authorization: Bearer <admin-token>

Body (JSON):

{
  "name": "Elegant Bag",
  "description": "Leather ladies bag",
  "price": 149.99,
  "category": "Ladies Bag",
  "image": "https://cloudinary.com/image-url",
  "stock": 10,
  "colors": ["red", "black"],
  "sizes": ["S", "M", "L"],
  "isFeatured": true
}


Response: Returns created product object
///////////////////////////////////////////////////////////////////////////////////////
Get All Products (Public) ****

Method: GET

URL: /api/products

Response: Returns list of products
///////////////////////////////////////////////////////////////////////////////////////
Get Single Product (Public) ****

Method: GET

URL: /api/products/:id

Response: Returns single product details
///////////////////////////////////////////////////////////////////////////////////////
Update Product (Admin Only) ****

Method: PUT

URL: /api/products/:id

Headers: Authorization: Bearer <admin-token>

Body (JSON):

{
  "name": "Updated Product Name",
  "price": 199.99
}


Response: Returns updated product
///////////////////////////////////////////////////////////////////////////////////////
Delete Product (Admin Only) ****

Method: DELETE

URL: /api/products/:id

Headers: Authorization: Bearer <admin-token>

Response: Confirmation of deletion
///////////////////////////////////////////////////////////////////////////////////////
Upload Routes
Upload Image (Admin Only) ****

Method: POST

URL: /api/uploads

Headers: Authorization: Bearer <admin-token>

Body (form-data): Key = image, Value = file

Response: Returns uploaded image URL and public_id
