import mongoose from 'mongoose'

const wishlistSchema = new mongoose.Schema({

    client : { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products"}],
},{timestamps:true});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;