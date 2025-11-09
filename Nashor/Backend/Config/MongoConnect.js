const mongoose = require('mongoose');
//Realizado correção na conexão com o banco de dados MongoDB 
// para pegar a variável de ambiente. 


const connectDB = async () => {
  try{
    const conect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB esta conectado: ${conect.connection.host}`)
  
  } catch (error){
    console.error(`error: ${error.message}`)
    process.exit(1)
  }

};

module.exports = connectDB;