import React, { useEffect, useMemo, useState } from 'react';
import {MaterialReactTable} from 'material-react-table';
import { Box, IconButton, MenuItem, Tooltip } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import './styles.scss';
import dayjs from 'dayjs'; 
import { apiRequest } from '../../helpers/fetchApi';

const ClientManagement = () => {
  const [rowData, setRowData] = useState([])
  console.log("rowData",rowData)
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
  useEffect(()=>{
    const fetchApi = async()=>{
      try{
        const res = await apiRequest("/clients", "GET");
        const data = res?.data;
        setRowData(data)
      }catch(err){
        console.log(err)
      }
    }
    fetchApi()
  },[])
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
