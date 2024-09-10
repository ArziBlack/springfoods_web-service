import { Command } from "commander";
import Table from "cli-table3";
import { connectDB } from "../config/db";
import { Category } from "../models/category.model";
import { blue, green, magenta, red } from "colors";
import { grey } from "colors";
import { get_one_category } from "../controllers/category.controller";
import { res } from "../utils/http";

const program = new Command();

program
  .command("create-category")
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
        ["name", saved_category.image],
        ["name", saved_category.slug]
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

program
  .command("get-categories")
  .description("Fetch all categories...")
  .action(async () => {
    try {
      console.log(blue("Starting the server..."));
      console.log(magenta("loading up database..."));
      await connectDB();
      console.log(grey("updating entries..."));
      const categories = await Category.find();
      console.table(categories);
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

program
  .command("cat-name")
  .description("get a category by name")
  .option("--name <string>", "category name")
  .action(async (options) => {
    await connectDB();

    const req = {
      params: { options },
    };

    const next = () => {};

    await get_one_category(req as any, res as any, next as any);
  });

program.parse(process.argv);
