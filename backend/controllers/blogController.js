// import { scrapeArticle } from "../services/scraper.js";
// import { summarizeText } from "../services/summarizer.js";
// import fs from "fs";

// export const summarizeAndSave = async (req, res) => {
//   const { url } = req.body;

//   try {
//     const { title, content } = await scrapeArticle(url);
//     const summary = summarizeText(content);

//     const post = { title, summary, source: url };
//     const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
//     db.push(post);
//     fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to process URL" });
//   }
// };

// export const getAllPosts = (req, res) => {
//   const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
//   res.json(db);
// };
