const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    try {
        
        // const token = req.header("token").replace("Bearer "," ")
        const token = req.header("token")
        const decryptedData = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = decryptedData.userId
        next()

    } catch (error) {
        return res.send({
            success : false,
            message : error.message,
        })
    }
}

