import React from 'react';
import { Box, FormControl, FormGroup, Grid, InputLabel, NativeSelect } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { useTranslation } from "react-i18next";

const FilterSection = ({ onFilterChange, rowfilters }) => {
    const currentTheme = useTheme();
    const { t } = useTranslation();

    return (
        <div className="section-filter">
            <Grid container backgroundColor={currentTheme.palette.background.default + '50'} borderRadius={2} boxShadow={currentTheme.shadows[1]} justifyContent="space-between">
                <Grid item md={6} sm={6} xs={6}>
                    <FormGroup>
                        <Box display="flex" alignItems="center" justifyContent="left" pl={2} pr={2} pt={1} pb={1}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel>{t('search__condition__union')} 오버히트</InputLabel>
                                <NativeSelect
                                    name="overheat"
                                    value={rowfilters.overheat}
                                    onChange={onFilterChange}
                                >
                                    <option value={1.00}>0%</option>
                                    <option value={1.05}>5%</option>
                                    <option value={1.10}>10%</option>
                                </NativeSelect>
                            </FormControl>
                        </Box>
                    </FormGroup>
                </Grid>
                <Grid item md={6} sm={6} xs={6}>
                    <FormGroup>
                        <Box display="flex" alignItems="center" justifyContent="right" pl={2} pr={2} pt={1} pb={1}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel>{t('search__condition__union')}</InputLabel>
                                <NativeSelect
                                    name="union"
                                    value={rowfilters.union}
                                    onChange={onFilterChange}
                                >
                                    <option value={'expert'}>{t('search__condition__union_expert')}</option>
                                    <option value={'senior'}>{t('search__condition__union_senior')}</option>
                                    <option value={'junior'}>{t('search__condition__union_junior')}</option>
                                </NativeSelect>
                            </FormControl>
                        </Box>
                    </FormGroup>
                </Grid>
            </Grid>
        </div>
    );
};

export default FilterSection;
