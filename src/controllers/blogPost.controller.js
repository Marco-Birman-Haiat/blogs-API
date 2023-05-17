const { blogPostService } = require('../services');

const createPost = async (req, res) => {
  const { data: { email } } = req.payload;
  const createPostResult = await blogPostService.createPost({ ...req.body, email });

  if (createPostResult.type) {
    return res.status(createPostResult.type).json({ message: createPostResult.message });
  }

  return res.status(201).json(createPostResult.message);
};

module.exports = {
  createPost,
};
