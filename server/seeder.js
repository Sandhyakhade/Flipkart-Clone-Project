import dotenv from 'dotenv'
import connectDB from './config/db.js'
import Product from './models/Product.js'
import Products from './data/productsData.js'
dotenv.config();
connectDB();
const importData = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(Products);
        console.log("Sample flipkart product successfully seeded in mongodb atlas.")
        process.exit(0);
    }
    catch (err) {
        console.log(`data seeding failed:${err.message}`)
        process.exit(1);
    }
};
importData();
