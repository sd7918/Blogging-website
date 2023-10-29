const express = require('express');
const path = require ('path');
const fileupload = require ('express-fileupload');

let initial_path = path.join(__dirname,"public/");

const app = express();
app.use(express.static('public'));
app.use(fileupload());

app.get('/',(req,res) => {
res.sendFile(path.join(initial_path,"html/home.html"));
})

app.get('/editor',(req,res) => {
    res.sendFile(path.join(initial_path,"html/editor.html"));
    })

app.post('/upload', (req, res)=>{
    let file =req.files.image;
    let date =new Date();
    let imagename = date.getDate() + date.getTime() + file.name;
    let path='public/upload/'+imagename;

    file.mv(path,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(`upload/${imagename}`)
        }
    })
})

app.get("/:blog",(req,res)=>{
    res.sendFile(path.join(initial_path,"html/blog.html"));
})

app.use((req,res)=>{
    res.json("404");
})

app.listen("3000",() =>{
    console.log("listening....")
})









