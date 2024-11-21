const { ServerError } = require("../utils")

exports.fetchNothing = async (res,req)=>{
    try {
       return console.log(`server running`)
    } catch (error) {
        ServerError(res, error)
    }
}