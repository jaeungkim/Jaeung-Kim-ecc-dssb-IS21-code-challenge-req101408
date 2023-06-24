const productsController = require("../controllers/products.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - productId
 *         - productName
 *         - productOwnerName
 *         - developers
 *         - scrumMasterName
 *         - startDate
 *         - methodology
 *       properties:
 *         productId:
 *           type: number
 *           description: The unique ID of the product.
 *         productName:
 *           type: string
 *           description: The name of the product.
 *         productOwnerName:
 *           type: string
 *           description: The name of the product owner.
 *         developers:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of developer names working on the product.
 *         scrumMasterName:
 *           type: string
 *           description: The name of the scrum master for the product.
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the project in ISO 8601 format (YYYY-MM-DD).
 *         methodology:
 *           type: string
 *           enum: [Agile, Waterfall]
 *           description: The development methodology used for the product (either "Agile" or "Waterfall").
 */

module.exports = (app) => {
  // Set headers for CORS and caching
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Cache-Control", "no-store,no-cache,must-revalidate");
    next();
  });

  /**
   * @swagger
   * /api/product:
   *   get:
   *     summary: Retrieve a list of products
   *     tags: [Products]
   *     responses:
   *       200:
   *         description: A list of products
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Product'
   */

  app.get("/api/product", productsController.getAllProducts);

  /**
   * @swagger
   * /api/product/{productId}:
   *   get:
   *     summary: Retrieve a product by ID
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: productId
   *         schema:
   *           type: integer
   *         required: true
   *         description: The product ID
   *     responses:
   *       200:
   *         description: A product object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       404:
   *         description: Product not found
   *       500:
   *         description: Server error
   */

  app.get("/api/product/:productId", productsController.getProductById);

  /**
   * @swagger
   * /api/product/addProduct:
   *   post:
   *     summary: Add a new product
   *     tags: [Products]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Product'
   *     responses:
   *       201:
   *         description: Product added successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       500:
   *         description: Server error
   */
  app.post("/api/product/addProduct", productsController.addProduct);

  /**
   * @swagger
   * /api/product/{productId}:
   *   put:
   *     summary: Update a product by ID
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: productId
   *         schema:
   *           type: integer
   *         required: true
   *         description: The product ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Product'
   *     responses:
   *       200:
   *         description: Product updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       404:
   *         description: Product not found
   *       500:
   *         description: Server error
   */
  app.put("/api/product/:productId", productsController.updateProduct);
};
