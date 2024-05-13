//validazione del nuovo commento di un post:
export const validateNewComment = (req, res, next) => {
    // valori richiesti: 
    const { author, content } = req.body;

    //array per errori:
    const errors = [];

    if (!author || typeof author !== "string") errors.push({ message : "'author' is required and it must be a string"});
    if (!content || typeof content !== "string") errors.push({ message : "'content' is required and it must be a string"});

    if ( errors.length > 0 ) {
        const err = new Error("Missing or invalid data");
        err.status = 400;
        err.errorList = errors;
        return next(err);
    }

    next();
};

// validazione di una put di un commento:
export const validateModifyComment = (req, res, next) => {

    //valori da controllare:
    const {author, content} = req.body;

    //array per eventuali errori:
    const errors = [];

    if (!author || typeof author !== "string") errors.push({ message : "'author' is required and it must be a string"});
    if (!content || typeof content !== "string") errors.push({ message : "'content' is required and it must be a string"});

    if ( errors.length > 0 ) {
        const err = new Error("Missing or invalid data");
        err.status = 400; //status code BadRequest
        err.errorList = errors;
        return next(err);
    }

    next();

};