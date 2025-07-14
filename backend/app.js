// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import axios from 'axios';
// import cheerio from 'cheerio';

// // MongoDB Blog model
// const blogSchema = new mongoose.Schema({
//   title: String,
//   summary: String,
//   image: String,
//   sourceName: String,
//   sourceLogo: String,
//   sourceUrl: String,
//   publishedAt: Date,
// });
// const Blog = mongoose.model('Blog', blogSchema);

// const app = express();
// app.use(cors({
//   origin: 'http://localhost:3001', // your frontend origin
// }));
// app.use(express.json());

// // Scraper functions for different sites
// async function scrapeHamroPatro() {
//   try {
//     const { data } = await axios.get('https://english.hamropatro.com/category/news');
//     const $ = cheerio.load(data);
//     const blogs = [];

//     $('.card').each((i, el) => {
//       const title = $(el).find('h3').text().trim();
//       const summary = $(el).find('p').text().trim();
//       const image = $(el).find('img').attr('src');
//       const sourceUrl = $(el).find('a').attr('href');
//       const sourceLogo = 'https://english.hamropatro.com/favicon.ico';

//       if (title && sourceUrl) {
//         blogs.push({
//           title,
//           summary,
//           image,
//           sourceUrl,
//           sourceLogo,
//           sourceName: 'HamroPatro',
//           publishedAt: new Date(),
//         });
//       }
//     });

//     return blogs;
//   } catch (err) {
//     console.error('Error scraping HamroPatro:', err);
//     return [];
//   }
// }

// async function scrapeSetopati() {
//   try {
//     const { data } = await axios.get('https://setopati.com/category/news');
//     const $ = cheerio.load(data);
//     const blogs = [];

//     $('.news-title a').each((i, el) => {
//       const title = $(el).text().trim();
//       const sourceUrl = $(el).attr('href');
//       const sourceLogo = 'https://setopati.com/favicon.ico';

//       if (title && sourceUrl) {
//         blogs.push({
//           title,
//           summary: '', // Setopati page may not have summary in listing
//           image: '',
//           sourceUrl,
//           sourceLogo,
//           sourceName: 'Setopati',
//           publishedAt: new Date(),
//         });
//       }
//     });

//     return blogs;
//   } catch (err) {
//     console.error('Error scraping Setopati:', err);
//     return [];
//   }
// }

// // API endpoint that scrapes and returns combined blogs from multiple sources
// app.get('/api/blogs', async (req, res) => {
//   try {
//     // Scrape all sources in parallel
//     const [hamroBlogs, setopatiBlogs] = await Promise.all([
//       scrapeHamroPatro(),
//       scrapeSetopati(),
//     ]);

//     // Combine all blogs, you could sort/filter here if you want
//     const allBlogs = [...hamroBlogs, ...setopatiBlogs];

//     // Upsert into MongoDB (to avoid duplicates), but this step is optional,
//     // or you can just serve scraped data directly without DB storage.
//     for (const blog of allBlogs) {
//       await Blog.updateOne(
//         { sourceUrl: blog.sourceUrl },
//         { $set: blog },
//         { upsert: true }
//       );
//     }

//     // Send stored blogs sorted by publishedAt descending
//     const storedBlogs = await Blog.find().sort({ publishedAt: -1 });
//     res.json(storedBlogs);
//   } catch (error) {
//     console.error('Failed to fetch blogs:', error);
//     res.status(500).json({ message: 'Failed to fetch blogs' });
//   }
// });

// const PORT = 5000;
// mongoose
//   .connect('mongodb://localhost:27017/blogspace')
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error('MongoDB connection error:', err);
//   });
