const apiResponse = require('../utils/apiResponse');
const User = require("../Models/User");
const Blog = require('../Models/Blog'); 
const { verifyToken } = require("../auth/jsonwebtoken");
require("dotenv").config();

exports.isUser = async (request, response, next) => {
    try{
           if(request.user.role !== "User") return apiResponse.validationError(response, "This is a protected route for User only")
           
           next();
    }
    catch(error) {
    return apiResponse.ErrorResponse(response, error.message)
    }
}

exports.isAdmin = async (request, response, next) => {
    try{    
          //  console.log("Printing role ", request.user.role);
          const data =  await verifyToken(request.body.token, process.env.AUTHTOKEN_SECRETKEY )
           if( data.role !== "Admin")  return apiResponse.validationError(response, "This is a protected route for Admin only")
           
           next();
    }
    catch(error) {
    return apiResponse.ErrorResponse(response, error.message)
    }
}

exports.isAdminOrOwner = async (request, response, next) => {
    try {
      const blogId = request.params.postId;
      if(!blogId) return apiResponse.validationError(response, "blogId needed");
      
      const blog = await Blog.findById(blogId).populate('author', 'role');
  
      if (!blog._doc) return apiResponse.notFoundResponse(response, "blog not found")
      
        const data =  await verifyToken(request.body.token, process.env.AUTHTOKEN_SECRETKEY )
      // Check if the user is the author or an Admin
      if ( blog._doc.author._id.toString() === data.id || blog._doc.author.role === data.role ) {
        return next();
      }
  
      return apiResponse.unauthorizedResponse(response, "Unauthorized user")
     
    } catch (error) {
      return apiResponse.somethingResponse(response, "something went wrong")
    }
  };
