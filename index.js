var aws        = require('aws-sdk');
var ACCESS_KEY = 'accessKey1';
var SECRET_KEY = 'verySecretKey1';
var ENDPOINT   = 'http://127.0.0.1:8000'

aws.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY
});

var s3 = new aws.S3({
  endpoint: ENDPOINT,
  s3ForcePathStyle: true
});

function mb(){
  var Bucket = process.argv[3]
  s3.createBucket({Bucket: Bucket}, function(err, data) {
    if(err){
      console.log("Couldn't Create Bucket");
      console.log(err);
    }
    else{
      console.log("Successfully Created Bucket: " + Bucket)
    }
  });

}

function db() {
  var Bucket = process.argv[3]
  s3.deleteBucket({Bucket: Bucket}, function(err, data) {
    if(err){
      console.log("Couldn't Delete Bucket");
      console.log(err);
    }
    else{
      console.log("Successfully Deleted Bucket: " + Bucket)
    }
  });
}

function lb() {
  s3.listBuckets({}, function(err, data) {
    if(err){
      console.log("Couldn't List Buckets");
      console.log(err);
    }
    else{
      console.log("Successfully extracted Buckets List");
      var Buckets = data['Buckets'];
      for(var i=0; i < Buckets.length; i++){
        console.log((i+1) + " => " + Buckets[i]['Name'])
      }
    }
  });
}

function lo() {
  s3.listObjects({Bucket: process.argv[3]}, function(err, data) {
    if(err){
      console.log("Couldn't Read Bucket");
      console.log(err);
    }
    else{
      console.log("Successfully extracted Bucket Objects List");
      console.log(data)
    }
  });
}


switch(process.argv[2]){
  case 'mb': mb();
             break;
  case 'db': db();
             break;
  case 'lb': lb();
             break;
  case 'lo': lo();
            break;
  default: console.log("No commands given or command not recognized");
            break;
}