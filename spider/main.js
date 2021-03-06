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
            downloadUrl(url,fileName,(err,fileName,NewCreated)=>{
                callback(null,fileName,NewCreated);
            })

        }

    })

}


function downloadUrl(url,fileName,callback){
    request(url,(err,res,body)=>{
        if(err){
            return callback(err); 

        } 
        //save to file
        
        saveFile(fileName,body,(err,fileName,NewCreated)=>{
            if(err){
            return callback(err)
            }
             callback(null,fileName,NewCreated);

        });     
    })
}


function saveFile(fileName,contents,callback){
    mkdirp(fileName,(err)=>{
        if(err){
            return callback(err);
                                 
            } 
        var filePath = fileName + '/index.html';
        fs.writeFile(filePath,contents,(err)=>{
            if(err){
                return callback(err); 
            } 
            callback(null,fileName,true); 
                                    
        })
                            
     })
                   
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

