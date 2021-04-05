import User from "../models/user.model";

export async function getUserByID(id) {
    const user = await User.findOne({ _id: id });
    user.password = null;
    return user;
}

async function existAccountRegistered(username, email) {
    const accByUsername = await User.findOne({ username });
    if (accByUsername) {
        return "This username is alredy registered.";
    }

    const accByEmail = await User.findOne({ email });
    if (accByEmail) {
        return "This email is alredy registered.";
    }
}

export async function authenticateAccount(email, password) {
    const account = await User.findOne({ email });
    if (!account) {
        throw new Error("Email or password are invalid");
    }

    if (account.password != password) {
        throw new Error("Email or password are invalid");
    }

    account.password = null;
    return account;
}

export async function registerAccount(
    username,
    email,
    password,
    firstname,
    lastname
) {
    const existAccount = await existAccountRegistered(username, email);
    if (existAccount) {
        throw new Error(existAccount);
    }

    const user = new User({ username, email, password, firstname, lastname });
    await user.save();

    return true;
}
