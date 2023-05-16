const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  const createResult = await categoryService.createCategory(req.body);
  if (createResult.type) {
    return res.status(createResult.type).json({ message: createResult.message });
  }

  return res.status(201).json(createResult.message);
};

module.exports = {
  createCategory,
};