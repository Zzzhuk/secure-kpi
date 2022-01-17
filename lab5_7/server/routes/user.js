const {Router} = require('express');
const router = Router();
const userController = require('../controllers/userData');
const auth = require('../middleware/auth');

// router.get('/', async (req, res) => {
//   res.json(await Record.find());
// });

router.post('/user', auth, userController.updateUser);
router.get('/user', auth, userController.getUser);


module.exports = router;
