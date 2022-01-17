const {Router} = require('express');
const router = Router();
const authController = require('../controllers/auth')
const auth = require('../middleware/auth');

// router.get('/', async (req, res) => {
//   res.json(await Record.find());
// });

router.post('/sign-up', authController.signUp);
router.post('/login', authController.login);
router.post('/log-out', auth, authController.logOut);


module.exports = router;
