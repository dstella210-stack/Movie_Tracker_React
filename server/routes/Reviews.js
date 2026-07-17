import { Router } from 'express'
import * as reviewsController from '../controllers/reviewsController.js'

const router = Router()

router.get('/', reviewsController.listReviews)
router.post('/', reviewsController.createReview)

export default router