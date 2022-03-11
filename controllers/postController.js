const { BlogPosts } = require('../models');
const { Users } = require('../models');
const { Categories } = require('../models');

const post = async (req, res) => {
  const { data } = req.user;
  const { id } = await Users.findOne({ where: { email: data } });
  const userId = id;
  const { title, content } = req.body;
  const newPost = await BlogPosts.create({ userId, title, content });
  return res.status(201).json(newPost);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const result = await BlogPosts.findAll({
    where: { id },
    attributes: { exclude: ['UserId'] },
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password', 'UserId'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  return res.status(200).json(result);
};

module.exports = {
  post,
  getPostById,
};