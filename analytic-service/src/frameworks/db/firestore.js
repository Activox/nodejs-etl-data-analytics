const { Firestore } = require("@google-cloud/firestore");

function createFirestoreClient() {
  return new Firestore();
}

module.exports = createFirestoreClient;
