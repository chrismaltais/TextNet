const fs = require('fs');
const path = require('path');

let google_key = {
  "type": "service_account",
  "project_id": process.env.G_PROJECT_ID,
  "private_key_id": process.env.G_PRIVATE_KEY_ID,
  "private_key": process.env.G_PRIVATE_KEY,
  "client_email": process.env.G_CLIENT_EMAIL,
  "client_id": process.env.G_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.G_CLIENT_CERT_URL
}

let helper_path = path.join(__dirname, '/../helpers') + '/google_key.json';

const G_key_string = JSON.stringify(google_key);

fs.writeFileSync(helper_path, G_key_string);
