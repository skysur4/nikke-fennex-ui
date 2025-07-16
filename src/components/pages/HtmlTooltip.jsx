import React from 'react';

import { styled } from '@mui/material/styles';
import { Tooltip } from '@mui/material';
import { tooltipClasses } from '@mui/material/Tooltip';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.isDarkMode ? '#8796A5' : '#aab4be',
    color: theme.isDarkMode ? '#222024' : '#fffafa',
    maxWidth: '1100px',
    innerWidth: '50%',
    fontSize: theme.typography.pxToRem(14),
  },
}));

export default HtmlTooltip;
