// import { amber, deepOrange, grey } from '@mui/material/colors';

const getDesignTokens = (mode) => {
    // const primaryColor = mode === 'dark' ? amber[700] : amber[500];
    // const backgroundColor = mode === 'dark' ? deepOrange[900] : '#ffffff';
    // const backgroundPaperColor = mode === 'dark' ? deepOrange[900] : '#f5f5f5';
    // const textColor = mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#fff';
    // const secondaryTextColor = mode === 'light' ? grey[800] : grey[500];

    return {
        palette: {
            mode,
            // primary: {
            //   main: primaryColor
            // },
            // background: {
            //   default: backgroundColor,
            //   paper: backgroundPaperColor
            // },
            // text: {
            //   primary: textColor,
            //   secondary: secondaryTextColor
            // }
        }
    };
};

export default getDesignTokens;
