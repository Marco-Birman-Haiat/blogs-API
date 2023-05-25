const { userCreateSchema } = require('./schemas');
const { userView } = require('../../views');

const createUservalidations = async (newUser) => {
  const { error: schemaError } = userCreateSchema.validate(newUser);
  if (schemaError) return { type: 400, message: schemaError.message };

  const emailExists = await userView.getByEmail(newUser.email);
  if (emailExists) return { type: 409, message: 'User already registered' };

  return { type: null, message: '' };
};

module.exports = {
  createUservalidations,
};
