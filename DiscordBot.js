const Discord = require('discord.js');
const https = require('https');
const client = new Discord.Client();

client.on('ready', () => 
{
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => 
{
  if (msg.content.includes('expr')) 
  {
    var str_path = '/api/v2' + msg.content.replace('expr', '').replace(' ', '/').replace(' ', '/');
    const options = {
      hostname: 'newton.now.sh',
      path: str_path,
      method: 'GET'
    }

    const req = https.get(options, res => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on('data', d => {
        var json = JSON.parse(d);
        if(msg.content.includes('zeroes'))
        {
          console.log(json.result[0]);
          //msg.reply('Answer: ' + answer);
        }
        else
        {
          msg.reply('Answer: ' + json.result, {});
        }
      });
    });

    req.on('error', error => {
      console.error(error);
    });

    req.end();
  }
}).on('error', err => {
  console.log("Error: " + err.message);
});

client.login('MzQ1MTI2NTkyODMxNTUzNTQ3.XLE_8Q.wbibCqy3WT5aA3fFRSr4hhb1Fmc');