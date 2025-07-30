import express from 'express';
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/clientManagement.js';

const router = express.Router();

router.get('/', getClients);        // GET all clients
router.get('/:id', getClientById); // GET client by ID
router.post('/', createClient);    // POST new client
router.put('/:id', updateClient);  // PUT update client
router.delete('/:id', deleteClient); // DELETE client

export default router;
