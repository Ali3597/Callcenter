const Joi = require("joi");

const customerValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Veuillez renseignez un email valide",
    "string.empty": "Veuillez renseignez un email valide",
    "string.email": "Veuillez renseignez un email valide",
  }),
  name: Joi.string().min(1).required().messages({
    "string.base": "Le  nom n'est pas valide",
    "string.empty": "Vous n' avez pas de nom pour ce client",
    "sting.min": "Votre nom est trop court",
  }),
  number: Joi.string().min(1).required().messages({
    "string.base": "Le  numero n'est pas valide",
    "string.empty": "Vous n' avez pas de numero pour ce client",
    "sting.min": "Votre numer est trop court",
  }),
});

module.exports = { customerValidation };
