import jwt from 'jsonwebtoken';

export const generateToken = (payload, type = 'access') => {
  const secret =
    type === 'refresh'
      ? process.env.JWT_REFRESH_SECRET
      : process.env.JWT_ACCESS_SECRET;

  const expiresIn =
    type === 'refresh'
      ? process.env.JWT_REFRESH_EXPIRES_IN
      : process.env.JWT_ACCESS_EXPIRES_IN;

  return jwt.sign(payload, secret, { expiresIn });
};
