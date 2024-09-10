export const res = {
  status: (statusCode: number) => ({
    json: (response: object) => {
      console.log(`Status: ${statusCode}`);
      console.table(response);
    },
  }),
};
