const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const SECRET_KEY = config.SECRET_KEY

const authMiddleware = {

  verifyToken: (req, res, next) => {
    console.log("api")
    const token = req.body.token;
    console.log(token)

    if(!token){
        return res.status(401).json({message: 'Authentication failed'});
    } 
    else {
        console.log(token)
    }

    try {
      const decodedToken = jwt.verify(token,SECRET_KEY); 
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          console.error('Token verification failed:', err);
        } else {
          console.log('DecodedToken:', decodedToken); 
          req.userId = decoded.userId;
          console.log(req.userId)
          next();
        }
      });


    } catch (error) {
      console.error('Error verifying token', error);
      return res.status(401).json({ message: 'Authentication failed' });
    }
  }
}

module.exports = authMiddleware;