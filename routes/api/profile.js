const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      //check('status', 'Status is required').not().isEmpty(),
      check('role', 'role is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      adminname,
      gender,
      role,
      status,
    } = req.body;

    const profileFields = {
      user: req.user.id,
      adminname,
      gender,
      role: Array.isArray(role)
        ? role
        : role.split(',').map((skill) => ' ' + skill.trim()),
      status,
    };

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  '/user/:user_id',
  checkObjectId('user_id'),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id
      }).populate('user', ['name', 'avatar']);

      if (!profile) return res.status(400).json({ msg: 'Profile not found' });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/product
// @desc     Add profile product
// @access   Private
router.put(
  '/product',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      //check('adminname', 'adminname is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true))
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      productid,
      soluong,
      dongia,
      supplierid,
      from,
      to,
      description
    } = req.body;

    const newExp = {
      title,
      productid,
      soluong,
      dongia,
      supplierid,
      from,
      to,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.product.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/profile/product/:exp_id
// @desc     Delete product from profile
// @access   Private

router.delete('/product/:exp_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.product = foundProfile.product.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    PUT api/profile/invoice
// @desc     Add profile invoice
// @access   Private
router.put(
  '/invoice',
  [
    auth,
    [
      check('invoiceid', 'Invoice ID is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true))
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      invoiceid,
      productid,
      supplierid,
      from,
      to,
      soluong,
      dongia,
      thanhtien,
      description
    } = req.body;

    const newEdu = {
      invoiceid,
      productid,
      supplierid,
      from,
      to,
      soluong,
      dongia,
      thanhtien,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.invoice.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/profile/invoice/:edu_id
// @desc     Delete invoice from profile
// @access   Private

router.delete('/invoice/:edu_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.invoice = foundProfile.invoice.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

router.put(
  '/supplier',
  [
    auth,
    [
      check('supplierid', 'Supplier ID is required').not().isEmpty(),
      check('supplieremail', 'Please include a valid email').isEmail()
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true))
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      supplierid,
      suppliername,
      supplieremail,
      supplieraddress,
      productid,
      description
    } = req.body;

    const newSup= {
      supplierid,
      suppliername,
      supplieremail,
      supplieraddress,
      productid,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.supplier.unshift(newSup);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


router.delete('/supplier/:sup_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.supplier = foundProfile.supplier.filter(
      (sup) => sup._id.toString() !== req.params.sup_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

router.put(
  '/client',
  [
    auth,
    [
      check('clientid', 'Client ID is required').not().isEmpty(),
      check('clientemail', 'Please include a valid email').isEmail()
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true))
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      clientid,
      clientname,
      clientemail,
      clientaddress,
      clientcity,
      description
    } = req.body;

    const newCli= {
      clientid,
      clientname,
      clientemail,
      clientaddress,
      clientcity,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.client.unshift(newCli);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


router.delete('/client/:cli_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.client = foundProfile.client.filter(
      (cli) => cli._id.toString() !== req.params.cli_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
