import * as Validator from "validator";

const blacklistedPasswords = [
    "12345678",
    "abcdefgh",
    "abcdefghijklmnopqrstuvwxyz",
    "qwert123",
    "asdasd123",
    "asdasdasd",
    "testtest",
    "helloworld",
    "password",
    "87654321",
];

function validateName(name = "") {
    if (!Validator.isLength(name, { min: 2, max: 32 })) {
        return "First and Last name must be between 2 and 32 characters.";
    }

    if (!Validator.isAlpha(name)) {
        return "First and Last name only can contain A-Z a-z";
    }
}

function validateOrgName(name = "") {
    if (!Validator.isLength(name, { min: 2, max: 32 })) {
        return "Organization name must be between 2 and 32 characters.";
    }

    if (!Validator.isAlphanumeric(name.replace(/\_/g, "").replace(/ /g, ""))) {
        return "Organization name only can contain A-Z a-z 0-9 _ and Spaces";
    }
}

function validateProjectName(name = "") {
    if (!Validator.isLength(name, { min: 1, max: 32 })) {
        return "Project name must be between 2 and 32 characters.";
    }

    if (!Validator.isAlphanumeric(name.replace(/\_/g, "").replace(/ /g, ""))) {
        return "Project name only can contain A-Z a-z 0-9 _ and Spaces";
    }
}

function validateProjectDescription(description = "") {
    if (!Validator.isLength(description, { min: 1, max: 250 })) {
        return "Project name must be between 1 and 250 characters.";
    }
}

function validateUsername(username = "") {
    if (!Validator.isLength(username, { min: 4, max: 32 })) {
        return "Username must be between 4 and 32 characters.";
    }

    if (!Validator.isAlphanumeric(username.replace(/\_/g, ""))) {
        return "Username only can contain A-Z a-z 0-9 _";
    }
}

function validateEmail(email = "") {
    if (!Validator.isEmail(email)) {
        return "Email isn't valid.";
    }
}

function validatePassword(password = "") {
    if (!Validator.isLength(password, { min: 8, max: 256 })) {
        return "Password must be between 8 and 256 characters.";
    }

    if (blacklistedPasswords.includes(password)) {
        return "This password is too weak.";
    }
}

export function validateRegister(body) {
    const {
        username = "",
        password = "",
        email = "",
        firstname = "",
        lastname = "",
    } = body;
    return (
        validateUsername(username) ||
        validatePassword(password) ||
        validateEmail(email) ||
        validateName(firstname) ||
        validateName(lastname)
    );
}

export function validateLogin(body) {
    const { password, email } = body;
    return validatePassword(password) || validateEmail(email);
}

export function validateCreateOrg(body) {
    const { name } = body;
    return validateOrgName(name);
}

export function validateCreateProject(body) {
    const { name, description } = body;
    return validateProjectName(name) || validateProjectDescription(description);
}
