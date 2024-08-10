const apiResponse = require('../utils/apiResponse')
const bcrypt = require('bcrypt')
const User = require("../Models/User")
const { generateToken, verifyToken  } = require('../auth/jsonwebtoken')
const signup = async (request, response) => {
	try {
		const { name, email, password, role } = request.body;
		if ( !name || !email ||!password || !role) return apiResponse.validationError(response, "all data is required")
			
		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser._doc)  return apiResponse.somethingResponse(response, "Email all ready exist")
		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);
		// Create the user
        const userData = {
            name: name,
            password:hashedPassword,
            email:email,
            role:role
        }
        const userCreated = await User.create(userData);
        if(!userCreated._doc) return apiResponse.somethingResponse(response, "something went wrong ");
		return apiResponse.successResponse(response, "account created successfully")
	} catch (error) {
        return apiResponse.somethingResponse(error, error.message)
	}
};
const login = async (request, response) => {
	try {
		// Get email and password from request body
		const { email, password } = request.body;

		// Check if email or password is missing
		if (!email || !password) return apiResponse.validationError(response, "credentils are not correct")
		// Find user with provided email
		const user = await User.findOne({ email });
		let token = "";
		// If user not found with provided email
		if (!user._doc) return apiResponse.unauthorizedResponse(response, "not authorized please registered first")

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user._doc.password)) {
			 token = await generateToken(
				// payload
				{ email: user._doc.email, id: user._doc._id, role: user._doc.role },
				//secretKey
				process.env.AUTHTOKEN_SECRETKEY,
				//expiresIn
					24 * 60 * 60,
			);

			// request.body.token = token;
		} else return apiResponse.unauthorizedResponse(response, "password is not correct");
		return apiResponse.successResponseWithData(response, "login successfully", token)
	} catch (error) {
		console.error(error);
		return apiResponse.somethingResponse(response, "something went wrong please try later")
	}
};

const isRegister = async(request, response, next)=>{
	try {
		const { email } = request.body;
		// Check if the email field is present
		if (!email) return apiResponse.validationError(response, "Please provide email")
		// Check if the user already exists
		const existingUser = await User.findOne({ email });
		if (!existingUser._doc) return apiResponse.notFoundResponse(response, "user not found")
		next();
	  } catch (error) {
		console.error(error);
		return apiResponse.somethingResponse(response, "Something went wrong")
	  }
}
const isLogin = async (request, response, next)=>{
	const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)  return apiResponse.unauthorizedResponse(response,"Unauthorized")
    try {
		const result = await verifyToken(token, process.env.AUTHTOKEN_SECRETKEY);
		if (!result.exp) {
		  throw new Error("Token is invalid");
		}
		request.body.token = token;
		return next();
	  } catch (error) {
		return apiResponse.unauthorizedResponse(response, "Unauthorized");
	  }
}




module.exports = {
	signup, 
	login,
	isRegister,
	isLogin,
};