import Joi from 'joi';

class AuthValidation {
  static registerValidation() {
    return Joi.object({
      email: Joi.string().email().required().messages({
        'string.base': 'Email should be a type of text',
        'string.empty': 'Email is required',
        'string.email': 'Invalid email format'
      }),
      password: Joi.string().min(6).required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters'
      })
    });
  }

  static loginValidation() {
    return Joi.object({
      email: Joi.string().email().required().messages({
        'string.base': 'Email should be a type of text',
        'string.empty': 'Email is required',
        'string.email': 'Invalid email format'
      }),
      password: Joi.string().required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password is required'
      })
    });
  }
}

export { AuthValidation };
