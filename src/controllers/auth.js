exports.register = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body)

    const result = {
        message: 'Register Success',
        data: {
            uid: 2,
            name: name,
            email: email
        }
    }

    res.status(201).json(result)
}