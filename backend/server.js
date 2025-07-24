require("dotenv").config(); 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const authRoutes = require("./routes/Auth"); 
const userRoutes=require('./routes/userRoutes');
const privateRoutes = require("./routes/privateRoutes");
const lawyerRoutes=require("./routes/lawerRoutes");
const bodyParser = require("body-parser");

const app = express();

const MONGO_URI =
  process.env.MONGO_URI;

const PORT = process.env.PORT || 5000; 

app.use(cors()); 
app.use(bodyParser.json());
app.use("/api/auth", authRoutes); 
app.use("/private-api", privateRoutes);
app.use("/api", userRoutes);
app.use("/api/lawyer",lawyerRoutes);

app.get("/", (req, res) => {
  res.send("🟢 LegalConnect API is running!");
});

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  });


