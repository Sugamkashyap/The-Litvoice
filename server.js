const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const path = require("path")

app.use(express.json());
app.use(cors());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Read blogs from a JSON file
app.get('/api/blogs', (req, res) => {
    fs.readFile('blogs.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send("Error reading file");
        res.json(JSON.parse(data));
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

// Add a new blog post
app.post('/api/blogs', (req, res) => {
    fs.readFile('blogs.json', 'utf8', (err, data) => {
        let blogs = JSON.parse(data || '[]');
        blogs.push(req.body);
        fs.writeFile('blogs.json', JSON.stringify(blogs, null, 2), () => {
            res.json({ message: "Blog added successfully!" });
        });
    });
});

// Start the server
app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
