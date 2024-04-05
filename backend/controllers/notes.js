const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  response.json(notes);
});

notesRouter.get("/:id", async (request, response, next) => {
  const id = Number(request.params.id);

  try {
    const note = await Note.findOne({ id: id });
    if (note) {
      response.json(note);
    } else {
      response.status(404).json({ error: "Note bulunamadı" });
    }
  } catch (error) {
    next(error);
  }
});

notesRouter.post("/", async (request, response, next) => {
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
    const count = await Note.countDocuments();
    const note = new Note({
      id: count + 1,
      content: body.content,
      important: body.important || false,
      user: user,
    });

    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();
    response.json(savedNote);
  } catch (error) {
    next(error);
  }
});

notesRouter.put("/:id", async (request, response, next) => {
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
    const updatedNote = await Note.findOneAndUpdate(
      { id: id },
      { content: body.content, important: body.important, user: user },
      { new: true }
    );

    if (!updatedNote) {
      return response.status(404).json({ error: "Note bulunamadı" });
    }

    response.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

notesRouter.delete("/:id", async (request, response, next) => {
  const id = Number(request.params.id);

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  try {
    const note = await Note.findOneAndDelete({ id: id }, { user: user });
    if (note) {
      `${response.json(note)} silindi`;
    } else {
      console.error("Note aranırken bir hata oluştu:", error);
      response.status(500).json({ error: "Note aranırken bir hata oluştu" });
    }
  } catch (error) {
    next(error);
  }
  response.status(204).end();
});

module.exports = notesRouter;
