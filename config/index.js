require('dotenv').config();// para las variables de entorno


process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    secretToken: process.env.TOKEN_LOGIN_SECRET_01,
    port: process.env.PORT,
    host: process.env.HOST,
    database:{
        db_uri: process.env.DB_URI
    },
    aws : {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        privateAccessKey: process.env.AWS_PRIVATE_ACCESS_KEY,
        s3BucketName : process.env.AWS_S3_BUCKET_NAME
    }
}