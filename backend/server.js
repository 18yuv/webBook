import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import passport from 'passport';
import authRouter from './routes/auth.js';
import connectMongo from './models/connection.js';
import homeRouter from './routes/home.js';
import cookieParser from 'cookie-parser';
import './utils/googleStrategy.js';
import bookmarkRouter from './routes/bookmarkRoute.js';
await connectMongo();

const app = express()
const PORT = process.env.PORT

app.set('trust proxy', 1);
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(passport.initialize())


app.use('/auth', authRouter)
app.use("/bookmarks", bookmarkRouter)
app.use('/home', homeRouter)
app.use((req, res) => {
  return res.status(404).json({message: 'Endpoint not found'})
  }
)

const server = app.listen(PORT, () => {
  console.log(`Server connected on PORT: ${PORT}`);
});

server.on('error', (error) => {
  console.error('Server connection error:', error);
});