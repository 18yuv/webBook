import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import authRouter from './routes/auth.js';
import connectMongo from './models/connection.js';
import homeRouter from './routes/home.js';
import cookieParser from 'cookie-parser';
await connectMongo();

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(cookieParser())


app.use('/auth', authRouter)
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