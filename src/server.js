import express from "express";
import { db, connectToDb } from "./db.js";
import admin from "firebase-admin";
import fs from "fs";

const credentials = JSON.parse(fs.readFileSync("./credentials.json"));

// indicate to firebase wich credentials use to connect
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());

// verify user token
app.use(async (req, res, next) => {
  const { authtoken } = req.headers;

  if (authtoken) {
    try {
      req.user = await admin.auth().verifyIdToken(authtoken);
    } catch (e) {
      return res.sendStatus(400);
    }
  }
  req.user = req.user || {};
  next();
});

app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const article = await db.collection("articles").findOne({ name });

  if (article) {
    const upvoteIds = article.upvoteIds || [];
    // check if the user id exist and if already voted
    article.canUpvote = uid && !upvoteIds.includes(uid);

    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

// Prevent that a user make a reques if its not log in
app.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const article = await db.collection("articles").findOne({ name });

  if (!article) {
    res.send("That article doesn't exist");
  }

  const upvoteIds = article.upvoteIds || [];
  // uid exist and has already voted?
  const canUpvote = uid && !upvoteIds.includes(uid);

  if (canUpvote) {
    await db.collection("articles").updateOne(
      { name },
      {
        $inc: { upvotes: 1 },
        $push: { upvoteIds: uid },
      }
    );
  }
  const updatedArticle = await db.collection("articles").findOne({ name });

  res.json(updatedArticle);
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { text } = req.body;
  const { email } = req.user;

  await db
    .collection("articles")
    .updateOne({ name }, { $push: { comments: { postedBy: email, text } } });

  const article = await db.collection("articles").findOne({ name });

  if (!article) {
    res.send("That article doesn't exist!");
  }

  res.json(article);
});

app.get("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;

  const article = await db.collection("articles").findOne({ name });

  if (!article) {
    res.send("That article doesn't exist!");
  }

  res.json(article.comments);
});

app.get("/api/drop-mongodb", async (req, res) => {
  //await db.dropDatabase();

  res.json("Deleted");
});

connectToDb(() => {
  console.log("Successfully connected to database!");
  app.listen(8000, () => {
    console.log("Server is listening on port 8000");
  });
});
