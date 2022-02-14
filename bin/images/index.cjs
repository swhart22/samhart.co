const {google} = require("googleapis"); 
const fs = require("fs");

const drive = google.drive('v2');

const client_id = process.env.GOOGLE_OAUTH_CLIENT_ID;
const client_secret = process.env.GOOGLE_OAUTH_CONSUMER_SECRET;
const redirect_uri = process.env.GOOGLE_OAUTH_REDIRECT_URI;

const SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/documents'];
const TOKEN_PATH = 'token.json';
const FOLDER_ID = '1IYrrSmoCPvJynOHBGnH2M_ukFHwayux5';

run();
async function run(){
    const config = await generateConfig();
    const client = await buildClient(config);
    await requestImages(drive, client, FOLDER_ID);

    async function getTokenInfo() {
        return new Promise((res, rej) => {
            fs.readFile(TOKEN_PATH, (err, token) => {
                if (err) return getNewToken();
                res(JSON.parse(token));
                // oAuth2Client.setCredentials(JSON.parse(token));
                // callback(oAuth2Client);
              });
        })
    }
    async function getNewToken() {
        console.log("Token parse failed. For now, just run npm run google and the token will regenerate.");
    }
    async function generateConfig() {
        const configOutput = {
            "client_id": client_id,
            "client_secret": client_secret,
            "scope": SCOPES,
            "redirect_url": redirect_uri,
            "tokens": {
              "access_token": "access_token",
              "token_type": "Bearer",
              "id_token": "id_token",
              "refresh_token": "refresh_token",
              "expiry_date": "expiry_date"
            }
          };
          configOutput.tokens = await getTokenInfo();
          return configOutput;
    }

    async function buildClient(config) {
        let client = new google.auth.OAuth2(
            config.client_id,
            config.client_secret,
            config.redirect_url
        );
        
        client.setCredentials(config.tokens);
        return client;
    }

    async function requestImages (drive, client, folderId) {
        // Request all image files from folder
      drive.children.list({
        auth: client,
        folderId: folderId,
        q: "mimeType contains 'image' and trashed = false"
      }, function(error, response) {
        if (error) { return getNewToken(); }
        // console.log(response);
       
      
        response.data.items.forEach(function(item) {
            var file = fs.createWriteStream("./" + item.title);
            file.on("finish", function() {
                console.log("downloaded", item.title);
            });
            console.log(item);
            drive.files.get({fileId: item.id, alt: 'media'}, 
                {responseType: 'stream'})
                .then((res) => res.data.pipe(file))
                .catch(err => console.log(err));
          // Download file
        //   drive.files.get({
        //     auth: client,
        //     fileId: item.id,
        //     alt: "media"
        //   }).pipe(file);
        });
      });
    }
    
    //   var client = buildClient(),
    //       folderId = "folderId"; // The Google Drive Folder Id
      
    //   // Request all image files from folder
    //   drive.children.list({
    //     auth: client,
    //     folderId: folderId,
    //     q: "mimeType contains 'image' and trashed = false"
    //   }, function(error, response) {
    //     if (error) { return console.log("ERROR", error); }
      
    //     response.items.forEach(function(item) {
    //       var file = fs.createWriteStream("./" + item.title);
    //       file.on("finish", function() {
    //         console.log("downloaded", item.title);
    //       });
      
    //       // Download file
    //       drive.files.get({
    //         auth: client,
    //         fileId: item.id,
    //         alt: "media"
    //       }).pipe(file);
    //     });
    //   });
}
