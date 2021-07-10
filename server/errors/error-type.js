let ErrorType = {
    GENERAL_ERROR : {id: 1, httpCode: 600, message : "Oh No! Something Went Wrong", isShowStackTrace: true},
    USER_NAME_ALREADY_EXIST : {id: 2, httpCode: 601, message : "User name already exist", isShowStackTrace: false},
    UNAUTHORIZED : {id: 3, httpCode: 401, message : "You tried to insert, invalidate field", isShowStackTrace: false},
    USER_NAME_IS_NOT_EMAIL :{id: 4, httpCode: 602, message : "Invalid user name, username is not validated as an email address", isShowStackTrace: false},
    USER_NAME_UNDEFINED : {id: 5, httpCode: 603, message : "Missing a field, missing value: username", isShowStackTrace: false},
    PASSWORD_UNDEFINED : {id: 6, httpCode: 604, message : "Missing a field, missing value: password", isShowStackTrace: false},
    UNAUTHORIZED_STATUS : {id: 7, httpCode: 605, message : "You are not authorize to view or do this current action", isShowStackTrace: true},
    MISSING_A_FIELD : {id: 8, httpCode: 606, message : "Missing a field, missing value: password", isShowStackTrace: false},
    PASSWORD_TOO_LONG : {id: 9, httpCode: 607, message : "Invalid password, password is too long", isShowStackTrace: false},
    PASSWORD_TOO_SHORT : {id: 10, httpCode: 608, message : "Invalid password, password is too short", isShowStackTrace: false},
    FIRST_NAME_UNDEFINED : {id: 11, httpCode: 609, message : "Missing a field, missing value: firstName", isShowStackTrace: false},
    LAST_NAME_UNDEFINED : {id: 12, httpCode: 610, message : "Missing a field, missing value: lastName", isShowStackTrace: false},
    DESCRIPTION_UNDEFINED : {id: 13, httpCode: 611, message : "Missing a field,  missing value: description", isShowStackTrace: false},
    DESTINATION_UNDEFINED : {id: 14, httpCode: 612, message : "Missing a field,  missing value: destination", isShowStackTrace: false},
    RESORT_NAME_UNDEFINED : {id: 15, httpCode: 613, message : "Missing a field,  missing value: resort name", isShowStackTrace: false},
    IMAGE_UNDEFINED : {id: 16, httpCode: 614, message : "Missing a field,  missing value: image", isShowStackTrace: false},
    START_DATE_UNDEFINED : {id: 17, httpCode: 615, message : "Missing a field,  missing value: start date", isShowStackTrace: false},
    END_DATE_UNDEFINED : {id: 18, httpCode: 616, message : "Missing a field,  missing value: end date", isShowStackTrace: false},
    PRICE_UNDEFINED : {id: 19, httpCode: 617, message : "Missing a field,  missing value: price", isShowStackTrace: false},
    RESORT_NAME_ALREADY_EXIST : {id: 20, httpCode: 618, message : "Resort name already exist", isShowStackTrace: false},
    CACHE_MODULE_RESET : {id: 21, httpCode: 619, message : "A Problem Occurred And You Are Currently Not Logged-In", isShowStackTrace: true}
}



module.exports = ErrorType;