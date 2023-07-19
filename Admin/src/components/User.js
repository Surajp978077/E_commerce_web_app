import { useEffect, useRef, useState } from 'react';
import { userInfoInstance } from '../api/axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Divider,
  Chip,
  Pagination,
  TextField,
  Popper,
  ClickAwayListener,
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  Autocomplete,
  Badge,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  overflowX: 'auto',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '10px',
  padding: theme.spacing(1),
}));

const StyledTable = styled(Table)({
  minWidth: '500px',
});

const StyledTableHead = styled(TableHead)({});

const StyledTableBody = styled(TableBody)({});

const StyledTableRow = styled(TableRow)({});

const StyledTableRowAlt = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#f0eee9',
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme, type }) => ({
  fontSize: '1rem',
  textAlign: type === 'text' ? 'left' : 'right',
  width: '25%',
}));

const StyledTableHeadCell = styled(StyledTableCell)(({ theme }) => ({
  fontWeight: 'bold',
  cursor: 'pointer',
}));

const ControlsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'sticky',
  top: 0,
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledFilterContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  paddingBottom: theme.spacing(0),
  '&:hover': {
    backgroundColor: 'rgba(144, 202, 249, 0.3)',
  },
}));

const StyledPaginationContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
}));

const User = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const filterButtonRef = useRef(null);
  // const theme = useTheme();

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
      } catch (error) {
        console.error('Error fetching users:', error);
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
    setFilter((prevFilter) => ({ ...prevFilter, value: '' }));
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
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Divider sx={{ marginY: '1.5rem' }}>
          <Chip label='USERS' />
        </Divider>

        <Box sx={{ marginX: '4rem' }}>

          <StyledPaper>
            <ControlsContainer>
              {/* Pagination */}
              <StyledPaginationContainer>
                <Pagination
                  count={pagination.totalPages}
                  page={pagination.page > pagination.totalPages ? pagination.totalPages : pagination.page}
                  onChange={handlePageChange}
                />
              </StyledPaginationContainer>
              {/* Filter */}
              <StyledFilterContainer>
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
                {/* Add other filter components here */}
              </StyledFilterContainer>
            </ControlsContainer>

            <StyledTableContainer>
              <StyledTable>
                <StyledTableHead ref={anchorRef}>
                  <StyledTableRow>
                    {Object.keys(columnFilterOperators).map((column) => (
                      <StyledTableHeadCell
                        key={column}
                        onClick={() => handleSort(column)}
                        type={columnFilterOperators[column].type}
                      >
                        {columnFilterOperators[column].type === 'text' && (
                          columnFilterOperators[column].label
                        )}
                        {pagination.sortBy === column && (
                          <span className="arrow">
                            {pagination.sortDesc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                          </span>
                        )}
                        {columnFilterOperators[column].type === 'number' && (
                          columnFilterOperators[column].label
                        )}
                      </StyledTableHeadCell>
                    ))}
                  </StyledTableRow>
                </StyledTableHead>
                <StyledTableBody>
                  {users.map((user, index) => (
                    <StyledTableRowAlt key={user.UserId}>
                      {Object.keys(columnFilterOperators).map((column) => (
                        <StyledTableCell key={column} type={columnFilterOperators[column].type}>
                          {user[column]}
                        </StyledTableCell>
                      ))}
                    </StyledTableRowAlt>
                  ))}
                </StyledTableBody>
              </StyledTable>
            </StyledTableContainer>
          </StyledPaper>

        </Box>
      </Box >

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
        <Paper
          sx={{
            borderRadius: '4px',
            boxShadow: `
              rgba(0, 0, 0, 0.2) 0px 5px 5px -3px,
              rgba(0, 0, 0, 0.14) 0px 8px 10px 1px,
              rgba(0, 0, 0, 0.12) 0px 3px 14px 2px
            `,
            backgroundColor: 'rgb(255, 255, 255)',
          }}
        >
          <ClickAwayListener onClickAway={handleClose} mouseEvent='onMouseDown'>
            <Box
              onKeyDown={handleListKeyDown}
              sx={{
                p: 1,
                display: 'flex',
                // flex: '1 1 0%',
                alignItems: 'center',
              }}
            >
              {/* Clear Filter Button */}
              <Button
                // onClick={TODO}
                variant='text'
                sx={{
                  color: 'grey',
                  padding: '5px',
                  minWidth: 'unset',
                  borderRadius: '50%',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  },
                }}
                aria-label='Clear'
                title='Clear'
              >
                <ClearIcon />
              </Button>

              <FormControl variant='standard' sx={{ width: '100%' }}>
                <InputLabel>Column</InputLabel>
                <NativeSelect value={filter.column} onChange={handleColumnChange}>
                  {Object.keys(columnFilterOperators).map((column) => (
                    <option key={column} value={column}>
                      {columnFilterOperators[column].label}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>

              <FormControl variant='standard' sx={{ width: '100%' }}>
                <InputLabel>Operator</InputLabel>
                <NativeSelect value={filter.operator} onChange={handleOperatorChange}>
                  {columnFilterOperators[filter.column]?.operators.map((operator) => (
                    <option key={operator} value={operator}>
                      {operator}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>

              {filter.operator !== 'isanyof' ? (
                <TextField
                  autoFocus
                  value={filter.value}
                  onChange={handleValueChange}
                  label='Value'
                  sx={{
                    width: '100%',
                    visibility:
                      filter.operator === 'isempty'
                        || filter.operator === 'isnotempty'
                        ? 'hidden'
                        : 'visible'
                  }}
                  type={columnFilterOperators[filter.column]?.type || 'text'}
                  autoComplete='off'
                />
              ) :
                <Autocomplete
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
                      sx={{ width: '100%' }}
                      type={columnFilterOperators[filter.column]?.type || 'text'}
                    />
                  )}
                  disablePortal
                />
              }
            </Box>
          </ClickAwayListener>
        </Paper>
      </Popper >
    </>
  );
};

export default User;



// import { useEffect, useRef, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Box,
//   Divider,
//   Chip,
//   Pagination,
//   TextField,
//   Popper,
//   ClickAwayListener,
//   Button,
//   FormControl,
//   InputLabel,
//   NativeSelect,
//   Autocomplete,
// } from '@mui/material';
// import { userInfoInstance } from '../api/axios';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import ClearIcon from '@mui/icons-material/Clear';

// const User = () => {
//   const [users, setUsers] = useState([]);
//   const [open, setOpen] = useState(false);
//   const anchorRef = useRef(null);
//   const filterButtonRef = useRef(null);
//   const [pagination, setPagination] = useState(() => {
//     const storedPagination = sessionStorage.getItem('userPagination');
//     return storedPagination
//       ? JSON.parse(storedPagination)
//       : {
//         totalItems: 0,
//         totalPages: 0,
//         page: 1,
//         pageSize: 10,
//         sortBy: 'UserName',
//         sortDesc: false,
//       };
//   });
//   const filterOperatorsString = [
//     'contains',
//     'equals',
//     'notequals',
//     'startswith',
//     'endswith',
//     'isempty',
//     'isnotempty',
//     'isanyof',
//   ];
//   const filterOperatorsInt = [
//     'equals',
//     'notequals',
//     'greaterthan',
//     'greaterthanorequalto',
//     'lessthan',
//     'lessthanorequalto',
//     'isempty',
//     'isnotempty',
//     'isanyof'
//   ];
//   const [filter, setFilter] = useState(() => {
//     const storedFilter = sessionStorage.getItem('userFilter');
//     return storedFilter
//       ? JSON.parse(storedFilter)
//       : {
//         column: 'UserName',
//         operator: 'contains',
//         value: '',
//       };
//   });
//   const [isFilterValid, setIsFilterValid] = useState(true);
//   const [isanyofFilterValue, setIsanyofFilterValue] = useState([]);
//   const [isanyofFilterValues, setIsanyofFilterValues] = useState([]);

//   const columnFilterOperators = {
//     UserId: {
//       label: 'User Id',
//       operators: filterOperatorsInt,
//       type: 'number',
//     },
//     UserName: {
//       label: 'User Name',
//       operators: filterOperatorsString,
//       type: 'text',
//     },
//     Email: {
//       label: 'Email',
//       operators: filterOperatorsString,
//       type: 'text'
//     },
//     Role: {
//       label: 'Role',
//       operators: filterOperatorsString,
//       type: 'text'
//     },
//   };

//   const handleToggle = (_) => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (
//       event?.target &&
//       filterButtonRef.current &&
//       filterButtonRef.current.contains(event.target)) {
//       return;
//     }
//     setOpen(false);
//   };

//   function handleListKeyDown(event) {
//     if (event.key === 'Escape') {
//       setOpen(false);
//     }
//   }

//   // return focus to the button when we transitioned from !open -> open
//   const prevOpen = useRef(open);
//   useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       filterButtonRef.current.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const operator =
//           (
//             (filter.operator !== 'isempty' &&
//               filter.operator !== 'isnotempty' &&
//               !filter.value) ||
//             (filter.operator === 'isanyof' && (!filter.value || filter.value?.length <= 0))
//           )
//             ? null
//             : filter.operator;

//         const response = await userInfoInstance.get('paginated-users', {
//           params: {
//             page: pagination.page,
//             pageSize: pagination.pageSize,
//             sortBy: pagination.sortBy,
//             sortDesc: pagination.sortDesc,
//             column: operator ? filter.column : null,
//             operator: operator,
//             value:
//               filter.operator === 'isempty' ||
//                 filter.operator === 'isnotempty' ||
//                 !operator
//                 ? null
//                 : filter.value,
//           },
//         });
//         console.log(response);
//         if (response && response.data) {
//           setUsers(response.data.Data);
//           setPagination((prevPagination) => ({
//             ...prevPagination,
//             totalPages: response.data.TotalPages,
//           }));
//         }
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     if (isFilterValid) {
//       fetchUsers();
//     }
//   }, [
//     pagination.page,
//     pagination.pageSize,
//     pagination.sortBy,
//     pagination.sortDesc,
//     filter,
//     isFilterValid
//   ]);

//   useEffect(() => {
//     sessionStorage.setItem('userPagination', JSON.stringify(pagination));
//   }, [pagination]);

//   useEffect(() => {
//     sessionStorage.setItem('userFilter', JSON.stringify(filter));
//   }, [filter]);

//   const handlePageChange = (_, page) => {
//     setPagination((prevPagination) => ({ ...prevPagination, page: page }));
//   };

//   const handleSort = (column) => {
//     if (pagination.sortBy === column) {
//       setPagination((prevPagination) => ({
//         ...prevPagination,
//         sortDesc: !prevPagination.sortDesc
//       }));
//     } else {
//       setPagination((prevPagination) => ({
//         ...prevPagination,
//         sortBy: column,
//         sortDesc: false
//       }));
//     }
//     setPagination((prevPagination) => ({ ...prevPagination, page: 1 }));
//   };

//   const handleColumnChange = (event) => {
//     const newValue = event.target.value;
//     const newFilterOperators = columnFilterOperators[newValue]?.operators || [];
//     const currentOperator = filter.operator;
//     const isValidOperator = newFilterOperators.includes(currentOperator);
//     const newFilterOperator = isValidOperator ? currentOperator : newFilterOperators[0] || '';

//     // Check if the current column type is 'text' and the new column type is 'number'
//     if (
//       columnFilterOperators[filter.column]?.type === 'text' &&
//       columnFilterOperators[newValue]?.type === 'number'
//     ) {
//       const currentValue = filter.value;

//       // Check if the current value is not a valid integer
//       if (currentValue && !Number.isInteger(Number(currentValue))) {
//         setFilter((prevFilter) => ({
//           ...prevFilter,
//           value: '', // Clear the value
//         }));
//       }
//     }

//     setFilter((prevFilter) => ({
//       ...prevFilter,
//       column: newValue,
//       operator: newFilterOperator,
//     }));

//     if (!filter.value && newFilterOperator !== 'isempty' && newFilterOperator !== 'isnotempty' && newFilterOperator !== 'isanyof') {
//       setIsFilterValid(false);
//       return;
//     }

//     if (newFilterOperator === 'isanyof') {
//       if (isanyofFilterValues.length <= 0) {
//         setIsFilterValid(false);
//         return;
//       }
//       if (
//         columnFilterOperators[filter.column]?.type === 'text' &&
//         columnFilterOperators[newValue]?.type === 'number'
//       ) {
//         const intArray = isanyofFilterValues.filter((str) => /^\d+$/.test(str))
//           .map((str) => parseInt(str, 10));
//         setIsanyofFilterValue([]);
//         setIsanyofFilterValues(intArray);
//         setFilter((prevFilter) => ({ ...prevFilter, value: intArray }));
//       }
//     }

//     setIsFilterValid(true);
//     setPagination((prevPagination) => ({ ...prevPagination, page: 1 }));
//   };

//   const handleOperatorChange = (event) => {
//     const newValue = event.target.value;

//     if (newValue === 'isanyof' && !Array.isArray(filter.value)) {
//       setFilter((prevFilter) => ({ ...prevFilter, value: [] }));
//       setIsFilterValid(false);
//     } else if (filter.operator === 'isanyof' && newValue !== 'isanyof') {
//       if (newValue === 'isempty' || newValue === 'isnotempty') {
//         setIsFilterValid(true);
//       } else {
//         setIsFilterValid(false);
//       }
//       setIsanyofFilterValue([]);
//       setIsanyofFilterValues([]);
//       setFilter((prevFilter) => ({ ...prevFilter, value: '' }));
//     } else if (
//       ((filter.operator === 'isempty' && newValue !== 'isempty') ||
//         newValue === 'isempty') ||
//       (filter.operator === 'isnotempty' && newValue !== 'isnotempty') ||
//       newValue === 'isnotempty'
//     ) {
//       setFilter((prevFilter) => ({ ...prevFilter, value: '' }));
//       setPagination((prevPagination) => ({ ...prevPagination, page: 1 }));
//       setIsFilterValid(true);
//     } else if (filter.value) {
//       setPagination((prevPagination) => ({ ...prevPagination, page: 1 }));
//       setIsFilterValid(true);
//     } else {
//       setIsFilterValid(false);
//     }
//     setFilter((prevFilter) => ({ ...prevFilter, operator: newValue }));
//   };

//   const handleValueChange = (event) => {
//     const newValue = event.target.value;

//     // If the column is an integer column, validate the value as an integer
//     if (filter.column.type === 'number') {
//       if (newValue !== '' && !Number.isInteger(Number(newValue))) {
//         // Invalid integer value, ignore the change
//         return;
//       }
//     }

//     setIsFilterValid(true);
//     setFilter((prevFilter) => ({ ...prevFilter, value: newValue }));
//     setPagination((prevPagination) => ({ ...prevPagination, page: 1 }));
//   };

//   const handleValueInputChange = (event, value) => {
//     if (value) {
//       setIsanyofFilterValue(value.trim() !== '' ? [value.trim()] : []);
//     }
//   };

//   const handleValueChangeMultiple = (event, values) => {
//     var trimmedValues;
//     if (values && values.length > 0) {
//       trimmedValues = values.map((value) => value.trim())
//       setIsanyofFilterValues(trimmedValues);
//       setFilter((prevFilter) => ({ ...prevFilter, value: trimmedValues.join(',') }));
//     } else {
//       setIsanyofFilterValue([]);
//       setIsanyofFilterValues([]);
//       setFilter((prevFilter) => ({ ...prevFilter, value: [] }));
//     }
//     setIsFilterValid(true);
//     setPagination((prevPagination) => ({ ...prevPagination, page: 1 }));
//   };

//   return (
//     <>
//       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//         <Divider sx={{ marginY: '1.5rem' }}>
//           <Chip label='USERS' />
//         </Divider>

//         <Box sx={{ marginX: '4rem' }}>
//           <Box display='flex' justifyContent='flex-end' marginBottom='1rem'>
//             <Pagination
//               count={pagination.totalPages}
//               page={pagination.page > pagination.totalPages ? pagination.totalPages : pagination.page}
//               onChange={handlePageChange}
//             />
//           </Box>

//           <TableContainer component={Paper} sx={{ border: '2px solid #f5f5f5', borderRadius: '10px' }}>
//             <Table>
//               <TableHead ref={anchorRef} sx={{ backgroundColor: '#f5f5f5' }}>
//                 {/* Filter Button */}
//                 <TableRow>
//                   <TableCell colSpan={4} sx={{ padding: '0' }}>
//                     <Button
//                       onClick={handleToggle}
//                       variant='text'
//                       sx={{
//                         width: '100%',
//                         justifyContent: 'center',
//                       }}
//                       ref={filterButtonRef}
//                       startIcon={<FilterListIcon />}
//                     >
//                       Filters
//                     </Button>
//                   </TableCell>
//                 </TableRow>

//                 <TableRow>
//                   {Object.keys(columnFilterOperators).map((column) => (
//                     <TableCell
//                       key={column}
//                       sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
//                       onClick={() => handleSort(column)}
//                     >
//                       {columnFilterOperators[column].label}
//                       {pagination.sortBy === column && (
//                         <span>{pagination.sortDesc ? ' ▼' : ' ▲'}</span>
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {users.map((user) => (
//                   <TableRow key={user.UserId}>
//                     <TableCell>{user.UserId}</TableCell>
//                     <TableCell>{user.UserName}</TableCell>
//                     <TableCell>{user.Email}</TableCell>
//                     <TableCell>{user.Role}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       </Box>

//       {/* Popper for Filters */}
//       <Popper
//         open={open}
//         anchorEl={anchorRef.current}
//         placement='bottom-start'
//         modifiers={[
//           { name: 'flip', enabled: false },
//           // { name: 'preventOverflow', enabled: false },
//           { name: 'hide', enabled: false },
//           { name: 'offset', options: { offset: [0, 1] } },
//         ]}
//       >
//         <Paper
//           sx={{
//             borderRadius: '4px',
//             boxShadow: `
//               rgba(0, 0, 0, 0.2) 0px 5px 5px -3px,
//               rgba(0, 0, 0, 0.14) 0px 8px 10px 1px,
//               rgba(0, 0, 0, 0.12) 0px 3px 14px 2px
//             `,
//             backgroundColor: 'rgb(255, 255, 255)',
//           }}
//         >
//           <ClickAwayListener onClickAway={handleClose} mouseEvent='onMouseDown'>
//             <Box
//               onKeyDown={handleListKeyDown}
//               sx={{
//                 p: 1,
//                 display: 'flex',
//                 // flex: '1 1 0%',
//                 alignItems: 'center',
//               }}
//             >
//               {/* Clear Filter Button */}
//               <Button
//                 // onClick={TODO}
//                 variant='text'
//                 sx={{
//                   color: 'grey',
//                   padding: '5px',
//                   minWidth: 'unset',
//                   borderRadius: '50%',
//                   '&:hover': {
//                     backgroundColor: 'rgba(0, 0, 0, 0.05)',
//                   },
//                 }}
//                 aria-label='Clear'
//                 title='Clear'
//               >
//                 <ClearIcon />
//               </Button>

//               <FormControl variant='standard' sx={{ width: '100%' }}>
//                 <InputLabel>Column</InputLabel>
//                 <NativeSelect value={filter.column} onChange={handleColumnChange}>
//                   {Object.keys(columnFilterOperators).map((column) => (
//                     <option key={column} value={column}>
//                       {columnFilterOperators[column].label}
//                     </option>
//                   ))}
//                 </NativeSelect>
//               </FormControl>

//               <FormControl variant='standard' sx={{ width: '100%' }}>
//                 <InputLabel>Operator</InputLabel>
//                 <NativeSelect value={filter.operator} onChange={handleOperatorChange}>
//                   {columnFilterOperators[filter.column]?.operators.map((operator) => (
//                     <option key={operator} value={operator}>
//                       {operator}
//                     </option>
//                   ))}
//                 </NativeSelect>
//               </FormControl>

//               {filter.operator !== 'isanyof' ? (
//                 <TextField
//                   autoFocus
//                   value={filter.value}
//                   onChange={handleValueChange}
//                   label='Value'
//                   sx={{
//                     width: '100%',
//                     visibility:
//                       filter.operator === 'isempty'
//                         || filter.operator === 'isnotempty'
//                         ? 'hidden'
//                         : 'visible'
//                   }}
//                   type={columnFilterOperators[filter.column]?.type || 'text'}
//                 // autoComplete='off'
//                 />
//               ) :
//                 <Autocomplete
//                   multiple
//                   onChange={handleValueChangeMultiple}
//                   onInputChange={handleValueInputChange}
//                   options={isanyofFilterValue.map((value) => value)}
//                   value={isanyofFilterValues}
//                   freeSolo
//                   renderTags={(value, getTagProps) =>
//                     value.map((option, index) => (
//                       <Chip label={option} {...getTagProps({ index })} />
//                     ))
//                   }
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       autoFocus
//                       label='Value'
//                       sx={{ width: '100%' }}
//                       type={columnFilterOperators[filter.column]?.type || 'text'}
//                     />
//                   )}
//                   disablePortal
//                 />
//               }
//             </Box>
//           </ClickAwayListener>
//         </Paper>
//       </Popper>
//     </>
//   );
// };

// export default User;