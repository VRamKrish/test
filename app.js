const { MongoClient } = require("mongodb");
const uri = require("./atlas_url");
// const uri =
//   "mongodb+srv://myAtlasDBUser:myatlas-001@myatlasclusteredu.jrqai.mongodb.net";
const client = new MongoClient(uri);
// const client = new MongoClient(uri);
// const dbName = "myAtlasDBUser";
const connecToDatebase = async () => {
  try {
    await client.connect();

    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

async function insertData(collection) {
  // const insertResult = await collection.insertOne({
  //   first_name: "vamsi",
  //   last_name: "ram",
  //   user_name: "vamsi_ram_1",
  //   password: "varakri212",
  // });
  const insertResult = await collection.insertMany([
    {
      first_name: "vamsi",
      last_name: "ram",
      user_name: "vamsi_ram_1",
      password: "varakri212", // encrypted password
    },
    {
      first_name: "vamsi",
      last_name: "ram",
      user_name: "vamsi_ram_2",
      password: "varakri212", // encrypted password
    },
    {
      first_name: "vamsi",
      last_name: "ram",
      user_name: "vamsi_ram_3",
      password: "varakri212", // encrypted password
    },
  ]);

  console.log("Insert result:", insertResult);
}
const main = async () => {
  const dbo = client.db("ck");
  const collection = dbo.collection("users_data");
  try {
    await connecToDatebase();
    //---------------------****************************------------------------
    //     const dbname = "bank"
    // const collection_name = "accounts"

    // const accountsCollection = client.db(dbname).collection(collection_name)
    //---------------------****************************------------------------

    const dbo = client.db("ck");
    const collection = dbo.collection("users_data");
    // await insertData(collection);
  } catch (error) {
    console.error("Error in main", error);
  } finally {
    await client.close();
  }
};
main();
