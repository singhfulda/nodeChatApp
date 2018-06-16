var fs = require('fs')


/*
* will return stream buffer
*/
fs.readFile('./data.json', (err, data) => {
    console.log(data);
}) 


/*
*will return json string
*which needs to be parsed in order to get object
*/
fs.readFile('./data.json','utf-8', (err, data) => {
    var data = JSON.parse(data);
    console.log(data.name);
})

/*
*will import data as object and properties can be read
*/
var data = require('./data.json')
console.log(data.name)