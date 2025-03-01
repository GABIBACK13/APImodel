import { Router } from 'express';

import ArchiveController from '../controllers/Archive';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, ArchiveController.store);

export default router;