const { userCreateSchema } = require('./schemas');

const createUservalidations = async (newUser) => {
  const { error } = userCreateSchema.validate(newUser);
  if (error) return { type: 400, message: error.message };

  return { type: null, message: '' };
};

// const checkUserIdEmailMatch = async (user) => {
//   const { id, email } = user;
//   const userDbId = await User.findOne({ where: { email }, include: ['id'] });
//   if (id === userDbId) return true;
// };

// const deleteUserValidation = async (user) => {
//   const userMatchError = await checkUserIdEmailMatch(user);
//   if (!userMatchError) return { type: 401, message: 'Unauthorized user' };
//   return { type: null, message: '' };
// };

module.exports = {
  createUservalidations,
};
