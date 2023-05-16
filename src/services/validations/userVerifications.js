const { userCreateSchema } = require('./schemas');

const createUserVerifications = async (newUser) => {
  const { error } = userCreateSchema.validate(newUser);
  if (error) return { type: 400, message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  createUserVerifications,
};