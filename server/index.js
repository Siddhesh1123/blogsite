import express from 'express';
import { Connection } from './database/db.js';
import  Router  from './routes/routes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',Router)

const PORT = 2101

app.listen(PORT, () => console.log(`Server is running ,Let's kick some assess ${PORT}`))

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;


Connection(USERNAME,PASSWORD);