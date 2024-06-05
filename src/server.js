import express from "express";

let articleInfo = [
  {
    name: "learn-react",
    upvotes: 0,
  },
  {
    name: "learn-node",
    upvotes: 0,
  },
  {
    name: "learn-mongodb",
    upvotes: 0,
  },
];

const app = express();

app.put("/api/articles/:name/upvote", (req, res) => {
  const { name } = req.params;
  let article = articleInfo.find((article) => article.name === name);
  if (article) {
    article.upvotes += 1;
  } else {
    res.send("That article doesn't exist");
  }

  res.send(`The ${name} article now has ${article.upvotes} upvotes`);
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
