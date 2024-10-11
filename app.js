#!/usr/bin/env node

const express = require("express");
const cors = require("cors");
const {
  getPosts,
  createPost,
  updatePost,
  getPostById,
  deletePost,
} = require("./lib/posts");
const app = express();
const PORT = 4000;

const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    if(allowedOrigins.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by Cors'))
    }
  },
  credentials: true,
  method: "GET, HEAD, PUT, PATCH, POST, DELETE"
};

app.use(express.json());
app.use(cors(corsOptions))

app.get("/api/posts", async (req, res) => {
  console.log("GET --start: /posts");
  console.log(req.headers)
  const posts = await getPosts();
  console.log("GET --end: /posts");

  res.json(posts);
});

app.post("/api/posts", async (req, res) => {
  console.log("POST: /posts", req.body);
  const post = await createPost(req.body);
  res.json(post);
});

app.get("/api/posts/:id", async (req, res) => {
  console.log("GET: /posts/" + req.params.id);

  const post = await getPostById(req.params.id);
  res.json(post);
});

app.patch("/api/posts/:id", async (req, res) => {
  console.log("PATCH: /posts/" + req.params.id);

  const post = await updatePost(req.params.id, req.body);
  res.json(post);
});

app.delete("/api/posts/:id", async (req, res) => {
  console.log("DELETE: /posts/" + req.params.id);

  await deletePost(req.params.id);
  res.json("success");
});


app.post("/api/signin", async (req, res) => {
  res.cookie("auth", "xdxdxd");

  res.json({
    message: "okay",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
