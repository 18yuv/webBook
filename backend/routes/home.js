import express from 'express'
import ensureAuth from '../middlewares/ensureAuth.js';
import meController from '../controllers/meController.js';

const homeRouter = express.Router()

homeRouter.get('/me', ensureAuth, meController)

export default homeRouter;