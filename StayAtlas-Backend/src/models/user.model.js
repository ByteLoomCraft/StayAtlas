import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema = new Schema(
    {
        firstName:{
            type:String,
            require:true,
            lowercase:true,
            trim:true,
            index:true
        },
        lastName:{
            type:String,
            require:true,
            lowercase:true,
            trim:true,
            index:true 
        },
        phoneNumber: {
            type: String,
            required: [true, 'Phone number is required'],
            match: [/^\d{10}$/, 'Phone number must be 10 digits'], 
            unique: true, 
            trim: true
        },
        email: {
            type: String,
            lowecase: true,
            trim: true, 
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        role: {
            type: String,
            enum: ['defaultUser', 'villaOwner', 'admin'],
            required: true,
            default: 'defaultUser'  
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps:true,
        versionKey:false
    }
)

userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
          _id: this._id,
          email: this.email,
          phoneNumber: this.phoneNumber,
          role: this.role
            
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema)