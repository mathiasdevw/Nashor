import express from "express"

import {
    getWishlist,
    addProductToWishlist,
    removeProductFromWishlist,
    clearWishlist,
} from "../Controller/wishlistController.js"

const router = express.Router();

router.get("/:clientId",getWishlist);
router.post("/add", addProductToWishlist);
router.post("/remove", removeProductFromWishlist);
router.delete("/clear/:clientId", clearWishlist);

export default router;