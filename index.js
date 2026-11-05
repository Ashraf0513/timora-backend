require("node:dns").setServers(["8.8.8.8", "8.8.4.4"]);
const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://okbro74518_db_user:284MrCpZrW7RUMjU@cluster0.mjiu8sw.mongodb.net/timora?retryWrites=true&w=majority")
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log("failed database",err.message))

const contactSchema=new mongoose.Schema({
    name:String,
    email:String,
    option:String,
    msg:String,
},{timestamps:true})

const contact =mongoose.model("contact",contactSchema);

app.post("/about",async function(req,res){
    try{
        const {name,email,option,msg}=req.body;
        await contact.create({name,email,option,msg});
        res.status(201).json({message:"Saved"});
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:"Failed to save"})
    }
})

module.exports=app;

if(require.main===module){
app.listen(5000,function(){
    console.log("Sever is Started......")
})
}
