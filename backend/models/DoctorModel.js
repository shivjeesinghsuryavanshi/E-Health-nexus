const { Schema, model} = require('../connection');

const mySchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    speciality : {type : String , default : "unknown"},
    price : {type : Number, default : 0},
    experience : {type : String , default : "unknown"}, 
    gender:{type : String , default : "unknown"},
    certification : {type : String , default : "unknown"},
    createdAt : { type : Date, default: Date.now} // added createdAt field

})

module.exports = model('doctors', mySchema);