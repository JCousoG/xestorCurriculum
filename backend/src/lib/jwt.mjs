import jwt from "jsonwebtoken"

const JWT_SUBJECT = {
    EMAIL_VALIDATION: "email-validation", // Para a verificación do correo no rexistro
    USER_AUTHENTICATION: "user-authentication", // Para correos inicio sesión
    USER_AUTHORIZATION: "user-authorization", // Para a aoutorización de acceso despois do inicio de sesion
}

const JWT_SECRET = process.env.JWT_SECRET ?? "secret"

function newUserAuthorizationJWT(userId) {
    const payload = {id: userId}
    const options = {subject: JWT_SUBJECT.USER_AUTHORIZATION}
    return jwt.sign(payload, JWT_SECRET, options)
}

function newEmailValidationJWT(email) {
    const payload = {email}
    const  options = {subject: JWT_SUBJECT.EMAIL_VALIDATION }
    return jwt.sign(payload, JWT_SECRET, options)
}

function newUserAuthenticationJWT(user) {
    const payload = {id: user.id}
    const options = {subject: JWT_SUBJECT.USER_AUTHENTICATION}
    return jwt.sign(payload,JWT_SECRET, options)
}

export {
    jwt,
    JWT_SUBJECT,
    JWT_SECRET,
    newUserAuthorizationJWT,
    newEmailValidationJWT,
    newUserAuthenticationJWT
}