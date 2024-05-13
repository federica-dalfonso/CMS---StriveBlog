//validazione POST nuovo articolo: 
export const validateNewPost = (req, res, next) => {
    //valori necessariamente richiesti:
    const {category, title, cover, readTime, author, content} = req.body;
    //salvo eventuali errori in un array:
    const errors = [];
    if(!category || typeof category !== "string") errors.push({ message : "'category' is required and it must be a string"}); 
    if(!title || typeof title !== "string") errors.push({ message : "'title' is required and it must be a string"}); 
    if(!cover || typeof cover !== "string") errors.push({ message : "'cover' is required and it must be a string"});

    if(!readTime || typeof readTime !== "object") {
        errors.push({ message : "'readTime' is required and it must be a object"});
    } else {
        if(!readTime.value || typeof readTime.value !== 'number') {
          errors.push({ message : "'value' is required and it must be a number"});
        }
        if(!readTime.unit || typeof readTime.unit !== 'string') {
          errors.push({ message : "'unit' is required and it must be a string"});
        }
    };

    if(!author | typeof author !== "string") {
        errors.push({ message : "'author' is required and it must be a string!"});
    };

    if(!content || typeof content !== "string") errors.push({ message: "'content' is required and it must be a string"});

    if ( errors.length > 0 ) {
        const err = new Error("Missing or invalid data");
        err.status = 400; //status code BadRequest
        err.errorList = errors;
        return next(err);
    }

    next();
};

//validazione PUT modifica articolo
export const validateModifyPost = (req, res, next) => {
    //valori necessariamente richiesti:
    const {category, title, cover, readTime, author, content} = req.body;
    //salvo eventuali errori in un array:
    const errors = [];
    if(category && typeof category !== "string") errors.push({ message : "'category' must be a string"}); 
    if(title && typeof title !== "string") errors.push({ message : "'title' must be a string"}); 
    if(cover && typeof cover !== "string") errors.push({ message : "'cover' must be a string"});

    if (readTime) {
       if(typeof readTime !== "object") {
        errors.push({ message : "'readTime' must be a object"});
    } else {
        if(readTime.value && typeof readTime.value !== 'number') {
          errors.push({ message : "'value' must be a number"});
        }
        if(readTime.unit && typeof readTime.unit !== 'string') {
          errors.push({ message : "'unit' must be a string"});
        }
    }
    };
    
    if(!author | typeof author !== "string") {
        errors.push({ message : "'author' is required and it must be a string!"});
    };

    if(content && typeof content !== "string") errors.push({ message: "'content' must be a string"});

    if ( errors.length > 0 ) {
        const err = new Error("Invalid data type");
        err.status = 400; //status code BadRequest
        err.errorList = errors;
        return next(err);
    }
    
    next();
}