import { styled } from '@mui/material/styles';
import { Badge, Card, Container, Typography } from '@mui/material';

// Styled Container for Dasboard
const DashboardContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(4, 0),
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(1, 0),
    },
}));

// Styled Card for DashboardCard
const DashboardCardContainer = styled(Card)(({ theme }) => ({
    '&:hover': {
        boxShadow: theme.palette.mode === 'dark'
            ? '0 0 4px rgba(255, 255, 255, 0.5)'
            : '0 0 20px rgba(0, 0, 0, 0.3)',
    },
    cursor: 'pointer',
}));
// Styled Title for DashboardCard
const DashboardTitle = styled(Typography)(({ theme }) => ({
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.primary.main, // #90CAF9 <-- light blue in dark mode
    color: theme.palette.primary.contrastText,  // #000000DE <-- black in dark mode
}));
// Styled Content for DashboardCard
const DashboardContent = styled(Typography)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
}));

// Styled Badge for QC Request pending count
const StyledQCRequestBadge = styled(Badge)(({ theme }) => ({
    marginLeft: theme.spacing(2),
}));

// Styled Card for Disabled DashboardCard
const DisabledCard = styled(Card)({
    opacity: 0.6,
    cursor: 'not-allowed',
});
// Styled Title for Disabled DashboardCard
const DisabledTitle = styled(Typography)(({ theme }) => ({
    padding: theme.spacing(1, 2),
    color: theme.palette.text.disabled,
    backgroundColor: theme.palette.mode === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[400],
}));
// Styled Content for Disabled DashboardCard
const DisabledContent = styled(Typography)(({ theme }) => ({
    padding: theme.spacing(2),
    color: theme.palette.text.disabled,
}));

export {
    DashboardContainer,
    DashboardCardContainer,
    DashboardTitle,
    DashboardContent,
    StyledQCRequestBadge,
    DisabledCard,
    DisabledTitle,
    DisabledContent,
};
