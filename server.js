const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname)));

// Fallback to index.html for any unmatched route
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(5000, "0.0.0.0", () => console.log("Agrostav server listening on port 5000"));
