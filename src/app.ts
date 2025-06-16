import { Server } from "./presentation/server";
import { envs } from "./config/plugins/env.plugins";
import { LogModel, MongoDatabase } from "./data/mongo"; 

//Funcion anonima auto invocada
(async() =>{
  main();
})();

async function main() {
  
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_BD_NAME,
  });

  // crear una coleccion y documento
  // const newLog = await LogModel.create({
  //   message: 'Test message desde mongo',
  //   origin: 'App.ts',
  //   level: 'low'
  // });
  // await newLog.save();
  // console.log(newLog);
  Server.start();
  //console.log( envs );
}