const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
// wir importieren 2 Variablen aus express-validator
const { body, validationResult } = require('express-validator');


app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index')
})
app.post('/add', [
    // der Text in der Klammer nach Body bezieht sich auf das name-Attribute aus dem HTML
    body('email').isEmail(),
    body('phone').isNumeric({ no_symbols: false }),
    body('name').isLength({ min: 2, max: 20 }).isLowercase(),
    body('message').isLength({ min: 10 }),
    body('password').isStrongPassword()
], (req, res) => {
    const errors = validationResult(req);
    // console.log(errors.isEmpty());
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body.password);
    res.status(201).redirect('/')
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))