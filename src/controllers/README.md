## PRODUCTS

<!-- GET ALL PRODUCTS -->
GET /products?page=2&limit=10

<!-- GET PRODUCTS BY CATEGORY NAME -->
GET /products/category/electronics

<!-- GET PRODUCTS BY REVIEWS -->
GET /products/reviews?sortBy=average_rating&order=desc

<!-- UPDATE A PRODUCT -->
PUT /products/update/60c72b2f9b1e8b001c8e4f24
{
  "name": "Updated Product Name",
  "price": 1200,
  "stock": 30
}

<!-- DELETE A PRODUCT -->
DELETE /products/60c72b2f9b1e8b001c8e4f24
