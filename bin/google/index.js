import { google } from 'googleapis';
import { parseEnv } from 'node:util';
import { readFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { parseGoogle } from './parse.js';

const local = parseEnv(readFileSync('.env', 'utf-8'));
const { document_id } = JSON.parse(readFileSync('google.json', 'utf-8'));

// Path to the service account JSON key. Override in .env if you like.
const KEY_FILE = local.GOOGLE_SERVICE_ACCOUNT_KEY || 'service-account.json';

// Reading a doc only needs read-only access.
const SCOPES = ['https://www.googleapis.com/auth/documents.readonly'];

const DOCUMENT_ID = document_id;

// Service accounts authenticate via a signed JWT — no browser, no token cache.
// The service account's email must be shared on the doc (as Viewer).
function authorize() {
  return new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: SCOPES,
  });
}

async function main(auth) {
  const client = google.docs({ version: 'v1', auth });
  const { data } = await client.documents.get({ documentId: DOCUMENT_ID });

  const parsed = await parseGoogle(data);

  await writeFile('src/page.json', JSON.stringify(parsed, null, 2));
  console.log('Wrote parsed document to src/page.json');
}

main(authorize()).catch((err) => {
  console.error(err);
  process.exit(1);
});
