const express = require('express');
const cors = require("cors");
const connectDB = require('./configurations/database');
const app = express();
const PORT = process.env.PORT || 3000;
const userRouter = require("./users/users.route");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure whitelist options
const corsOptions = {
  origin: ['http://localhost:5173'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent with requests if needed
};

// Apply restricted CORS globally
app.use(cors(corsOptions));

connectDB();

app.use("/users", userRouter);

app.get('/', (req, res) => {
  res.send('Hello from Express backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:PORT`);
});