const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,(err)=>{
    if(!err){
        console.log("MONGODB Connection succeeeded");

    }else{
        console.log("Error in mongodb connection:"+ JSON.stringify(err, undefined,2));
    }
});