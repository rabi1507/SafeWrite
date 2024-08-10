 function successResponse (res, msg) {
	var responseData = {
		status: 200,
		message: msg
	};
	logResponse(responseData)
	return res.status(200).json(responseData);
}
 function partialSuccessResponse (res, msg) {
	var responseData = {
		status: 206,
		message: msg
	};
	logResponse(responseData)
	return res.status(206).json(responseData);
}
 function successResponseWithData (res, msg, data) {
	var responseData = {
		status: 200,
		message: msg,
		data: data
	};
	logResponse(responseData)
	return res.status(200).json(responseData);
}

function ErrorResponse (res, msg, err) {
	var responseData = {
		status: 500,
		message: msg,
		Error:err
	};
	logResponse(responseData)
	return res.status(500).json(responseData);
}

function notFoundResponse (res, msg) {
	var responseData = {
		status: 404,
		message: msg,
	};
	logResponse(responseData)
	return res.status(404).json(responseData);
}

 function validationErrorWithData (res, msg, data) {
	var responseData = {
		status: 400,
		message: msg,
		data: data
	};
	logResponse(responseData)
	return res.status(400).json(responseData);
}

 function validationError (res, msg) {
	var responseData = {
		status: 400,
		message: msg
	};
	logResponse(responseData)
	return res.status(400).json(responseData);
}

 function unauthorizedResponse (res, msg) {
	var responseData = {
		status: 401,
		message: msg,
	};
	logResponse(responseData)
	return res.status(401).json(responseData);
}
 function duplicateResponse (res, msg) {
	var responseData = {
		status: 409,
		message: msg,
	};
	logResponse(responseData)
	return res.status(responseData.status).json(responseData);
}

 function customResponse (res, msg, data, info) {
	var responseData = {
		status: 400,
		message: msg,
		data:data,
		info,
	};
	logResponse(responseData)
	return res.status(400).json(responseData);
}
 function somethingResponse (res,info) {
	var responseData = {
		status: 400,
		message: "Something went wrong! Please try again later.",
		info
	};
	logResponse(responseData)
	return res.status(400).json(responseData);
}

function logResponse(responseData){
	console.error("=======================================================\n");
}

module.exports = {
    successResponse,
    partialSuccessResponse,
    successResponseWithData,
    ErrorResponse,
    notFoundResponse,
    validationErrorWithData,
    validationError,
    unauthorizedResponse,
    duplicateResponse,
    customResponse,
    somethingResponse
};
