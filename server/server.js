// Import dependencies
const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const Product = require("./app/models/product.model");
const { faker } = require("@faker-js/faker");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const fs = require("fs").promises;

// Configuration
const port = 3000;
const corsOptions = { credentials: true, origin: ["http://localhost:3030"] };
const connectionString =
  "mongodb://localhost:27017/is21-jaeungkim-fullstack-db";
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "jaeungkim-fullstack API",
      version: "1.0.0",
      description:
        "API documentation for jaekim's is21-fullstack competition application",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./app/routes/products.routes.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Create and configure a new Express app instance
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger setup
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connect to the MongoDB database and seed if necessary
async function connectToDatabase() {
  try {
    await db.mongoose.connect(connectionString, mongoOptions);
    console.log("Successfully connected to MongoDB");

    const count = await Product.countDocuments();
    if (count === 0) {
      await seedProducts();
    }
  } catch (error) {
    console.error("Connection error", error);
    process.exit(1);
  }
}
async function fetchAllRepos() {
  try {
    const data = await fs.readFile("./repos.json", "utf8");
    const repos = JSON.parse(data);
    return repos;
  } catch (err) {
    console.error("Error reading file from disk:", err);
    throw err; // Re-throw the error to be caught by the caller
  }
}

async function seedProducts() {
  const numProducts = 40;
  const scrumMasters = [
    "John Smith",
    "Jane Doe",
    "Bob Johnson",
    "Sarah Lee",
    "Mike Brown",
  ];
  const developerNames = [
    "Alice Smith",
    "Bob Johnson",
    "Charlie Brown",
    "David Lee",
    "Emily Chen",
    "Frank Kim",
    "Grace Lee",
    "Henry Park",
    "Isabella Wong",
    "Jack Lee",
  ];

  const products = [];
  const repos = await fetchAllRepos();
  if (!repos) {
    console.error("Failed to fetch repositories");
    return;
  }

  for (let i = 0; i < numProducts; i++) {
    const randomRepo = repos[Math.floor(Math.random() * repos.length)];
    if (!randomRepo || !randomRepo.html_url) {
      console.error("Failed to select random repository:", randomRepo);
      continue;
    }
    const product = {
      productId: i + 1,
      productName: faker.commerce.productName(),
      productOwnerName: faker.name.fullName(),
      developers: Array.from(
        { length: faker.datatype.number({ min: 1, max: 5 }) },
        () => {
          return faker.helpers.arrayElement(developerNames);
        }
      ),
      scrumMasterName: faker.helpers.arrayElement(scrumMasters),
      startDate: faker.date.past(),
      methodology: faker.helpers.arrayElement(["Agile", "Waterfall"]),
      location: randomRepo.html_url,
    };
    products.push(product);
  }

  await Product.insertMany(products);
  console.log("Added new products");
}

connectToDatabase();

// Define a route to display a welcome message
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to jaekim's is21-fullstack competition application.",
  });
});

// Include the routes for products management
require("./app/routes/products.routes")(app);

// Start listening for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
