const express = require('express'); 
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6