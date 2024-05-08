const express = require("express");
const { getPosts, createPost, updatePost, getPostById, deletePost } = require("./lib/posts");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/posts", async (req, res) => {
  const posts = await getPosts();
  res.json(posts);
});

app.post("/api/posts", async (req, res) => {
  const post = await createPost(req.body);
  res.json(post);
});

app.get("/api/posts/:id", async (req,res) => {
    const post = await getPostById(req.params.id);
    res.json(post);
})

app.patch("/api/posts/:id", async (req,res) => {
    const post = await updatePost(req.params.id, req.body);
    res.json(post)
});

app.delete("/api/posts/:id", async (req,res) => {
    await deletePost(req.params.id);
    res.json('success');
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
