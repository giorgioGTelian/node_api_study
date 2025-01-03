const express = require("express");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/books");

const app = express();
app.use(bodyParser.json());
app.use("/books", bookRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
