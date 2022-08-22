import Router from "express"
const router = new Router()
const userController = require("../controller/user.controller")

router.post("/user", userController.createUser)

router.post("/user/:id", userController.getOneUser)
router.delete("/user/:id", userController.deleteUser)

module.exports = router
