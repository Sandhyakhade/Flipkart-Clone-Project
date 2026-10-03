import Product from '../models/Product.js'

export const getProducts = async (req, res) => {
    try {
        const { category, search, sort } = req.query;
        let query = {};
        if (category) {
            query.category = category;
        }
        if (search) {
            query.$or = [
                {
                    title: {
                        $regex: search, $options: 'i'
                    }
                },
                {
                    brand: {
                        $regex: search, $options: 'i'
                    }
                },
            ];
        }
        let sortOptions = {};
        if (sort === 'price_low') {
            sortOptions.price = 1;
        } else if (sort === 'price_high') {
            sortOptions.price = -1;
        }
        else {
            sortOptions.createdAt = -1;
        }
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

