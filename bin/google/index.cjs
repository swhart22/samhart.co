const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const {parseGoogle} = require('./parse.cjs');
// const {docToArchieML} = require('@newswire/doc-to-archieml');


const path = require('path');

//Mostly from these docs, but changed to google DOCS https://developers.google.com/sheets/api/quickstart/nodejs
const client_id = process.env.GOOGLE_OAUTH_CLIENT_ID;
const client_secret = process.env.GOOGLE_OAUTH_CONSUMER_SECRET;
const redirect_uri = process.env.GOOGLE_OAUTH_REDIRECT_URI;

console.log(client_id);
// const oauth2Client = new google.auth.OAuth2(client_id, client_secret);
const SCOPES = ['https://www.googleapis.com/auth/drive',
'https://www.googleapis.com/auth/drive.metadata.readonly',
'https://www.googleapis.com/auth/documents'];
const TOKEN_PATH = 'token.json';

async function run () {
  authorize(main);
}

run();

function authorize(callback) {
  // const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uri);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

async function main(auth) {
  const client = google.docs({version: 'v1', auth: auth});
  const params = {
    documentId: '1XY55-0D2bw2sZS1ssMxI7BdStdKTAWP2RxJRDld9hNI'
  }
  
  const {data} = await client.documents.get(params);
  const parsed = await parseGoogle(data);

  fs.writeFile('src/page.json', JSON.stringify(parsed), (err) => {
    if (err) throw err;
  })
}

// module.exports = {run};