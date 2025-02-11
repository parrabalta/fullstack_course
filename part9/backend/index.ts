import express from 'express';
import cors from 'cors';
import appRouter from './src/routers/appRouter';


const app = express();
app.use(express.json());
app.use(cors())

const PORT = 3001;


app.use('/api', appRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});