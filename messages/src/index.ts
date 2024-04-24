import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { createServer } from 'http'
import { corsOptions } from './socket';
import { useSocket } from './socket';

const app = express();
const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);
const io = useSocket(httpServer);

app.disable('x-powered-by');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors(corsOptions));

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))

io.on("connection", () => {
  console.log('connected')
})