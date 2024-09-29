import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)

const port = process.env.PORT
app.listen(port, () => console.log('running on 3000'))
