import React from 'react';
import {MaterialReactTable} from 'material-react-table';
import { Box, Button, Chip } from '@mui/material';
import './styles.scss';

const data = [
  { id: 1, name: 'Admin One', role: 'Super Admin', status: 'Active' },
  { id: 2, name: 'Admin Two', role: 'Moderator', status: 'Inactive' },
  { id: 3, name: 'Admin Two', role: 'Moderator', status: 'Inactive' },
  { id: 4, name: 'Admin Two', role: 'Moderator', status: 'Inactive' },
  { id: 5, name: 'Admin Two', role: 'Moderator', status: 'Inactive' },
  { id: 6, name: 'Admin Two', role: 'Moderator', status: 'Inactive' },
  { id: 7, name: 'Admin Two', role: 'Moderator', status: 'Inactive' },
  { id: 8, name: 'Admin Two', role: 'Moderator', status: 'Inactive' },
  { id: 9, name: 'Admin Two', role: 'Moderator', status: 'Inactive' },
  { id: 10, name: 'Admin Two', role: 'Moderator', status: 'Inactive' },
];

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
  {
    accessorKey: 'status',
    header: 'Status',
    Cell: ({ cell }) => (
      <Chip
        label={cell.getValue()}
        color={cell.getValue() === 'Active' ? 'success' : 'default'}
        variant="outlined"
      />
    ),
  },
];

const AdminManagement = () => {
  return (
    <div className="admin-management-container">
      <h2>Admin Management</h2>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowActions
        renderRowActions={({ row }) => (
          <Box sx={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="outlined" color="primary">Edit</Button>
            <Button variant="outlined" color="error">Delete</Button>
          </Box>
        )}
      />
    </div>
  );
};

export default AdminManagement;
