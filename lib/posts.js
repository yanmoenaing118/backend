// Dummy data for posts
let posts = [
  { id: 1, title: "Post 1", content: "Content of post 1" },
  { id: 2, title: "Post 2", content: "Content of post 2" },
  { id: 3, title: "Post 3", content: "Content of post 3" },
];

exports.getPosts = async () => new Promise((resolve, reject) => resolve(posts));

exports.getPostById = async (id) => {
  return new Promise((res, rej) => {
    const post = posts.find((post) => post.id == id);
    res(post);
  });
};

exports.createPost = async (body) => {
    return new Promise((res,rej) => {
        posts.push(body);
        res(body);
    })
}

exports.updatePost = async (id, body) => {
  return new Promise((res, rej) => {
    const idx = posts.findIndex((post) => post.id == id);
    for (let key in posts[idx]) {
      if (key in body) {
        posts[idx][key] = body[key];
      }
    }
    res(posts[idx]);
  });
};

exports.deletePost = async (id) => {
  return new Promise((resolve, rejct) => {
    posts = posts.filter((post) => post.id != id);
    resolve("deleted");
  });
};
