
const config = {
    
    PORT : 8080,
    MONGO_URI : "mongodb://localhost:27017/login",

    JWT_KEY : "naimur12345",
    JWT_EXPIRED:"30d",

    WEB_CACHE: true,
    MAX_JSON_SIZE:"10MB",
    URL_ENCODE: true,

    REQUEST_TIME: 20*60*1000,
    REQUEST_NUMBER:2000

}

export default config;