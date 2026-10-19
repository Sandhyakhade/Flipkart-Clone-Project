import Product from '../models/Product.js'

export const getProducts = async (req, res) => {
    try {
        const { category, search, sort, minPrice, maxPrice } = req.query;
        let query = {};

        if (category) query.category = category;

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } },
            ];
        }

        // URL params arrive as strings — convert to Number for MongoDB numeric comparison
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const sortOptions = {
            price_low:  { price: 1 },
            price_high: { price: -1 },
            rating:     { rating: -1 },
        }[sort] || { createdAt: -1 }; // default: newest first

        const products = await Product.find(query).sort(sortOptions);
        res.status(200).json({ success: true, count: products.length, products });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Server error while fetching products', error: err.message });
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

