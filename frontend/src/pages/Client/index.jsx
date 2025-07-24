import React, { useMemo, useState } from 'react';
import {MaterialReactTable} from 'material-react-table';
import { Box, IconButton, MenuItem, Tooltip } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import './styles.scss';
import dayjs from 'dayjs'; // ✅ required if you're using @mui/x-date-pickers

const ClientManagement = () => {
  const [rowData, setRowData] = useState([
    {
      id: 1,
      fullName: 'John Doe',
      email: 'john@example.com',
      startDate: '2024-07-01T00:00:00Z',
    },
    {
      id: 2,
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      startDate: null, // test case
    },
    {
      id: 3,
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      startDate: null, // test case
    },
    {
      id: 4,
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      startDate: null, // test case
    },
    {
      id: 5,
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      startDate: null, // test case
    },
    {
      id: 6,
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      startDate: null, // test case
    },
    {
      id: 7,
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      startDate: null, // test case
    },
    {
      id: 8,
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      startDate: null, // test case
    },
    {
      id: 9,
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      startDate: null, // test case
    },
    {
      id: 10,
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      startDate: null, // test case
    },
    {
      id: 11,
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      startDate: null, // test case
    },
    {
      id: 12,
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      startDate: null, // test case
    },
  ]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'fullName',
        header: 'Full Name',
        size: 250,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 300,
      },
      {
        accessorFn: (row) =>
          row.startDate ? new Date(row.startDate) : null,
        id: 'startDate',
        header: 'Start Date',
        size: 200,
        Cell: ({ cell }) => {
          const date = cell.getValue();
          return date instanceof Date && !isNaN(date)
            ? date.toLocaleDateString()
            : 'Invalid or Missing Date';
        },
      },
    ],
    []
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="client-management">
        <MaterialReactTable
          columns={columns}
          data={rowData}
          enableRowActions
          renderRowActions={({ row }) => (
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <Tooltip title="View">
                <IconButton onClick={() => alert(`Viewing ${row.getValue('fullName')}`)}>
                  <Visibility />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton onClick={() => alert(`Editing ${row.getValue('fullName')}`)}>
                  <Edit />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderDetailPanel={({ row }) => (
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <span>Start Date: {row.original.startDate}</span>
            </Box>
          )}
          renderRowActionMenuItems={({ closeMenu, row }) => [
            <MenuItem key="view" onClick={closeMenu}>
              View
            </MenuItem>,
            <MenuItem key="edit" onClick={closeMenu}>
              Edit
            </MenuItem>,
          ]}
        />
      </div>
    </LocalizationProvider>
  );
};

export default ClientManagement;
