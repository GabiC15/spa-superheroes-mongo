import express from "express";
import { MongoClient } from "mongodb";
import { client } from "./services/mongodb";
import characters from "../data/data.json";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/superheroes/", async (req, res) => {
  const { nombre, casa } = req.query;
  const nombreRegex = new RegExp(`${nombre}`, "i");
  const casaRegex = new RegExp(`^${casa}$`, "i");
  const data = await client
    .db("spa")
    .collection("superheroes")
    .find({
      visible: true,
      ...(casa ? { casa: casaRegex } : {}),
      ...(nombre ? { nombre: nombreRegex } : {}),
    })
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

app.put("/api/superheroes/:id", async (req, res) => {
  const regex = new RegExp(req.params.id, "i");
  delete req.body._id;
  delete req.body.nombre;
  delete req.body.imagenes;
  const data = await client
    .db("spa")
    .collection("superheroes")
    .updateOne({ nombre: regex }, { $set: { ...req.body, visible: true } });

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
