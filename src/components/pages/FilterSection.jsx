import React from 'react';
import {
    Box, Checkbox, FormControlLabel, FormGroup, TextField, Tooltip, Radio, RadioGroup, Grid, Divider
} from '@mui/material';
import DotIcon from '@mui/icons-material/FiberManualRecordOutlined';
import ListIcon from '@mui/icons-material/List';
import { useTheme } from '@mui/material/styles';
import * as gateway from '@components/common/Gateway';
import { useTranslation } from "react-i18next";

const FilterSection = ({ onFilterChange, resetFilters }) => {
    const currentTheme = useTheme();
    const { t } = useTranslation();

	const [includeFailedEnabled, setIncludeFailedEnabled] = React.useState(true);
    const [filterParams, setFilterParams] = React.useState({
        sourceObfuscation: [],
        byteObfuscation: '',
        scanVulnerability: false,
        includeFailed: false,
        extentions: '',
        proxyContract: false
    });

    const [sourceOptions, setSourceOptions] = React.useState([]);
    const [bytecodeOptions, setBytecodeOptions] = React.useState([]);

    React.useEffect(() => {
        const fetchSourceOptions = async () => {
            const result = await gateway.get('/api/v1/code/obfuscation/source');
            if (result.status && result.data.totalCnt > 0) {
                setSourceOptions(result.data.list.map(option => ({ ...option })));
            }
        };

        const fetchBytecodeOptions = async () => {
            const result = await gateway.get('/api/v1/code/obfuscation/byte');
            if (result.status && result.data.totalCnt > 0) {
                setBytecodeOptions(result.data.list.map(option => ({ ...option })));
            }
        };

        fetchSourceOptions();
        fetchBytecodeOptions();
    }, []);

    React.useEffect(() => {
        if (resetFilters) {
            setFilterParams({
                sourceObfuscation: [],
                byteObfuscation: '',
                scanVulnerability: false,
                includeFailed: false,
                extentions: '',
                proxyContract: false
            });
        }
    }, [resetFilters]);

    const handleCheckboxChange = (event) => {
        const { name, checked, value } = event.target;
        const groupCode = event.target.getAttribute('groupcode');
       	const newValue = checked;

        setFilterParams((prevParams) => {
            let updatedParams = { ...prevParams };

            if (groupCode === 'sourcecode_obfuscation') {
                if (name === 'allSource') {
                    const allSelected = checked ? sourceOptions.map(option => option.code) : [];
                    updatedParams.sourceObfuscation = allSelected;
                } else {
                    const updatedSourceCodes = checked
                        ? [...prevParams.sourceObfuscation, name]
                        : prevParams.sourceObfuscation.filter(code => code !== name);
                    const allSourceSelected = sourceOptions.every(option => updatedSourceCodes.includes(option.code));
                    updatedParams.sourceObfuscation = updatedSourceCodes;
                    updatedParams.allSource = allSourceSelected;
                }
                updatedParams.byteObfuscation = '';
            } else if (groupCode === 'bytecode_obfuscation') {
                updatedParams.byteObfuscation = value;
                updatedParams.sourceObfuscation = [];
            } else {
                updatedParams[name] = newValue;

                if(name === 'scanVulnerability'){
					setIncludeFailedEnabled(!newValue);
					updatedParams['includeFailed'] = false;
				}
            }

            onFilterChange(updatedParams);
            return updatedParams;
        });
    };

    const handleTextChange = (event) => {
        const { name, value } = event.target;
        setFilterParams((prevParams) => {
            const updatedParams = { ...prevParams, [name]: value };
            onFilterChange(updatedParams);
            return updatedParams;
        });
    };

    return (
        <div className="section-filter">
            <Grid container justifyContent="space-between" spacing={1}>
                <Grid item md={12} sm={12} xs={12}>
                    <Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                        <Box display="flex" alignItems="center">
                            <ListIcon />
                            <span>{t('analytic__title__conditions')}</span>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    <FormGroup>
                        <Box sx={{ mb: 1, padding: '15px', border: '1px solid', borderColor: currentTheme.palette.border, borderRadius: 1, boxSizing: 'border-box' }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} md={2}>
                                    <Box display="flex" alignItems="center">
                                        <DotIcon sx={{ fontSize: 7, mr: 1 }} />
                                        <span>{t("algorithm__sourcecode_obfuscation")}</span>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={10}>
                                    <FormControlLabel
                                        control={<Checkbox checked={filterParams.sourceObfuscation.length === sourceOptions.length} onChange={handleCheckboxChange} name="allSource" inputProps={{ groupcode: 'sourcecode_obfuscation' }} />}
                                        label="All"
                                    />
                                    {sourceOptions.map((option, index) => (
                                        <Tooltip arrow title={t(option.tooltipName)} key={option.code}>
                                            <FormControlLabel key={index}
                                                control={<Checkbox
                                                    checked={filterParams.sourceObfuscation.includes(option.code)}
                                                    onChange={handleCheckboxChange}
                                                    name={option.code} value={option.code}
                                                    inputProps={{ groupcode: 'sourcecode_obfuscation' }} />}
                                                label={t(option.codeName)} />
                                        </Tooltip>
                                    ))}
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <Box display="flex" alignItems="center">
                                        <DotIcon sx={{ fontSize: 7, mr: 1 }} />
                                        <span>{t("algorithm__bytecode_obfuscation")}</span>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={10}>
                                    <RadioGroup row name="byteObfuscation" value={filterParams.byteObfuscation} onChange={handleCheckboxChange}>
                                        {bytecodeOptions.map((option, index) => (
                                            <Tooltip arrow title={t(option.tooltipName)} key={option.code}>
                                                <FormControlLabel key={index}
                                                    value={option.code}
                                                    control={<Radio inputProps={{ groupcode: 'bytecode_obfuscation' }} />}
                                                    label={t(option.codeName)} />
                                            </Tooltip>
                                        ))}
                                    </RadioGroup>
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <FormControlLabel
                                        control={<Checkbox checked={filterParams.scanVulnerability} onChange={handleCheckboxChange} name="scanVulnerability" />}
                                        label={t("algorithm__vulnerability")} />
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <Tooltip arrow title={t('algorithm__desc__include_failed_vulnerability')} key={'algorithm__name__include_failed_vulnerability'}>
                                        <FormControlLabel
                                            control={<Checkbox checked={filterParams.includeFailed} onChange={handleCheckboxChange} name="includeFailed" disabled={includeFailedEnabled} />}
                                            label={t('algorithm__name__include_failed_vulnerability')} />
                                    </Tooltip>
                                </Grid>

                                {/* Uncomment and use if necessary
                                <Grid item xs={12} md={2}>
                                    <Tooltip arrow title={t('algorithm__desc__include_proxy_contract')} key={'algorithm__name__include_proxy_contract'}>
                                        <FormControlLabel control={<Checkbox checked={filterParams.proxyContract} onChange={handleCheckboxChange} name="proxyContract" />}
                                            label={t('algorithm__name__include_proxy_contract')} />
                                    </Tooltip>
                                </Grid>
                                */}

                                <Grid item xs={12} md={8}>
                                    <TextField
                                        label={t("analytic__placeholder__extension")}
                                        variant="outlined"
                                        value={filterParams.extentions}
                                        onChange={handleTextChange}
                                        name="extentions"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </FormGroup>
                </Grid>
            </Grid>
        </div>
    );
};

export default FilterSection;
