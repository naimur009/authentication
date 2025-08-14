
// *! install all important module and import them all 

import express from "express";
import cors from 'cors';
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";




// *! import config file and api endpoint (.js is must for custom file)

import config from "./app/config/config.js";
import router from "./app/route/api.js";



// *! execute express
const app = express();



// *! important middleware

app.use(cors());
app.use(express.json({limit:config.MAX_JSON_SIZE}));
app.use(express.urlencoded({extended:config.URL_ENCODE}));
app.use(helmet());
app.use(cookieParser());



// *! app use limiter (to set the limit of request)
const limiter = rateLimit({windowMs: config.REQUEST_TIME, max: config.REQUEST_NUMBER });
app.use(limiter)



// *! to maintain cache
app.set('etag', config.WEB_CACHE);




// *! connected to database
mongoose.connect(config.MONGO_URI).then(()=>{
    console.log("Database Connected");
}).catch(()=>{
    console.log("Database not Connected");
})





// *! api endpoint

app.use('/api/v1', router);





// *! listen request

app.listen(config.PORT, ()=>{
    console.log("Server is running on PORT ", config.PORT);
    console.log(`http://localhost:${config.PORT}/`);
})