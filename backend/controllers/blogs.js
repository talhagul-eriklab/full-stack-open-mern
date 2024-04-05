const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
  const id = Number(request.params.id);

  try {
    const blog = await Blog.findOne({ id: id });
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).json({ error: "Blog bulunamadı" });
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  if (!body) {
    return response.status(400).json({ error: "Veri eksik" });
  }

  try {
    const count = await Blog.countDocuments();
    const blog = new Blog({
      id: count + 1,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  if (!body) {
    return response.status(400).json({ error: "Veri eksik" });
  }

  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { id: id },
      {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return response.status(404).json({ error: "Blog bulunamadı" });
    }

    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const id = Number(request.params.id);

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  try {
    const blog = await Blog.findOneAndDelete({ id: id }, { user: user });
    if (blog) {
      `${response.json(blog)} silindi`;
    } else {
      console.error("Blog aranırken bir hata oluştu:", error);
      response.status(500).json({ error: "Blog aranırken bir hata oluştu" });
    }
  } catch (error) {
    next(error);
  }
  response.status(204).end();
});

module.exports = blogsRouter;
