const mongoose=require("mongoose");
const initdata=require ("../init/data.js");
const listing=require ("../models/listing.js")
const Mongo_url="mongodb://127.0.0.1:27017/wanderlust";


main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});


async function main() {
    await mongoose.connect(Mongo_url);
}


const initDB=async ()=>{
    await listing.deleteMany({});
    await listing.insertMany(initdata.data);
    console.log("data was intialized");
}
initDB();