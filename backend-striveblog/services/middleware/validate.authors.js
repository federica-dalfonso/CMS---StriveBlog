// validazione POST newAuthor:
export const validateNewAuthor = (req, res, next) => {

    const {name, surname, email, password, birth} = req.body;

    const errors = [];
    
    if(!name || typeof name !== "string") {
        errors.push({ message : "'name' is required and it must be a string"});
    };
    if(!surname || typeof surname !== "string") {
       errors.push({ message : "'surname' is required and it must be a string"}) 
    }; 
    if(!email || typeof email !== "string") {
        errors.push({ message : "'email' is required and it must be a string"});
    };
    if(!birth || typeof birth !== "string") {
        errors.push({ message : "'birth' is required and it must be a string"});
    };
    if(!password || typeof password !== "string" || password.length < 8) {
        errors.push({ message: "'password' is required, it must be a string and it must be at least 8 char long"})
    };

    if ( errors.length > 0 ) {
        const err = new Error("Missing or invalid datatype");
        err.status = 400;
        err.errorList = errors;
        return next(err);
    }

    next();
};

export const validateModifyAuthor = (req, res, next) => {
    //valori da controllare:
    const {name, surname, email, password, birth} = req.body;
    //array per eventuali errori:
    const errors = [];

    if(!name || typeof name !== "string") {
        errors.push({ message : "'name' is required and it must be a string"});
    };
    if(!surname || typeof surname !== "string") {
       errors.push({ message : "'surname' is required and it must be a string"}) 
    }; 
    if(!email || typeof email !== "string") {
        errors.push({ message : "'email' is required and it must be a string"});
    };
    if(!birth || typeof birth !== "string") {
        errors.push({ message : "'birth' is required and it must be a string"});
    };
    if(!password || typeof password !== "string" || password.length < 8) {
        errors.push({ message: "'password' is required, it must be a string and it must be at least 8 char long"})
    };

    if ( errors.length > 0 ) {
        const err = new Error("Invalid data type");
        err.status = 400; //status code BadRequest
        err.errorList = errors;
        return next(err);
    }
    
    next();
}

export const validateLogin = (req, res, next) => {

    const { email, password } = req.body; 

    const errors = [];

    if(!email || typeof email !== "string") {
        errors.push({ message : "'email' is required and it must be a string"});
    };
    if(!password || typeof password !== "string" || password.length < 8) {
        errors.push({ message: "'password' is required, it must be a string and it must be at least 8 char long"})
    };

    if ( errors.length > 0 ) {
        const err = new Error("Missing or invalid datatype");
        err.status = 400;
        err.errorList = errors;
        return next(err);
    }

    next();


}