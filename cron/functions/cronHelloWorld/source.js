exports = async function(arg){
  console.log("Received delete event", JSON.stringify(arg));
  console.log("Cron ran at : " + new Date());

  console.log("Re-inserting into database");
  
  // Get the service interface from context
  const mongodb = context.services.get("mongodb-atlas");
  const minute = mongodb.db("cron").collection("minute");
  try {
    const insertResult = await minute.insertOne({"createdAt": new Date()});
    console.log("Insert Result: " + JSON.stringify(insertResult, null, 2));
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  
  return;
}