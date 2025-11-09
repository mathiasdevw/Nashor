import express from "express"
import {
    getUsers,
    getUsersPorId,
    createUser,
    updateUser,
    deleteUser,
} from "../Controller/userController"


const router = express.Router()

router.get("/api/users",getUsers)
router.get("/api/users/:id", getUsersPorId)
router.post("/api/users",createUser)
router.put("/api/users/:id",updateUser)
router.delete("/api/users/:id", deleteUser)

export default router;