module.exports = {
  DB: process.env.MONGO_URL
    ? process.env.MONGO_URL
    : "mongodb+srv://shani:aqsPa86HMrQfpvxY@measstackdbcluster-wn3iz.mongodb.net/NaturalFoods?retryWrites=true&w=majority",
  PORT: process.env.PORT ? process.env.PORT : 8080,
  JsonSecretKey: "sgdfhgjkgdfuawiygefkjahsdfuaoser",
};
