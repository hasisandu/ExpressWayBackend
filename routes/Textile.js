const express = require('express');
const router = express.Router();

const customer=[
    {name:"nimal"},
    {name:"Kamal"},
    {name:"Vimal"}
];

/* GET home page. */
router.get('/getAllcustomers', function(req, res, next) {
    res.send(customer);
});

module.exports = router;
