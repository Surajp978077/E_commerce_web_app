import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import getDesignTokens from './customPalette';

const getTheme = (mode) => {
    const designTokens = getDesignTokens(mode);
    const theme = createTheme(designTokens);
    return responsiveFontSizes(theme);
};

export default getTheme;
