import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Product title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            min: [0, 'Price can not be negative'],
        },
        originalPrice: {
            type: Number,
            required: true,
        },
        discountedPercentage: {
            type: Number,
            default: 0,
        },
        category: {
            type: String,
            required: [true, 'Product category is required'],
            enum: ["Mobiles", "Electronics", "Fashion", "Home", "Appliances", "Beauty"]
        },
        brand: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            default: 10,
        },
        rating: {
            type: Number,
            default: 4.5,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        isDealOfTheDay: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);
export default Product;