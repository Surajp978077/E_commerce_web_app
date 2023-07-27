import { Fragment, useEffect, useRef, useState } from 'react';
import { userInfoInstance } from '../../api/axios';
import {
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material'
import {
  Chip,
  Pagination,
  TextField,
  Popper,
  ClickAwayListener,
  InputLabel,
  NativeSelect,
  Badge,
  TableBody,
  TableRow,
  Snackbar,
  Alert,
  TableCell,
  Typography,
  CircularProgress,
  Paper,
  Box,
} from '@mui/material';
import {
  StyledDivider,
  StyledPaper,
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableRowAlt,
  StyledTableCell,
  StyledTableHeadCell,
  StyledButton,
  PaginationContainer,
  FilterPaper,
  FilterBox,
  FilterClearButton,
  FilterFormControl,
  FilterValueInput,
  FilterAutocompleteValueInput,
} from './User.styles'

const User = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const filterButtonRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  const [pagination, setPagination] = useState(() => {
    const storedPagination = sessionStorage.getItem('userPagination');
    return storedPagination
      ? JSON.parse(storedPagination)
      : {
        totalItems: 0,
        totalPages: 0,
        page: 1,
        pageSize: 10,
        sortBy: 'UserName',
        sortDesc: false,
      };
  });

  const filterOperatorsString = [
    'contains',
    'equals',
    'notequals',
    'startswith',
    'endswith',
    'isempty',
    'isnotempty',
    'isanyof',
  ];
  const filterOperatorsInt = [
    'equals',
    'notequals',
    'greaterthan',
    'greaterthanorequalto',
    'lessthan',
    'lessthanorequalto',
    'isempty',
    'isnotempty',
    'isanyof'
  ];
  const columnFilterOperators = {
    UserId: {
      label: 'User Id',
      operators: filterOperatorsInt,
      type: 'number',
    },
    UserName: {
      label: 'User Name',
      operators: filterOperatorsString,
      type: 'text',
    },
    Email: {
      label: 'Email',
      operators: filterOperatorsString,
      type: 'text'
    },
    Role: {
      label: 'Role',
      operators: filterOperatorsString,
      type: 'text'
    },
  };
  const [filter, setFilter] = useState(() => {
    const storedValidFilter = sessionStorage.getItem('userValidFilter');
    const defaultColumn = Object.keys(columnFilterOperators).find(
      (column) => columnFilterOperators[column].type === 'text'
    );

    if (storedValidFilter) {
      const parsedValidFilter = JSON.parse(storedValidFilter);
      if (parsedValidFilter.column && parsedValidFilter.operator) {
        return { ...parsedValidFilter };
      }
    }

    return {
      column: defaultColumn,
      operator: 'contains',
      value: '',
    };
  });
  const [validFilter, setValidFilter] = useState(() => {
    const storedFilter = sessionStorage.getItem('userValidFilter');
    return storedFilter
      ? JSON.parse(storedFilter)
      : {
        column: '',
        operator: '',
        value: '',
      };
  });
  const [isFilterValid, setIsFilterValid] = useState(() => {
    const storedIsFilterValid = sessionStorage.getItem('userIsFilterValid');
    return storedIsFilterValid
      ? JSON.parse(storedIsFilterValid)
      : { previous: false, current: false };
  });
  const [isanyofFilterValue, setIsanyofFilterValue] = useState([]);
  const [isanyofFilterValues, setIsanyofFilterValues] = useState(() => {
    const storedFilterValues = sessionStorage.getItem('userIsanyofFilterValues');
    return storedFilterValues ? JSON.parse(storedFilterValues) : [];
  });

  const handleToggle = (_) => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (
      event?.target &&
      filterButtonRef.current &&
      filterButtonRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      filterButtonRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await userInfoInstance.get('paginated-users', {
          params: {
            page: pagination.page,
            pageSize: pagination.pageSize,
            sortBy: pagination.sortBy,
            sortDesc: pagination.sortDesc,
            column: validFilter.column,
            filterOperator: validFilter.operator,
            value: validFilter.value,
          },
        });
        console.log(response);
        if (response && response.data) {
          setUsers(response.data.Data);
          setPagination((prevPagination) => ({
            ...prevPagination,
            totalPages: response.data.TotalPages,
          }));
        }

        // Show Snackbar if data is empty
        if (response && response.data && response.data.Data.length === 0) {
          setSnackbarMessage('No data found.');
          setSnackbarSeverity('info');
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(true);
        setSnackbarMessage('Failed to fetch data.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [
    pagination.page,
    pagination.pageSize,
    pagination.sortBy,
    pagination.sortDesc,
    validFilter,
  ]);

  useEffect(() => {
    sessionStorage.setItem('userIsFilterValid', JSON.stringify(isFilterValid));
  }, [isFilterValid]);

  useEffect(() => {
    sessionStorage.setItem('userIsanyofFilterValues', JSON.stringify(isanyofFilterValues));
  }, [isanyofFilterValues]);

  useEffect(() => {
    if (isFilterValid.current) {
      setValidFilter({ ...filter });
      setPagination((prevPagination) => ({ ...prevPagination, page: 1 }));
    } else if (isFilterValid.previous) {
      setValidFilter({ column: '', operator: '', value: '' });
      setPagination((prevPagination) => ({ ...prevPagination, page: 1 }));
    }
  }, [filter, isFilterValid]);

  useEffect(() => {
    sessionStorage.setItem('userPagination', JSON.stringify(pagination));
  }, [pagination]);

  useEffect(() => {
    sessionStorage.setItem('userValidFilter', JSON.stringify(validFilter));
  }, [validFilter]);

  const handleSnackbarClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handlePageChange = (_, page) => {
    setPagination((prevPagination) => ({ ...prevPagination, page: page }));
  };

  const handleSort = (column) => {
    if (pagination.sortBy === column) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        sortDesc: !prevPagination.sortDesc
      }));
    } else {
      setPagination((prevPagination) => ({
        ...prevPagination,
        sortBy: column,
        sortDesc: false
      }));
    }
    setPagination((prevPagination) => ({ ...prevPagination, page: 1 }));
  };

  const handleRemoveSingleFilterValues = () => {
    setFilter((prevFilter) => ({ ...prevFilter, value: '' }));
    setIsanyofFilterValue([]);
    setIsanyofFilterValues([]);
  };

  const validatePositiveIntegers = (values) => {
    return values.filter((str) => /^\d+$/.test(str));
  };

  const validateColumn = (column) => {
    // Validate and update operator of new column
    const newFilterOperators = columnFilterOperators[column]?.operators || [];
    const currentOperator = filter.operator;
    const isValidOperator = newFilterOperators.includes(currentOperator);
    const newFilterOperator = isValidOperator ? currentOperator : newFilterOperators[0] || '';

    setFilter((prevFilter) => ({ ...prevFilter, operator: newFilterOperator }));

    if (newFilterOperator === 'isempty' || newFilterOperator === 'isnotempty') {
      handleRemoveSingleFilterValues();
      return true;
    }

    if (!filter.value) {
      handleRemoveSingleFilterValues();
      return false;
    }

    if (
      columnFilterOperators[filter.column]?.type === 'text' &&
      columnFilterOperators[column]?.type === 'number'
    ) {
      if (newFilterOperator === 'isanyof') {
        if (!Number.isInteger(Number(isanyofFilterValue))) {
          setIsanyofFilterValue([]);
        }
        const positiveIntArray = validatePositiveIntegers(isanyofFilterValues);
        if (Array.isArray(positiveIntArray) && positiveIntArray.length > 0) {
          setIsanyofFilterValues(positiveIntArray);
          setFilter((prevFilter) => ({
            ...prevFilter,
            value: positiveIntArray.join(',')
          }));
          return true;
        } else {
          setIsanyofFilterValues([]);
          return false;
        }
      } else if (!Number.isInteger(Number(filter.value))) {
        handleRemoveSingleFilterValues();
        return false;
      }
    }

    return true;
  };

  const handleColumnChange = (event) => {
    const newColumn = event.target.value;
    const isValid = validateColumn(newColumn);

    setIsFilterValid(({ current }) => ({ previous: current, current: isValid }));
    setFilter((prevFilter) => ({ ...prevFilter, column: newColumn }));
  };

  const validateOperator = (operator) => {
    switch (operator) {
      case 'isempty':
      case 'isnotempty':
        handleRemoveSingleFilterValues();
        return true;
      case 'isanyof':
        if (filter.value) {
          setIsanyofFilterValue([filter.value]);
          setIsanyofFilterValues([filter.value]);
          return true;
        }
        break;
      default:
        if (filter.operator === 'isanyof') {
          handleRemoveSingleFilterValues();
          return false;
        }
        return !!filter.value;
    }
    return false;
  };

  const handleOperatorChange = (event) => {
    const newOperator = event.target.value;
    const isValid = validateOperator(newOperator);
    setIsFilterValid(({ current }) => ({ previous: current, current: isValid }));
    setFilter((prevFilter) => ({ ...prevFilter, operator: newOperator }));
  };

  const handleRemoveValue = () => {
    if (filter.operator !== 'isanyof') {
      setFilter((prevFilter) => ({ ...prevFilter, value: '' }));
    }
    setIsanyofFilterValue([]);
  };

  const validatePositiveInteger = (value) => {
    const positiveIntegerPattern = /^\d+$/;
    const trimmedValue = value.trim();
    return positiveIntegerPattern.test(trimmedValue);
  };

  const validateValue = (value) => {
    if (!value) {
      handleRemoveValue();
      return false;
    }

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      handleRemoveValue();
      return false;
    }

    if (filter.column.type === 'number' && !validatePositiveInteger(trimmedValue)) {
      handleRemoveValue();
      return false;
    }

    if (filter.operator === 'isanyof') {
      setIsanyofFilterValue([trimmedValue]);
    }

    return true;
  };

  const handleValueChange = (event) => {
    const newValue = event.target.value;
    const isValid = validateValue(newValue);

    if (filter.operator !== 'isanyof') {
      setIsFilterValid(({ current }) => ({ previous: current, current: isValid }));
      setFilter((prevFilter) => ({ ...prevFilter, value: newValue }));
    }
  };

  const handleValueChangeMultiple = (_, values) => {
    if (values && values.length > 0) {
      const trimmedValues = values.map((value) => value.trim())
      setIsanyofFilterValues(trimmedValues);
      setFilter((prevFilter) => ({ ...prevFilter, value: trimmedValues.join(',') }));
      setIsFilterValid(({ current }) => ({ previous: current, current: true }));
    } else {
      handleRemoveSingleFilterValues();
      setIsFilterValid(({ current }) => ({ previous: current, current: false }));
    }
  };

  return (
    <Fragment>
      <StyledDivider>
        <Chip label='USERS' />
      </StyledDivider>

      <StyledPaper variant='outlined'>
        {/* Pagination */}
        <PaginationContainer>
          <Pagination
            count={pagination.totalPages}
            page={pagination.page > pagination.totalPages ? pagination.totalPages : pagination.page}
            onChange={handlePageChange}
          />
        </PaginationContainer>
        {/* Filter */}
        <StyledButton
          variant='text'
          onClick={handleToggle}
          ref={filterButtonRef}
          startIcon={
            <Badge
              color='primary'
              badgeContent={isFilterValid.current ? 1 : 0}
            >
              <FilterListIcon />
            </Badge>
          }
        >
          Filters
        </StyledButton>
        {/* Table */}
        <StyledTableContainer variant='outlined' component={Paper}>
          <StyledTable
            loading={loading}
            error={error}
            length={users.length}
          >
            <StyledTableHead ref={anchorRef}>
              <TableRow>
                {Object.keys(columnFilterOperators).map((column) => (
                  <StyledTableHeadCell
                    key={column}
                    onClick={() => handleSort(column)}
                    type={columnFilterOperators[column].type}
                    isSelected={pagination.sortBy === column ? true : false}
                  >
                    {columnFilterOperators[column].type === 'text' && (
                      <Box>
                        {columnFilterOperators[column].label}
                        <Box display='inline'>
                          {pagination.sortDesc && pagination.sortBy === column
                            ? <ArrowDownwardIcon />
                            : <ArrowUpwardIcon />
                          }
                        </Box>
                      </Box>
                    )}
                    {columnFilterOperators[column].type === 'number' && (
                      <Box>
                        <Box display='inline'>
                          {pagination.sortDesc && pagination.sortBy === column
                            ? <ArrowDownwardIcon />
                            : <ArrowUpwardIcon />
                          }
                        </Box>
                        {columnFilterOperators[column].label}
                      </Box>
                    )}
                  </StyledTableHeadCell>
                ))}
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {/* Show table rows when there is data */}
              {
                // !loading && !error && users.length > 0 &&
                users.map((user) => (
                  <StyledTableRowAlt key={user.UserId}>
                    {Object.keys(columnFilterOperators).map((column) => (
                      <StyledTableCell key={column} type={columnFilterOperators[column].type}>
                        {user[column]}
                      </StyledTableCell>
                    ))}
                  </StyledTableRowAlt>
                ))
              }

              {/* Show loading state */}
              {loading && (
                <TableRow>
                  <TableCell
                    sx={{
                      position: 'absolute',
                      top: '60%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 'fit-content',
                      border: 0,
                      padding: 0,
                    }}
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}

              {/* Show 'No data found' message */}
              {!loading && !error && users.length === 0 && (
                <TableRow>
                  <TableCell
                    sx={{
                      position: 'absolute',
                      top: '60%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 'fit-content',
                      border: 0,
                      padding: 0,
                    }}
                  >
                    <Typography>{snackbarMessage}</Typography>
                  </TableCell>
                </TableRow>
              )}

              {/* Show error message */}
              {!loading && error && (
                <TableRow>
                  <TableCell
                    sx={{
                      position: 'absolute',
                      top: '60%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 'fit-content',
                      border: 0,
                      padding: 0,
                    }}
                  >
                    <Typography color='error'>{snackbarMessage}</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
      </StyledPaper>

      {/* Popper for Filters */}
      < Popper
        open={open}
        anchorEl={anchorRef.current}
        placement='bottom-start'
        modifiers={
          [
            { name: 'flip', enabled: false },
            // { name: 'preventOverflow', enabled: false },
            { name: 'hide', enabled: false },
            { name: 'offset', options: { offset: [0, 1] } },
          ]}
      >
        <FilterPaper elevation={24}>
          <ClickAwayListener onClickAway={handleClose} mouseEvent='onMouseDown'>
            <FilterBox onKeyDown={handleListKeyDown}>
              {/* Clear Filter Button */}
              <FilterClearButton
                // onClick={TODO}
                variant='text'
                aria-label='Clear'
                title='Clear'
              >
                <ClearIcon />
              </FilterClearButton>

              <FilterFormControl variant='standard'>
                <InputLabel>Column</InputLabel>
                <NativeSelect value={filter.column} onChange={handleColumnChange}>
                  {Object.keys(columnFilterOperators).map((column) => (
                    <option key={column} value={column}>
                      {columnFilterOperators[column].label}
                    </option>
                  ))}
                </NativeSelect>
              </FilterFormControl>

              <FilterFormControl variant='standard'>
                <InputLabel>Operator</InputLabel>
                <NativeSelect value={filter.operator} onChange={handleOperatorChange}>
                  {columnFilterOperators[filter.column]?.operators.map((operator) => (
                    <option key={operator} value={operator}>
                      {operator}
                    </option>
                  ))}
                </NativeSelect>
              </FilterFormControl>

              {filter.operator !== 'isanyof' ? (
                <FilterValueInput
                  autoFocus
                  value={filter.value}
                  onChange={handleValueChange}
                  label='Value'
                  type={columnFilterOperators[filter.column]?.type || 'text'}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='standard'
                  autoComplete='off'
                  filter={filter}
                />
              ) :
                <FilterAutocompleteValueInput
                  multiple
                  onChange={handleValueChangeMultiple}
                  onInputChange={handleValueChange}
                  options={isanyofFilterValue.map((value) => value)}
                  value={isanyofFilterValues}
                  freeSolo
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      autoFocus
                      label='Value'
                      type={columnFilterOperators[filter.column]?.type || 'text'}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                  disablePortal
                />
              }
            </FilterBox>
          </ClickAwayListener>
        </FilterPaper>
      </Popper >

      {/* Show Snackbar for 'No data available' or for 'Error' */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Fragment >
  );
};

export { User };
