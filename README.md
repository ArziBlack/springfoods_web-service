"# springfoods_web-service"


# server status
GET /v1/health-check

## Auth Routes
signup
POST /v1/api/auth/signup

signin
POST /v1/api/auth/signin

verify email
GET /v1/api/auth/verify/:email/:token

# Category (customer)
all categories
GET /v1/api/category

category by name
GET /v1/api/category/:name

# Products
all products
GET /v1/api/products

all products under a category name
GET /v1/api/products/category/:id

products by reviews
GET /v1/api/products/reviews/:product_id

review a product
POST v1/api/products/review/:user_id/:product_id

get product by ID
GET /v1/api/products/:id

# Cart
my cart
GET /v1/api/cart/:user_id

add to cart
POST /v1/api/cart/add/:cart_id

remove from cart
PUT /v1/api/cart/:user_id/:product_id

# Order
/v1/api/order

# review
create a review
POST /v1/api/add/:id

# payment extended (verification only)
/v1/api/payment

# Admin
create category
/v1/api/cat
/v1/api/review
/v1/api/lovette/admin