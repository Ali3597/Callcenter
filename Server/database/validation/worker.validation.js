const Joi = require("joi");

const workerInfoValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Veuillez renseignez un email valide",
    "string.email": "Veuillez renseignez un email valide",
  }),
  username: Joi.string().min(1).required().messages({
    "string.base": "Le  nom n'est pas valide",
    "string.empty": "Vous n' avez pas de nom ",
    "sting.min": "Votre nom est trop court",
  }),
});

const workerPasswordValidation = Joi.object({
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$"))
    .required()
    .messages({
      "string.base": "Veuillez renseignez un mot de passe",
      "string.pattern.base":
        "Le mot de passe doit contenir au moint une lettre , un nombre et être au minimum de 8 caractères",
    }),
});

const workerSignupValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Veuillez renseignez un email valide",
    "string.email": "Veuillez renseignez un email valide",
  }),
  username: Joi.string().min(1).required().messages({
    "string.base": "Le  nom n'est pas valide",
    "string.empty": "Vous n' avez pas de nom pour ce client",
    "sting.min": "Votre nom est trop court",
  }),
  number: Joi.string().min(1).required().messages({
    "string.base": "Le  numero n'est pas valide",
    "string.empty": "Vous n' avez pas de numero ",
    "sting.min": "Votre numero est trop court",
  }),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$"))
    .required()
    .messages({
      "string.base": "Veuillez renseignez un mot de passe",
      "string.pattern.base":
        "Le mot de passe doit contenir au moint une lettre , un nombre et être au minimum de 8 caractères",
    }),
});

module.exports = { workerInfoValidation, workerPasswordValidation };
