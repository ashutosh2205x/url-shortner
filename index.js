const express = require("express");
const urlRoute = require("./routes/url.router");
const { connectToMongoDB } = require("./connect");
const app = express();
const URL = require("./models/url.model");

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("mongodb connected..");
});
const PORT = 8001;
app.use(express.json());
app.use("/", urlRoute);

app.get("/:id", async (req, res) => {
  const shortid = req.params.id;

  const entry = await URL.findOneAndUpdate(
    { shortId: shortid },
    {
      $push: {
        visits: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectURL);
});
app.listen(PORT, () => {
  console.log("server started...at", PORT);
});
