import axios from "axios";
import { parseStringPromise } from "xml2js";
import BlogPost from "./../models/BlogPost.js";

const RSS_URL = "https://jsonplaceholder.typicode.com/posts";

export async function scrapeAndSaveHamroPatraBlogs() {
  try {
    const { data: xml } = await axios.get(RSS_URL, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const result = await parseStringPromise(xml);
    const items = result.rss.channel[0].item;

    const posts = items.map((item) => ({
      title: item.title[0],
      url: item.link[0],
      summary: item.description?.[0] || "",
    }));

    for (const post of posts) {
      await BlogPost.findOneAndUpdate(
        { url: post.url },
        post,
        { upsert: true, new: true }
      );
    }

    console.log(`✅ Scraped and saved ${posts.length} posts from RSS.`);
  } catch (error) {
    console.error("❌ Error scraping RSS feed:", error.message);
  }
}
