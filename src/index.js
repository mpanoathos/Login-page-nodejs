const express=require('express')
const path=require('path')
const bcrypt=require('bcrypt')
const collection=require('./config')

const app=express()
//convert data into json format
app.use(express.json())
app.use(express.urlencoded({extend:false}))

//use EJS as a view engine
app.set('view engine','ejs')
//static
app.use(express.static('public'))
app.get('/',(req,res)=>{
    res.render('login')
})
app.get('/signup',(req,res)=>{
    res.render('signup')
})
//register user
app.post('/signup',async(req,res)=>{
    const data={
        name:req.body.username,
        password:req.body.password
    }
    //check if userdata already exists
    const existingUSer=await collection.findOne({name: data.name})
    if(existingUSer){
        res.send("User already exists. Please choose a different username.")
    }
    else{
        //hash the password using bcrypt
        const saltRounds=10;//Number of salt round bcrypt
        const hashedPassword=await bcrypt.hash(data.password,saltRounds)

        data.password=hashedPassword //replace the hash password with original password
    const userdata= await collection.insertMany(data)
    console.log(userdata)
    }
})
//login user
app.post('/login', async(req,res) => {
    try{
        const check=await collection.findOne({name:req.body.username});
        if(!check){
            res.send("username cannot be found")
        }
        //compare hash password from database with the plain text
        const isPasswordMatch=await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            res.render('home')
        }
        else{
            res.send('Wrong password')
        }
    }
    catch(error){
        res.send('Wrong details')
    }
})
const port=5000
app.listen(port,()=>{
    console.log(`Server running on ${5000}`)
})