import jwt from "jsonwebtoken"

const JWT_ISSUES = {
    EMAIL_VALIDATION: "email-validation", // Para a verificación do correo no rexistro
    USER_AUTHENTICATION: "user-authentication", // Para correos inicio sesión
    USER_AUTHORIZATION: "user-authorization", // Para a aoutorización de acceso despois do inicio de sesion
}

const JWT_SECRET = process.env.JWT_SECRET ?? "secret"

function newUserAuthorizationJWT(user) {
    payload = {id: user.id}
    options = {issue: JWT_ISSUES.USER_AUTHORIZATION}
    return jwt.sign(payload, JWT_SECRET, options)
}

export {
    JWT_ISSUES,
    JWT_SECRET,
    newUserAuthorizationJWT
}