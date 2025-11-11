import { User } from "../model/user.model.js";

import  bcrypt  from 'bcrypt';
import  jwt  from 'jsonwebtoken';

const register = async function(req, res) {
    const { email, password } = req.body;

    const saltRounds = 10;


    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error hashing the password: ' + err);
        } else {
            console.log('Hashed password: ' + hash);
            return User.create({email: email, password: hash});
        }
    });

    

}
const login = async function(req, res) {
    
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
    if (!user)
        return res.code(404).send('user_not_found');

    const match = await bcrypt.compare(password, user.password);
    if (!match)
        return res.code(403).send('wrong_credentials');

    const expiresIn = 24 * 60 * 60;
    const token    = jwt.sign({
                        user: user
                    },
                    "RXCT34ZE5GFDSFD756",
                    {
                        expiresIn: expiresIn
                    });
                                
    res.header('Authorization', 'Bearer ' + token);
    return res.code(200).send(
    {
        user: user,
        token:'Bearer ' + token
    });

}



export {register, login}





// const generateAccessAndRefreshTokens = async(userId) => {
//     try {
//         const user = await User.findById(userId)
//         const accessToken = user.generateAccessToken();
//         const refreshToken = user.generateRefreshToken();
        
//         user.refreshToken = refreshToken;
//         await user.save({validateBeforeSave: false});
//         return {accessToken, refreshToken}
//     } catch(error) {
//         throw new ApiError((500, "Something went wrong while generating access token", []))
//     }
// }


// const registerUser = asyncHandler(async(req, res) => {
//     const {email, username, password, role} =  req.body;

//     const existingUser = await User.findOne({
//         $or: [{username}, {email}]
//     })

//     if (existingUser) {
//         throw new ApiError(409, "User with email or username already exist", [])
//     }

//     const user = await User.create({
//         email, 
//         password,
//         username,
//         isEmailVerified: false
//     });

//     const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken();

//     user.emailVerificationToken = hashedToken;
//     user.emailVerificationExpiry = tokenExpiry;

//     await user.save({validateBeforeSave: false})

//     await sendEmail(
//         {
//             email: user?.email,
//             subject: "Please verify your email",
//             mailgenContent: emailVerificationMailGenContent(
//                 user?.username, 
//                 `${req.protocol}://${req.get("host")}/api/v1/users/verify-email${unHashedToken}`
//             ),
//         });
    
//     const createdUser = await User.findById(user._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry");
//     if (!createdUser) {
//         throw new ApiError(500, "Something went wrong while registering the user");
//     }

//     return res.status(201).json(
//         new ApiResponse(200, {
//             user: createdUser,
//             message: "User registred successfully and verification email has been send on your email"
//         })
//     );

// })

// export { registerUser };