import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addDepartment } from '../controller/departmentController.js'

const router = express.Router()

router.post('/add', authMiddleware,addDepartment)

export default router
