const { appConfig } = require("../constants")
const AWS  = require('aws-sdk');

/** Defining s3 Constant for S3 object*/
const s3 = new AWS.S3({
  accessKeyId: appConfig.aws.s3.key,
  secretAccessKey: appConfig.aws.s3.secret,
});

const awsServices = {};

// @service-name : s3Upload
// @service-desc : Utility function to upload files on S3 bucket
const bucketName = appConfig.aws.s3.bucketName;
awsServices.s3Upload = async ({ fileName, filePath }) => {
  /**Uploading file on S3 bucket*/
  const params = {
   Bucket: bucketName,
   Key: fileName,
   Body: filePath,
  };

  let data;
  try {
    data = await s3.upload(params).promise();
    console.log('File uploaded successfully. Location:', data.Location);
  } catch (err) {
    console.log('Error:', err);
    return {
      error: "Error while uploading file to S3",
      ...err
    };
  }
    
  return data.Location;
};

module.exports = awsServices;