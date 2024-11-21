

exports.ServerError = (res, error) => {
    return res.json({status: 500, msg: `Something went wrong on our end, try again later.`, stack: `${error}`})
}
exports.Excludes = [
   
]

