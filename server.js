var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
mongoose.Promise = Promise

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


var dburl ='mongodb://user:user3733@ds163610.mlab.com:63610/chats-3733'
 var Message = mongoose.model('Message',{
     name: String,
     message: String
 })
var messages = [
    {name:'Singh', message:'Hi'},
    {name:'Schmidt', message:'Hallo'}
]


app.get('/messages', (req,res) => {
    Message.find({},(err,messages)=>{
        res.send(messages)
    })
    
})

app.post('/messages', async (req, res) => {
    var message = new Message(req.body)
    var savedMessage = await message.save()

    console.log('saved')
    var censored = await Message.findOne({message: 'badword'})
 
    if(censored) 
        await Message.remove({_id: censored.id})
    else
       io.emit('message', req.body)

    res.sendStatus(200) 

  
    // .catch((err) => {
    //     res.sendStatus(500)
    //     return console.error(err)
    // })
   
})



io.on('connection', (socket) => {
    console.log('a user connected')
})


mongoose.connect(dburl, (err)=>{
    console.log('db connection',err)
})

var server = http.listen(3000, () =>{
    console.log('server is listening on port ' + server.address().port)
})