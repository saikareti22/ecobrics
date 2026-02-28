const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory database (replace with MongoDB in production)
let products = [
    {
        id: 1,
        name: 'Standard EcoBrick',
        description: '230mm x 110mm x 75mm',
        price: 25,
        specs: {
            compressiveStrength: '7.5 MPa',
            weight: '2.8 kg',
            dimensions: '230mm x 110mm x 75mm'
        },
        stock: 10000,
        image: '/images/standard-brick.jpg'
    },
    {
        id: 2,
        name: 'Premium EcoBrick',
        description: '230mm x 110mm x 75mm',
        price: 35,
        specs: {
            compressiveStrength: '10 MPa',
            weight: '3.0 kg',
            dimensions: '230mm x 110mm x 75mm'
        },
        stock: 8000,
        image: '/images/premium-brick.jpg'
    },
    {
        id: 3,
        name: 'Insulated EcoBrick',
        description: '230mm x 110mm x 100mm',
        price: 45,
        specs: {
            thermalResistance: 'R-3.5',
            weight: '2.5 kg',
            dimensions: '230mm x 110mm x 100mm'
        },
        stock: 5000,
        image: '/images/insulated-brick.jpg'
    }
];

let orders = [];
let cart = [];
let contacts = [];
let users = [];

// Authentication Routes

// Signup
app.post('/api/auth/signup', (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Name, email, and password are required'
        });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: 'Email already registered'
        });
    }

    const user = {
        id: users.length + 1,
        name,
        email,
        phone,
        password, // In production, hash this password!
        createdAt: new Date().toISOString()
    };

    users.push(user);

    res.json({
        success: true,
        message: 'Account created successfully',
        data: { userId: user.id }
    });
});

// Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }

    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }

    // Create a simple token (in production, use JWT)
    const token = `token_${user.id}_${Date.now()}`;

    res.json({
        success: true,
        message: 'Login successful',
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone
            },
            token
        }
    });
});

// Get user profile
app.get('/api/auth/profile', (req, res) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'Not authenticated'
        });
    }

    // Extract user ID from token (simplified)
    const userId = parseInt(authHeader.split('_')[1]);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    res.json({
        success: true,
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone
        }
    });
});

// Routes

// Get all products
app.get('/api/products', (req, res) => {
    res.json({
        success: true,
        data: products
    });
});

// Get single product
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
    res.json({
        success: true,
        data: product
    });
});

// Add to cart
app.post('/api/cart/add', (req, res) => {
    const { productId, quantity } = req.body;
    
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }

    if (quantity > product.stock) {
        return res.status(400).json({
            success: false,
            message: 'Insufficient stock'
        });
    }

    const existingItem = cart.find(item => item.productId === parseInt(productId));
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: cart.length + 1,
            productId: parseInt(productId),
            product: product,
            quantity: quantity
        });
    }

    res.json({
        success: true,
        message: 'Product added to cart',
        data: cart
    });
});

// Get cart
app.get('/api/cart', (req, res) => {
    const cartWithTotal = {
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
        itemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
    };
    
    res.json({
        success: true,
        data: cartWithTotal
    });
});

// Remove from cart
app.delete('/api/cart/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    cart = cart.filter(item => item.id !== itemId);
    
    res.json({
        success: true,
        message: 'Item removed from cart',
        data: cart
    });
});

// Clear cart
app.delete('/api/cart', (req, res) => {
    cart = [];
    res.json({
        success: true,
        message: 'Cart cleared'
    });
});

// Create order
app.post('/api/orders', (req, res) => {
    const { customerInfo, items, total, paymentMethod, paymentStatus } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Cart is empty'
        });
    }

    // Check stock availability
    for (let item of items) {
        const product = products.find(p => p.id === item.productId);
        if (!product || product.stock < item.quantity) {
            return res.status(400).json({
                success: false,
                message: `Insufficient stock for ${product ? product.name : 'product'}`
            });
        }
    }

    // Update stock
    items.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
            product.stock -= item.quantity;
        }
    });

    const order = {
        id: orders.length + 1,
        orderNumber: `EB${Date.now()}`,
        customerInfo,
        items,
        total,
        paymentMethod: paymentMethod || 'cod',
        paymentStatus: paymentStatus || 'pending',
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    orders.push(order);
    cart = []; // Clear cart after order

    res.json({
        success: true,
        message: 'Order placed successfully',
        data: order
    });
});

// Get all orders
app.get('/api/orders', (req, res) => {
    res.json({
        success: true,
        data: orders
    });
});

// Get single order
app.get('/api/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found'
        });
    }
    res.json({
        success: true,
        data: order
    });
});

// Contact form submission
app.post('/api/contact', (req, res) => {
    const { name, email, phone, company, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Name, email, and message are required'
        });
    }

    const contact = {
        id: contacts.length + 1,
        name,
        email,
        phone,
        company,
        message,
        createdAt: new Date().toISOString()
    };

    contacts.push(contact);

    res.json({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
        data: contact
    });
});

// Get quote
app.post('/api/quote', (req, res) => {
    const { name, email, phone, productId, quantity } = req.body;

    const product = products.find(p => p.id === parseInt(productId));
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }

    const basePrice = product.price * quantity;
    const discount = quantity >= 1000 ? 0.15 : quantity >= 500 ? 0.10 : quantity >= 100 ? 0.05 : 0;
    const finalPrice = basePrice * (1 - discount);

    const quote = {
        id: Date.now(),
        customerInfo: { name, email, phone },
        product: product.name,
        quantity,
        basePrice: basePrice.toFixed(2),
        discount: (discount * 100).toFixed(0) + '%',
        finalPrice: finalPrice.toFixed(2),
        pricePerUnit: (finalPrice / quantity).toFixed(2),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    res.json({
        success: true,
        message: 'Quote generated successfully',
        data: quote
    });
});

// Statistics endpoint
app.get('/api/stats', (req, res) => {
    const stats = {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
        totalBricksSold: orders.reduce((sum, order) => {
            return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
        }, 0),
        textileWasteRecycled: orders.reduce((sum, order) => {
            return sum + order.items.reduce((itemSum, item) => itemSum + (item.quantity * 2), 0);
        }, 0)
    };

    res.json({
        success: true,
        data: stats
    });
});

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api`);
});
