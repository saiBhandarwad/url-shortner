const mongoose = require("mongoose")

const connectDB = (URL) =>{
    mongoose.connect(URL).then((res)=>{
        console.log("connection successful");
        
    }).catch((error)=>{
        console.log("error occured ", {error});
        
    })
}

module.exports = connectDB