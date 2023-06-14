const EventModel = require('../models/Event').EventModel;

const getAll = (req, res, next) =>{
    EventModel.find({}).then((result)=>{
        return res.send(result)
    }).catch(e =>{
        console.error(e)
        next(new DatabaseError('Something went wrong when trying to retrieve users.', 500, true))
    })
}
const createOne = (req, res, next) =>{
    // TODO: add validation
    EventModel.create(req.body).then(result=>{
        return res.send(result)
    }).catch(e =>{
        console.error(e)
        next(new DatabaseError('Something went wrong when trying to create a new user.', 500, true))
    })
}
module.exports = {
    getAll,
    createOne
}