import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ✅ Get all clients
export const getClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany();
    res.json({ success: true, message: 'Clients fetched successfully', data: clients });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get client by ID
export const getClientById = async (req, res) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!client) return res.status(404).json({ success: false, message: 'Client not found' });
    res.json({ success: true, message: 'Client fetched successfully', data: client });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Create client
export const createClient = async (req, res) => {
  try {
    const { fullName, email, startDate } = req.body;
    const client = await prisma.client.create({
      data: {
        fullName,
        email,
        startDate: startDate ? new Date(startDate) : null,
      },
    });
    res.status(201).json({ success: true, message: 'Client created successfully', data: client });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Update client
export const updateClient = async (req, res) => {
  try {
    const { fullName, email, startDate } = req.body;
    const client = await prisma.client.update({
      where: { id: parseInt(req.params.id) },
      data: {
        fullName,
        email,
        startDate: startDate ? new Date(startDate) : null,
      },
    });
    res.json({ success: true, message: 'Client updated successfully', data: client });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Delete client
export const deleteClient = async (req, res) => {
  try {
    await prisma.client.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true, message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
