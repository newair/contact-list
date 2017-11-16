var fs = require('fs');
var fileName= './contacts.json';
var dataJson = require(fileName);

var dataHandler={}

//This function will mimic a database operation by writting it to a file
dataHandler.save= function(contact){

    let data = dataJson;
    let promise = new Promise((resolve, reject)=>{
        dataJson.push(contact);// push to the existing array
        fs.writeFile(fileName, JSON.stringify(dataJson), (err)=> {
            //if and error occured reject the promise
            if (err) {
                reject(err);
            }
            //else resolve it with the contact
            resolve(contact);            
          });

    });
    return promise;
}

dataHandler.getAll= function(){
    let promise = new Promise((resolve, reject)=>{
        fs.readFile('./contacts.json', function read(err, data) {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(data));
        });        
    });
    return promise;
}


module.exports = dataHandler;