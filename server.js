// Create express app
const express = require("express")
const app = express()
const db = require("./database.js")

// Server port
const HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert here other API endpoints

// Gets all markers from database.
app.get("/api/raw", (req, res, next) => {
    var sql = "select * from raw"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message})
            return
        }
        res.json({
            "message": "success",
            "data": rows
        })
    })
})

// Get a specific user by ID.
app.get("/api/user/:id", (req, res, next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err,row) => {
        if (err) {
            res.status(400).json({"error":err.message})
            return
        }
        res.json({
            "message":"success",
            "data":row
        })
    })
})


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});