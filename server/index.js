import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/products',productRoutes)

app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Flipkart API backend" })
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running in developent mode on http://localhost:${PORT}`)
});