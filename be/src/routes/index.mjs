import { Router } from 'express';
import userRouter from '../routes/user-route.mjs';

const router = Router();

router.use(userRouter);

export default router;