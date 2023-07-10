import { createOne } from "./dbOperations";

export const insertData = (data: any[], collectionName: string) => {
  data.forEach((item) => {
    try {
      createOne(collectionName, item);
      console.log(`--> ${collectionName} data inserted!`);
    } catch {
      console.log(`Error inserting ${collectionName} data!`);
    }
  });
};
