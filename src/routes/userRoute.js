import { Router } from 'express';

import userController from '../controllers/User';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();
// não deveria existir
// router.get('/', loginRequired, userController.index);
// router.get('/:id', userController.show);  
// não deveria existir 

router.post('/', userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;