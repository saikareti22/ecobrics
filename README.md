# EcoBricks E-Commerce Platform

A full-stack e-commerce website for selling sustainable bricks made from textile waste.

## Features

### Frontend
- Modern, responsive design
- Product catalog with real-time inventory
- Shopping cart functionality
- Checkout system
- Contact form
- Real-time statistics dashboard
- Smooth animations and transitions

### Backend (Node.js/Express)
- RESTful API
- Product management
- Cart operations (add, remove, clear)
- Order processing
- Contact form handling
- Quote generation with bulk discounts
- Statistics tracking

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Data Storage**: In-memory (can be upgraded to MongoDB)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. For development with auto-reload:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `POST /api/cart/add` - Add item to cart
- `GET /api/cart` - Get cart contents
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order

### Other
- `POST /api/contact` - Submit contact form
- `POST /api/quote` - Get bulk order quote
- `GET /api/stats` - Get platform statistics

## Bulk Pricing

- 100-499 units: 5% discount
- 500-999 units: 10% discount
- 1000+ units: 15% discount

## Project Structure

```
ecobricks-ecommerce/
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # Styling
│   └── app.js          # Frontend JavaScript
├── server.js           # Backend server
├── package.json        # Dependencies
└── README.md          # Documentation
```

## Future Enhancements

- MongoDB integration for persistent storage
- User authentication and accounts
- Payment gateway integration (Stripe)
- Email notifications
- Admin dashboard
- Product reviews and ratings
- Advanced search and filtering
- Order tracking
- Inventory management system

## License

ISC
