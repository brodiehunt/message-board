const app = require('./app');
const {connectDB} = require('./config/dbcon');
connectDB();
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));