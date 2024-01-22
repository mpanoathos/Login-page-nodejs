const mongoose=require('mongoose')
const connect= mongoose.connect('mongodb+srv://athos:barera0009@cluster0.myuobr9.mongodb.net/?retryWrites=true&w=majority')
connect.then(()=>{
    console.log("Database connected succesfully")
})
.catch((error)=>{
    console.log(error)
})
//create a schema
const Loginschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
//collection part
const collection=new mongoose.model('users',Loginschema)
module.exports=collection;