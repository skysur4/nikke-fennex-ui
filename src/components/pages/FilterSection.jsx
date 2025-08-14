import React from 'react';
import {Box, Button, FormControl, FormGroup, Grid, InputLabel, NativeSelect} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { useTranslation } from "react-i18next";

import ReplayIcon from '@mui/icons-material/Replay';

const FilterSection = ({ onFilterChange, rowfilters, onClickReload }) => {
    const currentTheme = useTheme();
    const { t } = useTranslation();

    return (
        <div className="section-filter">
            <Grid container backgroundColor={currentTheme.palette.background.default + '50'} borderRadius={2} boxShadow={currentTheme.shadows[1]} justifyContent="space-between" alignItems={"baseline"}>
                <Grid item md={6}>
                    <FormGroup>
                        <Box display="flex">
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel>{t('search__condition__union')}</InputLabel>
                                <NativeSelect
                                    name="unionName"
                                    value={rowfilters.unionName}
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

                <Grid item md={6}>
                    <FormGroup>
                        <Box display="flex" justifyContent="right" id={"test"}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <Button
                                    variant="outlined"
                                    endIcon={<ReplayIcon />}
                                    onClick={onClickReload}
                                >Reload
                                </Button>
                            </FormControl>
                        </Box>
                    </FormGroup>
                </Grid>
            </Grid>
        </div>
    );
};

export default FilterSection;
