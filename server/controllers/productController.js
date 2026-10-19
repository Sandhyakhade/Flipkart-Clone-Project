import Product from '../models/Product.js'

export const getProducts = async (req, res) => {
    try {
        // Step 1: Read all query parameters from the URL
        // Example URL: /api/products?category=Mobiles&minPrice=500&maxPrice=50000&sort=price_low
        const { category, search, sort, minPrice, maxPrice } = req.query;

        // Step 2: Build the MongoDB filter object
        let query = {};

        // Filter by category if provided
        if (category) {
            query.category = category;
        }

        // Search in title or brand using regex (case-insensitive)
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } },
            ];
        }

        // Price Range Filter using MongoDB $gte (>=) and $lte (<=)
        // Example: minPrice=500, maxPrice=5000
        // MongoDB query: { price: { $gte: 500, $lte: 5000 } }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice); // convert string to number
            if (maxPrice) query.price.$lte = Number(maxPrice); // convert string to number
        }

        // Step 3: Build sort options
        let sortOptions = {};
        if (sort === 'price_low') {
            sortOptions.price = 1;       // ascending (low to high)
        } else if (sort === 'price_high') {
            sortOptions.price = -1;      // descending (high to low)
        } else if (sort === 'rating') {
            sortOptions.rating = -1;     // highest rated first
        } else {
            sortOptions.createdAt = -1;  // newest first (default)
        }

        // Step 4: Run the database query with filters and sort
        const products = await Product.find(query).sort(sortOptions);
        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'server error while fetching products',
            err:err.message
        })
    }
};

export const getProductsById = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        res.status(200).json({
            success: true,
            product,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            meassage: 'invalid product id or server id',
            err:err.message
        })
    }
}

