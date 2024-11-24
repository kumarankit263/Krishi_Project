const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyAccessToken = require("../middlewares/verifyAccessToken");
const multer = require("multer");
const upload = multer();

// Add Product  //done
router.post(
  "/",
  verifyAccessToken,
  upload.single("image"),
  productController.addProduct
);

// Get Product Data By Category //done
router.get(
  "/category/:category/:lng/:lat",
  productController.getProductDataByCategory
);

// Get Product Dashboard Data By Id  //done
router.get("/dashboard/:productId", productController.getProductDashboardData);

// Get Seller Dashboard Products Data 
router.get(
  "/seller",
  verifyAccessToken,
  productController.getProductDataBySellerId
);

// Get Product Data By Id //done
router.get(
  "/getProductDataById/:productId",
  productController.getProductDataById
);

// Get Product Stocks By Id //done
router.get(
  "/getProductStocksById/:productId",
  productController.getProductStocksById
);

// Delete Product  //done
router.delete(
  "/:productId",
  verifyAccessToken,
  productController.deleteProduct
);

// Update Product //done
router.put(
  "/:productId",
  verifyAccessToken,
  upload.single("image"),
  productController.updateProduct
);

// Get main product data by id //done
router.get(
  "/mainProductData/:productId",
  productController.getMainProductDataById
);

module.exports = router;


