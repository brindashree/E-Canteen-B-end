var mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
var Schema = mongoose.Schema;

var userSchema = new Schema({
 name:{
     type:String,
     required:true,
     maxlength:32,
     trim:true,
 },
 
 email:{
     type:String,
     trim:true,
     required:true,
     unique:true,
        },
 
 encry_password:{
    type:String,
    required:true,
 },
        salt: String,
 //roles : 0-user,1-teacher,2-admin
 role:{
     type:Number,
     default:0,
 },
 purchases:{
     type:Array,
     default:[],
 },
},{
    timestamps: true,
}
);
//virtual fields to store the plain text password ...not hashed.
userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv1();//to populate the salt stated in schema above.
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })

//create methods using syntax - schema.method{...};
userSchema.methods = {

    //passing methods name and implementation if any
    securePassword:function(plainpassword){
        if(!plainpassword) return "";
        try{
           return crypto.createHmac('sha256',this.salt)
           .update(plainpassword)
           .digest("hex");
        }catch (err){
            return "";
        }
    },

    //authentication
    authenticate:function(plainpassword){
        return this.securePassword(plainpassword)===this.encry_password;
    },


};
//export the model userSchema as User
module.exports = mongoose.model("User",userSchema);