const db = require("../database/models");
const Comment = db.comment;

require("dotenv").config();

const handeAddComment = async (req, res) => {
  console.log("post");
  const data = req.body;

  if (!data || !data.comment || !data.user || !data.id) {
    return res.status(404).json({ message: "No required content" });
  }

  await Comment.create({
    text: data.comment,
    likes: 0,
    dislikes: 0,
    userId: data.user,
    articleId: parseInt(data.id),
  });

  res.status(200).json({
    message: "Comment added",
    rescomm: {
      id: 0,
      text: data.comment,
      likes: 0,
      dislikes: 0,
      userId: data.user,
      createdAt: new Date().toISOString(),
    },
  });
};

const handleGetComment = async (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  if (!id) {
    return res.status(404).json({ message: "No required content" });
  }

  const comments = await Comment.findAll({
    where: {
      articleId: id,
    },
  });

  res.json(comments);
};

module.exports = {
  handeAddComment: handeAddComment,
  handleGetComment: handleGetComment,
};
