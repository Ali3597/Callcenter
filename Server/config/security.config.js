
// Ce package est utilisé par cookie-parser d’Express
// Nous pouvons donc directement l’utiliser :
const cookieParser = require("cookie");
// Notre fonction pour vérifier et décoder le token JWT :
const { decodeJwtToken } = require("./jwt.config");
// Notre fonction pour récupérer l’utilisateur de la base de données :
const { findWorkerPerId } = require("../queries/workers.queries");

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).redirect("/auth/signin/form");
  }
};

exports.ensureAuthenticatedOnSocketHandshake = async (request, success) => {
  try {
    // Nous récupérons le cookie depuis les headers de la requête et nous
    // le parsons pour l’avoir sur un object JavaScript :
    const cookies = cookieParser.parse(request.headers.cookie || "");
    // Si nous avons un cookie contenant le token JWT :
    if (cookies && cookies.jwt) {
      // Nous vérifions et décodons le token :
      const decodedToken = decodeJwtToken(cookies.jwt);
      // Nous pouvons alors récupérer l’id de l’utilisateur sur le token 
      // et l’utiliser pour récupérer l’utilisateur entier depuis la DB :
      const user = await findWorkerPerId(decodedToken.sub);
      // Si nous récupérons un utilisateur de la DB :
      if (user) {
        // Nous le plaçons sur l’objet requête : 
        request.user = user;
        // Et nous appelons la fonction de rappel en lui passant aucune erreur,
        // et true pour autoriser le handshake :   
        success(null, true);
      } else {
        // Sinon nous retournons un code d’erreur car aucun utilisateur
        // n’a pu être trouvé dans la DB pour l’ID
        success(400, false);
      }
    } else {
      // Si nous n’avons pas de cookie, alors la requête n’est
      // pas authentifiée et nous refusons le handshake :  
      success(403, false);
    }
  } catch (e) {
      // Si il y a une erreur lors de la vérification du token JWT
      // par exemple en cas d’expiration, nous refusons le handshake :
    success(400, false);
  }
};