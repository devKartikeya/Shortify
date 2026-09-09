const app = require("./app");
const connectDB = require('./configurations/database');

const PORT = process.env.PORT || 3000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});