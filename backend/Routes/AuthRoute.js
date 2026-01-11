const express = require('express');
const router = express.Router();
const { AuthMiddlware } = require('../Middlewares/AuthMiddleware');

router.get('/validate-token', AuthMiddlware, (req, res) => {
    return res.status(200).json({ valid: true, user: req.user });
});

module.exports = router;