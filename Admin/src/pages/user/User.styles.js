import { styled } from '@mui/material/styles';
import {
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Box,
    Button,
    TextField,
    Autocomplete,
    Divider,
    FormControl,
    Table,
    TableHead,
} from '@mui/material';

const StyledDivider = styled(Divider)(({ theme }) => ({
    margin: theme.spacing(2, 0),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '2px solid #f5f5f5',
    borderRadius: '10px',
    width: 'fit-content',
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    marginBottom: theme.spacing(1)
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    // overflowX: 'auto',
}));

const StyledTable = styled(Table, {
    shouldForwardProp: (prop) => prop !== 'loading' && prop !== 'error' && prop !== 'length'
})(({ theme, loading, error, length }) => ({
    // overflowX: 'auto',
    minHeight: loading || error || length === 0 ? '400px' : undefined,
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#292929' : '#F0EEEE',
}));

const StyledTableRowAlt = styled(TableRow)(({ theme }) => ({
    // '&:nth-of-type(even)': {
    //     backgroundColor: theme.palette.mode === 'dark' ? '#1E1E1E' : '#F7F7F7',
    // },
    // '&:nth-of-type(odd)': {
    //     backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#FFFFFF',
    // },
}));

const StyledTableCell = styled(TableCell)(({ theme, type }) => ({
    fontSize: '1rem',
    textAlign: type === 'text' ? 'left' : 'right',
    width: '25%',
}));

const StyledTableHeadCell = styled(StyledTableCell, {
    shouldForwardProp: (prop) => prop !== 'isSelected'
})(({ theme, isSelected }) => ({
    fontWeight: 'bold',
    cursor: 'pointer',

    '&:hover': {
        '& .MuiBox-root .MuiBox-root': {
            opacity: isSelected ? 1 : 0.2,
        },
    },
    '& .MuiBox-root .MuiBox-root': {
        opacity: isSelected ? 1 : 0,
    },
    '& .MuiBox-root': {
        display: 'flex',
        alignItems: 'center',
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    width: '100%',
    paddingBottom: theme.spacing(0),
    '&:hover': {
        backgroundColor: 'rgba(144, 202, 249, 0.3)',
    },
    backgroundColor: theme.palette.mode === 'dark' ? '#292929' : '#F0EEEE',
    borderRadius: '0px',
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: theme.spacing(1),
    backgroundColor: theme.palette.mode === 'dark' ? '#292929' : '#F0EEEE',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
}));

const FilterPaper = styled(Paper)(({ theme }) => ({
    borderRadius: '4px',
}));

const FilterBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    display: 'flex',
    // flex: '1 1 0%',
    alignItems: 'center',
}));

const FilterClearButton = styled(Button)(({ theme }) => ({
    color: theme.palette.grey[500],
    padding: theme.spacing(1),
    minWidth: 'unset',
    borderRadius: '50%',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
}));

const FilterFormControl = styled(FormControl)(({ theme }) => ({
    width: '100%',
}));

const FilterValueInput = styled(TextField, {
    shouldForwardProp: (prop) => prop !== 'filter'
})(({ theme, filter }) => ({
    width: '100%',
    visibility: filter.operator === 'isempty' || filter.operator === 'isnotempty'
        ? 'hidden'
        : 'visible',
}));

const FilterAutocompleteValueInput = styled(Autocomplete)(({ theme }) => ({
    width: '100%',
}));

export {
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
}
