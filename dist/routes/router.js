var Router = require('express').Router;
var router = Router();
var controller = require('../controller/controller');
router.post('/signup', controller.signup_user);
module.exports = router;
//# sourceMappingURL=router.js.map