import { Command } from "commander";
import Table from "cli-table3";
import { connectDB } from "../config/db";
import { Category } from "../models/category.model";
import { blue, green, magenta, red } from "colors";
import { grey } from "colors";

const program = new Command();

// CREATE CATEGORY
program
  .command("create")
  .description("Create a Category")
  .requiredOption(" --name <name>", "category name")
  .requiredOption("--image <image>", "category image")
  .requiredOption("--slug <slug>", "category slug")
  .action(async (options) => {
    try {
      console.table(options);

      await connectDB();

      const table = new Table({
        head: ["Field", "Value"],
        colWidths: [25, 50],
      });

      const category = new Category(options);

      const saved_category = await category.save();

      if (!saved_category) {
        throw new Error("Wrong Data Type or an Unknown error has occured");
      }

      table.push(
        ["name", saved_category.name],
        ["image", saved_category.image],
        ["slug", saved_category.slug]
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

// GET ALL CATEGORIES...
program
  .command("get")
  .description("Fetch all categories...")
  .action(async () => {
    try {
      console.log(blue("Starting the server..."));
      console.log(magenta("loading up database..."));
      await connectDB();
      console.log(grey("updating entries..."));
      const categories = await Category.find();
      console.log(categories);
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

// GET A CATEGORY
program
  .command("get-id")
  .description("get a category by name")
  .option("--name <string>", "category name")
  .action(async (options) => {
    await connectDB();

    const name = options.name;
    const req = {
      params: { name },
    };
    console.log("params: ", grey(options.name));
    console.log("fetching category called ", grey(name));
    const all = await Category.findOne({ name: name });
    console.log(all);
  });

program.parse(process.argv);
