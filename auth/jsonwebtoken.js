const jsonwebtoken = require('jsonwebtoken')
// Generate a new JWT token
 async function generateToken(payload, secretKey, expiresIn) {
  const data = await jsonwebtoken.sign(payload, secretKey, { expiresIn });
  return data;
}
// Verify and decode a JWT token
async function verifyToken(token, secretKey) {
  try {
    const tokenData = await jsonwebtoken.verify(token, secretKey);
    return tokenData;
  } catch (err) {
    return err;
  }
}
module.exports = {
  generateToken,
  verifyToken
};