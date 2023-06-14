const Router = require('express').Router;
const router =  Router();
const UsersController = require('../controllers/users.controller')
const EventsController = require('../controllers/events.controller')

/** GET */
router.get('/users', UsersController.getAll)
router.get('/events', EventsController.getAll)

/** POST */
router.post('/users', UsersController.createOne)
router.post('/events', EventsController.createOne)

module.exports =  {
   router 
}