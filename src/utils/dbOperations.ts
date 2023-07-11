import { MongoClient, ObjectId } from "mongodb";

const url = process.env.MONGODB_URL;

// NOTE: insert a new docuemnt in db
export const createOne = async (collectionName: string, data: any) => {
  const client = await MongoClient.connect(url);
  try {
    const db = client.db("vehicle");
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(data);
    const returnData = {
      status: "success",
      data: result,
    };
    console.log("result", returnData);
    return returnData;
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    client.close();
  }
};

// NOTE: find records in db
export const findData = async (
  collectionName: string,
  constraints = {},
  projection = {}
) => {
  const client = await MongoClient.connect(url);
  try {
    const db = client.db("vehicle");
    const collection = db.collection(collectionName);

    const result = collection.find(constraints).project(projection);
    const returnData = {
      status: "success",
      data: result,
    };
    console.log("result", returnData);
    return returnData;
  } catch (err) {
    console.error(err);
    const returnData = {
      status: "error",
      data: err,
    };
    return returnData;
  } finally {
    client.close();
  }
};

// NOTE: get some data by id
export const getDataById = async (collectionName: string, id: string) => {
  const client = await MongoClient.connect(url);
  try {
    const db = client.db("vehicle");
    const collection = db.collection(collectionName);

    const objectid = new ObjectId(id);
    const result = await collection.findOne({ _id: objectid });
    const returnData = {
      status: "success",
      data: result,
    };
    console.log("result", returnData);
    return returnData;
  } catch (err) {
    console.error(err);
    const returnData = {
      status: "error",
      data: err,
    };
    return returnData;
  } finally {
    client.close();
  }
};

// NOTE: find data by some constraints
export const findByConstraints = async (
  collectionName: string,
  constraints = {}
) => {
  const client = await MongoClient.connect(url);
  try {
    const db = client.db("vehicle");
    const collection = db.collection(collectionName);

    const result = await collection.findOne(constraints);
    const returnData = {
      status: "success",
      data: result,
    };
    console.log("result", returnData);
    return returnData;
  } catch (err) {
    console.error(err);
    const returnData = {
      status: "error",
      data: err,
    };
    return returnData;
  } finally {
    client.close();
  }
};

// NOTE: Delete a data by id
export const deleteById = async (collectionName: string, id: string) => {
  const client = await MongoClient.connect(url);
  try {
    const db = client.db("vehicle");
    const collection = db.collection(collectionName);

    const objectid = new ObjectId(id);
    const result = await collection.deleteOne({ _id: objectid });
    const returnData = {
      status: "success",
      data: result,
    };
    console.log("result", returnData);
    return returnData;
  } catch (err) {
    console.error(err);
    const returnData = {
      status: "error",
      data: err,
    };
    return returnData;
  } finally {
    client.close();
  }
};

// NOTE: Update any data by id
export const updateById = async (
  collectionName: string,
  id: string,
  constraints = {}
) => {
  const client = await MongoClient.connect(url);
  try {
    const db = client.db("vehicle");
    const collection = db.collection(collectionName);

    const objectid = new ObjectId(id);
    const result = await collection.updateOne(
      { _id: objectid },
      { $set: constraints }
    );
    const returnData = {
      status: "success",
      data: result,
    };
    console.log("result", returnData);
    return returnData;
  } catch (err) {
    console.error(err);
    const returnData = {
      status: "error",
      data: err,
    };
    return returnData;
  } finally {
    client.close();
  }
};
