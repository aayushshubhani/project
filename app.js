const express=require("express");
const app=express();
const port=8080;
const listing=require("../project/models/listing");
const path = require('path');
const methodOverride=require("method-override");
const ejsmate=require("ejs-mate");

const mongoose=require("mongoose");
const Mongo_url="mongodb://127.0.0.1:27017/wanderlust";


main()
.then(()=>{
    console.log("connected to DB");
})
.catch(err=>{
    console.log(err);
});


async function main() {
    await mongoose.connect(Mongo_url);
};
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"))
app.engine("ejs",ejsmate);
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.static('public'));




app.get("/",(req,res)=>{
    res.send("Hi!!! I am root, Check your page address");
});
app.get("/listings",async(req,res)=>{
    const alllistings=await listing.find({});
    res.render("listing/index.ejs",{alllistings});
    
});
app.get("/listings/new",(req,res)=>{
    res.render("listing/new.ejs");
});
app.post("/listings",async(req,res)=>{
    const allListing=new listing ( req.body.Listing);
    await allListing.save();
    res.redirect("/listings");
});
app.get("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    const Listing=await listing.findById(id);
    res.render("listing/show.ejs",{Listing});
});
app.get("/listings/:id/edit",async(req,res)=>{
    let{id}=req.params;
    const Listing=await listing.findById(id);
    res.render("listing/edit.ejs",{Listing});
});
app.put("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    await listing.findByIdAndUpdate(id,{...req.body.Listing}); 
    res.redirect("/listings");
});
app.delete("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listings");
});



app.listen(port,()=>{
console.log(`server is listening on port:${port}`);
});    