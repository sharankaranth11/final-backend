const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { signup, signin, signout, isSignedIn } = require('../controllers/auth');

router.post(
  '/signup',
  [
    check('name')
      .isLength({ min: 5 })
      .withMessage('Must be at least 5 chars long'),
    check('email').isEmail().withMessage('Email is required'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('password should be least 3 character'),
  ],
  signup
);

router.post(
  '/signin',
  [
    check('email').isEmail().withMessage('Email is required'),
    check('password')
      .isLength({ min: 3 })
      .withMessage('Password field is required'),
  ],
  signin
);

router.get('/signout', signout);

router.get('/testroute', isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
