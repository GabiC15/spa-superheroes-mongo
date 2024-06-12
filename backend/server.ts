import express from "express";
import Server from "./src/index";
import { MongoClient } from "mongodb";
import { client } from "./src/services/mongodb";
import characters from "./data/data.json";

const app = express();
const server = new Server(app);
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

app.get("/api/superheroes/", async (req, res) => {
  const { casa } = req.query;
  const regex = new RegExp(`^${casa}$`, "i");
  const data = await client
    .db("spa")
    .collection("superheroes")
    .find(casa ? { casa: regex } : {})
    .toArray();

  res.json(data);
});

app.get("/api/superheroes/:id", async (req, res) => {
  const regex = new RegExp(`^${req.params.id}$`, "i");
  const data = await client
    .db("spa")
    .collection("superheroes")
    .findOne({ nombre: regex });

  res.json(data);
});

app.post("/api/superheroes/", async (req, res) => {
  const data = await client
    .db("spa")
    .collection("superheroes")
    .insertOne(req.body);

  res.json(data);
});

app.put("/api/superheroes/:id", async (req, res) => {
  const regex = new RegExp(req.params.id, "i");
  delete req.body._id;
  const data = await client
    .db("spa")
    .collection("superheroes")
    .updateOne({ nombre: regex }, { $set: req.body });

  res.json(data);
});

app.delete("/api/superheroes/:id", async (req, res) => {
  const regex = new RegExp(req.params.id, "i");
  const data = await client
    .db("spa")
    .collection("superheroes")
    .deleteOne({ nombre: regex });

  res.json(data);
});

const startApp = async (db: MongoClient) => {
  if ((await db.db("spa").listCollections().toArray()).length < 1) {
    db.db("spa").collection("superheroes").insertMany(characters);
  }

  app
    .listen(PORT, "backend", function () {
      console.log(`Server is running on port ${PORT}.`);
    })
    .on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        console.log("Error: address already in use");
      } else {
        console.log(err);
      }
    });
};

client.connect().then(startApp);
