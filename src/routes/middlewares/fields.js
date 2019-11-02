const emailRegex = require('email-regex');

const checkUserFields = (req, res, next) => {
    const { username, name, surname, email, password, cp } = req.body;

    if (!username || !name || !surname || !email || !password || !cp) {
        res.status(422);
        return res.json({
            auth: false,
            message: 'All fields are required'
        });
    }

    next();
}

const verifyUserFields = (req, res, next) => {
    const { username, email, password } = req.body;

    const onlyLettersRegex = new RegExp("^[a-zA-Z]+$");
    const validUsername = (username.length > 3 && onlyLettersRegex.test(username));
    if (!validUsername) {
        res.status(422);
        return res.json({
            auth: false,
            message: 'Invalid username'
        });
    }

    const validEmail = emailRegex({ exact: true }).test(email);
    if (!validEmail) {
        res.status(422);
        return res.json({
            auth: false,
            message: 'Invalid email'
        });
    }

    //More than 8 characters, 1 lowercase letter, 1 uppercase letter and 1 digit
    const passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    const validPass = passRegex.test(password);
    if (!validPass) {
        res.status(422);
        return res.json({
            auth: false,
            message: 'Invalid password'
        });
    }
    next();
}

const checkLoginFields = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422);
        return res.json({
            auth: false,
            message: 'Email and password are required.'
        });
    }

    next();
}

module.exports = { checkUserFields, verifyUserFields, checkLoginFields }