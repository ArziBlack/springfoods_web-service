import { green, red } from "colors";

export const res = {
  status: (statusCode: number) => ({
    json: (response: object) => {
      console.log(`Status: ${statusCode}`);
      console.table(response);
    },
  }),
};

export const next = (err?: any) => {
  if (err) {
    console.log(red("Error passed to next()"), err);
    console.log(red("Handling Error using the next() middleware..."));
  } else {
    console.log(green("next() middleware called without any Error..."));
  }
};
