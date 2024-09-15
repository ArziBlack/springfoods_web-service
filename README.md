
---

# Springfoods Web Service API Documentation

## Base URL
```
https://springfoods-web-service.onrender.com
```

## Endpoints

### Server Status
- **GET** `/v1/health-check`
  - **Description**: Check the status of the server.

### Auth Routes
- **POST** `/v1/api/auth/signup`
  - **Description**: Create a new user account.

- **POST** `/v1/api/auth/signin`
  - **Description**: Authenticate a user and return a token.

- **GET** `/v1/api/auth/verify/:email/:token`
  - **Description**: Verify the user's email address using the provided token.

### Category (Customer)
- **GET** `/v1/api/category`
  - **Description**: Retrieve all categories.

- **GET** `/v1/api/category/:name`
  - **Description**: Retrieve a category by its name.

### Products
- **GET** `/v1/api/products`
  - **Description**: Retrieve all products.

- **GET** `/v1/api/products/category/:id`
  - **Description**: Retrieve all products under a specific category.

- **GET** `/v1/api/products/reviews/:product_id`
  - **Description**: Retrieve all reviews for a specific product.

- **POST** `/v1/api/products/review/:user_id/:product_id`
  - **Description**: Submit a review for a product.

- **GET** `/v1/api/products/:id`
  - **Description**: Retrieve a product by its ID.

### Cart
- **GET** `/v1/api/cart/:user_id`
  - **Description**: Retrieve the cart for a specific user.

- **POST** `/v1/api/cart/add/:cart_id`
  - **Description**: Add a product to the cart.

- **PUT** `/v1/api/cart/:user_id/:product_id`
  - **Description**: Remove a product from the cart.

### Order
- **POST** `/v1/api/order`
  - **Description**: Place an order.

### Review
- **POST** `/v1/api/add/:id`
  - **Description**: Create a review (note: endpoint might need clarification).

### Payment
- **POST** `/v1/api/payment`
  - **Description**: Verify payment (extended functionality).

### Admin Routes
- **POST** `/v1/api/cat`
  - **Description**: Create a new category.

- **POST** `/v1/api/review`
  - **Description**: Create a new review.

- **POST** `/v1/api/lovette/admin`
  - **Description**: Create a new admin user.

---