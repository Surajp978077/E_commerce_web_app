import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Divider, Chip, Pagination, Button } from '@mui/material';
import { productInstance } from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const QCRequest = () => {
  const [qcRequests, setQCRequests] = useState([]);
  const [pagination, setPagination] = useState(() => {
    const storedPagination = sessionStorage.getItem('qcRequestPagination');
    return storedPagination ? JSON.parse(storedPagination) : {
      totalItems: 0,
      totalPages: 0,
      page: 1,
      pageSize: 10,
    };
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await productInstance.get('qcrequests', {
          params: {
            page: pagination.page,
            pageSize: pagination.pageSize,
          },
        });
        console.log('Response:', response);
        if (response && response.data) {
          setQCRequests(response.data.Data);
          setPagination(prevPagination => ({
            ...prevPagination,
            totalPages: response.data.TotalPages
          }));
        }
      } catch (error) {
        console.error('Error fetching qCRequests:', error);
      }
    };

    fetchUsers();
  }, [pagination.page, pagination.pageSize]);

  useEffect(() => {
    sessionStorage.setItem('qcRequestPagination', JSON.stringify(pagination));
  }, [pagination]);

  const handlePageChange = (event, page) => {
    setPagination(prevPagination => ({ ...prevPagination, page: page }));
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };
    const date = new Date(dateString);
    return date.toLocaleString(undefined, options);
  };

  const handleReview = (qcRequest) => {
    navigate('/qc-request/review', { state: qcRequest });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>

      <Divider sx={{ marginY: '1.5rem' }}>
        <Chip label='QC REQUESTS' />
      </Divider>

      <Box sx={{ marginX: '4rem' }}>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <Pagination
            count={pagination.totalPages}
            page={pagination.page > pagination.totalPages ? pagination.totalPages : pagination.page}
            onChange={handlePageChange} />
        </Box>

        <TableContainer component={Paper} sx={{ border: '2px solid #f5f5f5', borderRadius: '10px' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                  Image
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                  Product Name
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                  Category
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                  Vendor Name
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                  Request Date
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', textAlign: 'right' }}>
                  Status
                  <br />
                  (0: Pending, 1: Rejected)
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {qcRequests.map((qcRequest) => (
                <TableRow key={qcRequest.Id} sx={{ backgroundColor: qcRequest.Status ? '#f0eee9' : null }}>
                  <TableCell>
                    <img src={qcRequest.Product.ImageURL} alt={qcRequest.Product.ProdName} style={{ width: '50px', height: '50px' }} />
                  </TableCell>
                  <TableCell>{qcRequest.Product.ProdName}</TableCell>
                  <TableCell>{qcRequest.CategoryName}</TableCell>
                  <TableCell>{qcRequest.VendorName}</TableCell>
                  <TableCell>{formatDate(qcRequest.RequestDate)}</TableCell>
                  <TableCell sx={{ textAlign: 'right' }}>{qcRequest.Status}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {qcRequest.Status === 0 ? (
                      <Button
                        variant='outlined'
                        color='primary'
                        onClick={() => handleReview(qcRequest)}
                      >
                        Review
                      </Button>
                    ) : (
                      <Button
                        variant='outlined'
                        color='primary'
                        onClick={() => handleReview(qcRequest)}
                      >
                        View Details
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default QCRequest;
