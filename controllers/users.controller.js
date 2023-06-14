const DatabaseError = require('../errors/database.error')

const UserModel = require('../models/User').UserModel

const getAll = (req, res, next) =>{
    UserModel.find({}).then((result)=>{
        return res.send(result)
    }).catch(e =>{
        console.error(e)
        next(new DatabaseError('Something went wrong when trying to retrieve users.', 500, true))
    })
}
const createOne = (req, res, next) =>{
     // TODO: add validation
     UserModel.create(req.body).then(result=>{
        return res.send(result)
    }).catch(e =>{
        console.error(e)
        next(new DatabaseError('Something went wrong when trying to create a new event.', 500, true))
    })
}

module.exports = {
    getAll,
    createOne
}