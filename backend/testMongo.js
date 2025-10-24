const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://digompap_db_user:mlkyBCYRsZTLwJ0U@cluster0.yu9x93y.mongodb.net/ProyectoDB?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  tls: true,
  tlsAllowInvalidCertificates: true, // Solo para desarrollo en Windows
});

async function test() {
  try {
    await client.connect();
    console.log("✅ Conectado a MongoDB Atlas");
  } catch (err) {
    console.error("❌ Error al conectar con MongoDB:", err);
  } finally {
    await client.close();
  }
}

test();
