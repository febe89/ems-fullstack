import mongoose from 'mongoose'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import connectToDatabase from '../db/db.js'
const login = async (req, res) => {
  const { email, password } = req.body
  try {
    connectToDatabase()

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ success: false, error: 'User Not Found' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Password Not Found' })
    }
    const token = await jwt.sign({ id: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: '1d' })

    res.status(200).json({ success: true, token, user: { _id: user._id, name: user.name, role: user.role } })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, error: error.message })
  }
}

const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user })
}
export { login, verify }
