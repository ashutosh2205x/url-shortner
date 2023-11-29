const shortid = require("shortid");
const url = require("../models/url.model");

async function handleGenerateNewURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const id = shortid(8);
  await url.create({
    shortId: id,
    redirectURL: body.url,
    visits: [],
  });
  return res.json({ id: id });
}

module.exports = { handleGenerateNewURL };
