const google = require("googleapis");
const fs = require("fs");



const drive = google.drive_v2;

const SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/documents'];
const TOKEN_PATH = 'token.json';

run();
console.log(process.env.GOOGLE_OAUTH_CLIENT_ID);
async function run() {
    console.log(process.env.GOOGLE_OAUTH_CLIENT_ID);
    async function getConfig() {
        console.log(process.env.GOOGLE_OAUTH_CLIENT_ID);
        const output = {
            "client_id": process.env.GOOGLE_OAUTH_CLIENT_ID,
            "client_secret": process.env.GOOGLE_OAUTH_CONSUMER_SECRET,
            "scope": SCOPES,
            "redirect_url": process.env.GOOGLE_OAUTH_REDIRECT_URI,
            "tokens": {
              "access_token": "access_token",
              "token_type": "Bearer",
              "id_token": "id_token",
              "refresh_token": "refresh_token",
              "expiry_date": "expiry_date"
            }
          };

          output.tokens = await new Promise((res, rej) => {
              fs.readFile(TOKEN_PATH, (err, token) => {
                if (err) rej(err)
                res(JSON.parse(token));
              })
          })
          return output;
    }

    const config = await getConfig();
    console.log(config);
      
      function buildClient() {
        var client = new google.auth.OAuth2(
          config.client_id,
          config.client_secret,
          config.redirect_url
        );
        client.setCredentials(config.tokens);
        return client;
      }
      
      var client = buildClient(),
          folderId = "folderId"; // The Google Drive Folder Id
      
      // Request all image files from folder
      function requestImages () {
          drive.children.list({
              auth: client,
              folderId: folderId,
              q: "mimeType contains 'image' and trashed = false"
            }, function(error, response) {
              if (error) { return console.log("ERROR", error); }
            
              response.items.forEach(function(item) {
                var file = fs.createWriteStream("./" + item.title);
                file.on("finish", function() {
                  console.log("downloaded", item.title);
                });
            
                // Download file
                drive.files.get({
                  auth: client,
                  fileId: item.id,
                  alt: "media"
                }).pipe(file);
              });
            });
      }
}


