import { Router } from "express";
let router = Router();

import {addLike,postCommet} from "../Controllers/PostDaraController.js";

router.put('/:id/like', addLike)
router.post('/:id/comment', postCommet)


export default router;