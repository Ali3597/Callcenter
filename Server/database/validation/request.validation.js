const Joi = require("joi");

const requestValidation = Joi.object({
  message: Joi.string().min(15).required().messages({
    "string.base": "Le message n'est pas valide",
    "string.empty": "Vous n' avez pas de message dans la requête",
    "sting.min": "Votre message est trop court",
  }),
  customer: Joi.string().required().messages({
    "string.base": "'Vous n' avez associé cette requete a aucun client'",
  }),
  deadline: Joi.date().required().messages({
    "date.base": "Deadline invalide",
    "date.empty": "Deadline invalide",
  }),
  urgencyLevel: Joi.number().min(1).max(5).required().messages({
    "number.base": "le niveau d'urgnce n'est pas valide",
    "number.min": "Le niveau d'urgence doit être minimum égal a 1",
    "number.max": "Le niveau d'urgence doit $etre maximum égal a 5",
  }),
  typeof: Joi.string().min(2).required().messages({
    "string.base": "Veuillez renseigner le type de la requette",
    "string.empty": "Vous n' avez pas de  type dans la requête",
    "string.min": "Votre type est trop court",
  }),
});

module.exports = { requestValidation };
