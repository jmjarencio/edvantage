const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware: Protects against common web vulnerabilities
app.use(helmet({
    contentSecurityPolicy: false, // Disabled to allow Firebase, Google Fonts, and Lottie CDNs
    xDownloadOptions: true,
    xFrameOptions: { action: 'deny' },
    xXssProtection: true
}));

// Hide that the server is powered by Express
app.disable('x-powered-by');

// Serve all frontend files securely from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve the application
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server successfully started on port ${PORT}`);
});
