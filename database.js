const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
const TelegramBot = require('node-telegram-bot-api');

const token = '5608261561:AAHalKZwgwfhWE6WWWNBlxI35OxvZa4Xomo';

const bot = new TelegramBot(token, {polling: true});


var serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();


bot.on('message', function(mg){


  const msg = mg.text;

  const newMsg = msg.split(" ")
  if(newMsg[0]=='INSERT'){
    //Insert the data to database with key
    db.collection('personaDatal').add({
      key:newMsg[1],
      dataValue:newMsg[2],
      userID:mg.from.id
  }).then(()=>{
    bot.sendMessage(mg.chat.id, newMsg[1] + " stored sucessfully ")
  })

  }
  else if(newMsg[0]=='GET'){
    //Get the data to database with key
    db.collection('personalData').where('userID', '==', mg.from.id).get().then((docs)=>{
      docs.forEach((doc) => {
            bot.sendMessage(mg.chat.id, doc.data().key + " " + doc.data().dataValue)
          });
    })
  }
  else{
    bot.sendMessage(mg.chat.id, "Please make sure you keeping GET or INSERT in your message to insert the data or GET the data")
  }
 
})