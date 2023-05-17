const { blogPostService } = require('../services');

const createPost = async (req, res) => {
  const { data: { email } } = req.payload;
  const createPostResult = await blogPostService.createPost({ ...req.body, email });

  if (createPostResult.type) {
    return res.status(createPostResult.type).json({ message: createPostResult.message });
  }

  return res.status(201).json(createPostResult.message);
};

const getPosts = async (req, res) => {
  const posts = await blogPostService.getPosts();
  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await blogPostService.getPostById(id);

  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { data: { email } } = req.payload;
  const insertData = req.body;
  const postData = { id, ...insertData };

  const updatedPost = await blogPostService.updatePost(email, postData);
  if (updatedPost.type) return res.status(updatedPost.type).json({ message: updatedPost.message });

  return res.status(200).json(updatedPost.message);
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
};
