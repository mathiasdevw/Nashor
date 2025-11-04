import express from "express"

import {
    getClients,
    getClientPorId,
    createClient,
    updateClient,
    deleteClient,
} from "../Controller/clientController"

const router = express.Router();

router.get("/api/clients", getClients)
router.get("/api/clients/:id", getClientPorId)
router.post("/api/clients", createClient);
router.put("/api/clients/:id", updateClient);
router.delete("/api/cliente/:id",deleteClient);

export default router;