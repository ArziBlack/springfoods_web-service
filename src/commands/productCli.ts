import { Command } from "commander";
import { connectDB } from "../config/db";
import { blue, green, grey, magenta, red } from "colors";
import Table from "cli-table3";
import { Product } from "../models/product.model";

const program = new Command();

// CREATE A PRODUCT
program
  .command("create")
  .description("create a product")
  .requiredOption("--category_id <category_id>", "category id")
  .requiredOption("--name <name>", "name of product")
  .requiredOption("--featured <featured>", "if a product is featured or not")
  .requiredOption("--price <price>", "initial price for the product")
  .requiredOption(
    "--discount <discount>",
    "discount percent for the product price"
  )
  .requiredOption("--final_price <final_price>", "final price for a product")
  .requiredOption("--sku <sku>", "store keeping unit tracking code")
  .requiredOption("--stock <stock>", "if product stock is availble")
  .requiredOption("--product_image <product_image>", "image for the product")
  .requiredOption("--desc <description>", "description for a product")
  .requiredOption("--weight <weight>", "weight for the product")
  .requiredOption("--height <height>", "height for the product")
  .requiredOption("--width <width>", "width for the product")
  .requiredOption("--depth <depth>", "depth for the product")
  .requiredOption(
    "--size_1 <size_1>",
    "sizes for the product 'M' for medium, 'L' for large, 'S' for small"
  )
  .requiredOption(
    "--size_2 <size_2>",
    "sizes for the product 'M' for medium, 'L' for large, 'S' for small"
  )
  .requiredOption(
    "--tag_1 <tag_1>",
    "an array of strings of tags for the product"
  )
  .requiredOption(
    "--tag_2 <tag_2>",
    "an array of strings of tags for the product"
  )
  .action(async (options) => {
    try {
      console.table(options);
      console.log(blue("Starting the server..."));
      console.log(magenta("loading up database..."));
      await connectDB();
      console.log(grey("updating entries..."));

      const height = options.height;
      const width = options.width;
      const depth = options.depth;
      const size_1 = options.size_1;
      const size_2 = options.size_2;
      const tag_1 = options.tag_1;
      const tag_2 = options.tag_2;

      const product = await new Product({
        category_id: options.category_id,
        category: options.category_id,
        name: options.name,
        featured: options.featured,
        price: parseInt(options.price),
        discount: parseInt(options.discount),
        final_price: parseInt(options.final_price),
        sku: options.sku,
        stock: options.stock,
        product_image: options.product_image,
        description: options.description,
        weight: parseInt(options.weight),
        dimensions: { height, width, depth },
        sizes: [size_1, size_2],
        tags: [tag_1, tag_2],
        vendor_id: options.category_id,
      });
      const saved = await product.save();
      const table = new Table({
        head: ["Field", "Value"],
        colWidths: [25, 50],
      });
      if (!product) {
        throw new Error("Wrong Data Type or an Unknown error has occured");
      }
      table.push(
        ["category_id", saved.category_id.toString()],
        ["category_id", saved.category.toString()],
        ["name", saved.name.toString()],
        ["featured", saved.featured.toString()],
        ["price", saved.price.toString()],
        ["discount", saved.discount.toString()],
        ["final", saved.final_price.toString()],
        ["sku", saved.sku.toString()],
        ["stock", saved.stock.toString()],
        ["image", saved.product_image.toString()],
        ["desc", options.description?.toString()],
        ["weight", saved.weight.toString()],
        ["dimesions", saved.dimensions.toString()],
        ["sizes", [options.size_1, options.size_2].toString()],
        ["tags", [options.tag_1, options.tag_2].toString()]
      );

      console.log(table.toString());
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        console.log(error?.message);
      }
    } finally {
      console.log(green("Command succeeded sucessfully..."));
      process.exit(1);
    }
  });

// GET ALL PRODUCTS...
program
  .command("get")
  .description("Fetch all products...")
  .action(async () => {
    try {
      console.log(blue("Starting the server..."));
      console.log(magenta("loading up database..."));
      await connectDB();
      console.log(grey("updating entries..."));
      const products = await Product.find();
      const products_no = await Product.countDocuments();
      console.log(products);
      console.log(
        "Total products are ",
        green(products_no.toString()),
        " in number"
      );
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        console.log(red(error?.message));
      }
    } finally {
      console.log(green("Command succeeded sucessfully..."));
      process.exit(1);
    }
  });

program.parse(process.argv);
