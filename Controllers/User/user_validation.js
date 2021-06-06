const Joi = require('@hapi/joi');

var userValidations = {
    validateInsertPArams:(params) =>{
        const userSchema = Joi.object({
            name:Joi.string()
                    .alphanum()
                    .min(3)
                    .required(),
            mobile:Joi.string()
                      .regex(/^[0-9]{8,10}$/,'Phone number must have min-8 numbers and max-10 numbers.')
                      .required(),
            emailID:Joi.string()
                       .email()
                       .lowercase()
                       .required(),
            password:Joi.string()
                        .min(8)
                        .regex(/[0-9]{1}/, 'number missing')
                        .regex(/[a-zA-Z]{6}/, 'lower-case')
                        .regex(/[^\w]{1}/, 'special character')
        });
        return userSchema.validate(params);
    }
}

module.exports = userValidations;