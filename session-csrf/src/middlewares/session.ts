import '../d.ts/express-session.d.ts'

import { Router } from 'express'
import session from 'express-session';
import connectMongodbSession from 'connect-mongodb-session';



const MongoDBStore = connectMongodbSession(session);

const store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/asm2?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.9',
    collection: 'sessions',
    databaseName: 'testSession'
});


const router = Router()

router.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
    // strore session in MongoDB
    store: store,
}))

export default router