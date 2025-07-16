import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableRow, IconButton} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';

import * as gateway from '@components/common/Gateway';
import {useTranslation} from "react-i18next";

const History = ({ open, handleClose, projectDetail }) => {

  const { t } = useTranslation();

  return (
	<Dialog
		open={open}
      	onClose={handleClose}
      	aria-labelledby="project-detail-title"
      	maxWidth="sm"
      	fullWidth
    >
	<DialogTitle id="project-detail-title">
		프로젝트 분석 상세 정보
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
	</DialogTitle>
	<DialogContent dividers>
		<Table>
			<TableBody>
	            <TableRow>
					<TableCell component="th">{t('analytic__header__project')}</TableCell>
	              	<TableCell>{projectDetail.projectName}</TableCell>
	            </TableRow>
	            <TableRow>
					<TableCell component="th">{t('analytic__header__anaysis_date')}</TableCell>
					<TableCell>{projectDetail.updatedAt}</TableCell>
	            </TableRow>
	            <TableRow>
					<TableCell component="th">{t('analytic__header__anaysis_index')}</TableCell>
					<TableCell>{t('analytic__value__analysis_index', {idx: projectDetail.idx} )}</TableCell>
	            </TableRow>
	            <TableRow>
	              	<TableCell component="th">{t('analytic__header__vulnerability_result')}</TableCell>
	              	<TableCell>{t('analytic__header__success')} : {projectDetail.vulnerabilityPassCnt} / {t('analytic__header__total')} : {projectDetail.vulnerabilityTotalCnt} ({projectDetail.vulnerabilityRate} %)</TableCell>
	            </TableRow>
	            <TableRow>
	              	<TableCell component="th">{t('analytic__header__obfuscation_result')}</TableCell>
	              	<TableCell>{t('analytic__header__success')} : {projectDetail.obfuscationPassCnt} / {t('analytic__header__total')} : {projectDetail.obfuscationTotalCnt} ({projectDetail.obfuscationRate} %)</TableCell>
	            </TableRow>
	            <TableRow>
					<TableCell component="th">{t('analytic__header__warning__log__result__download')}</TableCell>
              		<TableCell>
              			{ projectDetail.logFileAbsolutePath ?
		                <Button
		                  variant="contained"
		                  color="primary"
		                  startIcon={<DownloadIcon />}
		                  onClick={() => gateway.fileDownload('/api/v1/project/files/log', projectDetail.projectId, projectDetail.idx)}
		                  target="_blank"
		                  sx={{ fontSize: 13 }}
		                >
		                  download
		                </Button>
		                :
		                '-'
		                }
	              	</TableCell>
	            </TableRow>
	            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
					<TableCell component="th">{t('analytic__header__obfuscation__zip')}</TableCell>
					<TableCell>
						{ projectDetail.zipFileAbsolutePath ?
		                <Button
		                  variant="contained"
		                  color="primary"
		                  startIcon={<DownloadIcon />}
		                  onClick={() => gateway.fileDownload('/api/v1/project/files/zip', projectDetail.projectId, projectDetail.idx)}
		                  target="_blank"
		                  sx={{ fontSize: 13 }}
		                >
		                  download
		                </Button>
		                :
		                '-'
		                }
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	</DialogContent>
	<DialogActions>
		<Button onClick={handleClose} color="primary">
         닫기
		</Button>
	</DialogActions>
    </Dialog>
  );
};

export default History;
