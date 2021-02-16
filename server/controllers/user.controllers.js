const { Users } = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports.register = (req, res) => {

    Users.create(req.body)
      .then(user => {
        const payload = {
            id: user._id
          };
          const userToken = jwt.sign(payload, process.env.SECRET_KEY);

          res.cookie("userToken", userToken, { httpOnly: true }).json({
            message: "This response has a cookie" , user : user , token: userToken
          });
          res.json({ msg: "success!", user: user , token: userToken });
      })
      .catch(err => res.json(err));
  }

module.exports.login=async(req, res)=>{
    const user = await Users.findOne({ email: req.body.email });
     
    if(user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }
 
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
 
    if(!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }
 
    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);
 
    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken,  {
            httpOnly: true
        })
        .json({ msg: "success!" });
}

    
module.exports.logout=(req, res)=>{
    res.clearCookie('usertoken');
    res.sendStatus(200);
}