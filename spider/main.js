const utilities = require('./utilities');
const fs = require('fs');
const request = require('request');
const mkdirp = require('mkdirp');

function spider(url,callback){
     const fileName = utilities.urlToFilename(url);
    fs.exists(fileName,(exists)=>{
        if(exists){
            console.log("requested file already exists");
            callback(null,fileName,false);
        } else{
            request(url,(err,res,body)=>{
                if(err){
                   callback(err); 

                } else{
                    //save to file
                    mkdirp(fileName,(err)=>{
                        if(err){
                             callback(err);
                             
                        } else{
                            var dirPath = fileName + '/' + fileName;
                            fs.writeFile(dirPath,body,(err)=>{
                                if(err){
                                     console.log("error ocurred at writing to file",err); 
                                    //callback(err); 

                                } else{
                                     callback(null,fileName,true); 
                                }
                            })
                        }
                    })
                }
                
            })

        }

    })

//chk if url is already present


}



spider(process.argv[2],(err,fileName,downloaded)=>{
    if(err){
        console.log(err);       
    } else if(downloaded){
         console.log(`completed the downloaded at: "${fileName}"`);
    } else{
        console.log(`completed the downloaded of "${fileName}"`);
    }
})

