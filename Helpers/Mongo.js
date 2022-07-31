class Mongoose {
  static Connect(URL) {
          require('mongoose').connect(URL, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: false
          }).then(() => {
            console.log("MongooDb Bağlantısı Kuruldu Hrrr", "mngdb")
          }).catch((err) => {
            console.log("MongoDb Bağlantısı Kurulamadı Miuw :( " + err, "mngdb");
          });
  }
}

module.exports = { Mongoose }