const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Payment verification route
app.post('/verify-payment', (req, res) => {
    const { id, host } = req.body;

    // For demo purposes, we are comparing id = 1 and host with a specific value.
    // You can modify the host verification logic as per your needs.
    if (id === 1 && host === 'localhost') {
        res.json({ status: 'success', message: 'Payment Verified Successfully' });
    } else {
        res.status(400).json({ status: 'error', message: 'Verification Failed' });
    }
});

// Serve the HTML file as the entry point
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
