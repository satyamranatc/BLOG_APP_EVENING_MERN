import {Router} from "express"
let router = Router();

import {
    loginUser,
    signUpUser,
    updateUser,
    deleteUser
} from "../Controllers/UserController.js"

router.post('/login', loginUser)
router.post('/signup', signUpUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)




export default router;