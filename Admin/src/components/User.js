import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Divider, Chip, Pagination } from '@mui/material';
import { userInfoInstance } from '../api/axios';

const User = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(() => {
    const storedPagination = sessionStorage.getItem('userPagination');
    return storedPagination ? JSON.parse(storedPagination) : {
      page: 1,
      pageSize: 3,
      sortBy: 'UserName',
      sortDesc: false,
      totalItems: 0,
      totalPages: 0
    };
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userInfoInstance.get('paginated-users', {
          params: {
            page: pagination.page,
            pageSize: pagination.pageSize,
            sortBy: pagination.sortBy,
            sortDesc: pagination.sortDesc,
          },
        });
        console.log('Response:', response);
        console.log('Data:', response.data);
        setUsers(response.data.Data);
        setPagination(prevPagination => ({ ...prevPagination, totalPages: response.data.TotalPages }));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [pagination.page, pagination.pageSize, pagination.sortBy, pagination.sortDesc]);

  useEffect(() => {
    sessionStorage.setItem('userPagination', JSON.stringify(pagination));
  }, [pagination]);

  const handleChangePage = (event, page) => {
    setPagination(prevPagination => ({ ...prevPagination, page: page }));
  };

  const handleSort = (column) => {
    if (pagination.sortBy === column) {
      setPagination(prevPagination => ({ ...prevPagination, sortDesc: !prevPagination.sortDesc }));
    } else {
      setPagination(prevPagination => ({ ...prevPagination, sortBy: column, sortDesc: false }));
    }
    setPagination(prevPagination => ({ ...prevPagination, page: 1 }));
  };

  const emptyRows = pagination.page > 1 ? Math.max(0, pagination.pageSize - users.length) : 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Divider sx={{ width: '100%', marginY: '16px' }}>
        <Chip label='USERS' />
      </Divider>
      <TableContainer
        component={Paper}
        sx={{
          width: '95%',
          border: '2px solid #f5f5f5',
          borderRadius: '10px',
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell
                sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                onClick={() => handleSort('UserId')}
              >
                User ID
                {pagination.sortBy === 'UserId' && (
                  <span>{pagination.sortDesc ? ' ▼' : ' ▲'}</span>
                )}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                onClick={() => handleSort('UserName')}
              >
                User Name
                {pagination.sortBy === 'UserName' && (
                  <span>{pagination.sortDesc ? ' ▼' : ' ▲'}</span>
                )}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                onClick={() => handleSort('Email')}
              >
                Email
                {pagination.sortBy === 'Email' && (
                  <span>{pagination.sortDesc ? ' ▼' : ' ▲'}</span>
                )}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                onClick={() => handleSort('Role')}
              >
                Role
                {pagination.sortBy === 'Role' && (
                  <span>{pagination.sortDesc ? ' ▼' : ' ▲'}</span>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.UserId}>
                <TableCell>{user.UserId}</TableCell>
                <TableCell>{user.UserName}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>{user.Role}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display='flex' justifyContent='center' marginTop='1rem'>
        <Pagination
          count={pagination.totalPages}
          page={pagination.page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default User;
