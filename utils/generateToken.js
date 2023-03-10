const jwt = require("jsonwebtoken");
const generateTokens = async (user) => {
    try {
        const payload = { userId: user._id }
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "5h" }
        );
       
        return Promise.resolve({ accessToken });
    } catch (err) {
        return Promise.reject(err);
    }
};

const verifyToken = (req, res, next) =>{
    const BearerToken = req.headers.authorization
    if(!BearerToken){
      res.status(401).send({message: 'You are not authenticated!'})
    }else{
      const token = BearerToken.slice(7, BearerToken.length)
      jwt.verify(token, process.env.JWT_SECRET,(err, data)=>{
          if(err){
            res.status(401).send({message: 'Token is not Valid!'})
          }else{
            req.user = data
            next()
          }
      })
    }
  }

module.exports = {generateTokens, verifyToken}