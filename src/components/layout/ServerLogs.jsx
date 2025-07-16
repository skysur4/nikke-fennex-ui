import * as React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, LinearProgress, IconButton, Typography, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import AttachmentIcon from '@mui/icons-material/Attachment';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CheckIcon from '@mui/icons-material/Check';

import { useNotification } from '@components/common/NotificationContext';
import {useTranslation} from "react-i18next";

function ServerLogs({projectId}) {
	const { t } = useTranslation();
	const { eventSource } = useNotification();
	const [open, setOpen] = React.useState(false);
	const [logs, setLogs] = React.useState([]);
	const [buffer, setBuffer] = React.useState(0);
	const [progress, setProgress] = React.useState(0);
	const contentRef = React.useRef(null);

	const showLogs = (message, progress, buffer) => {
		setLogs((prevArray) => [...prevArray, message]);
		setProgress(progress);
		setBuffer(buffer);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	React.useEffect(() => {
		if(eventSource && projectId){
			eventSource.addEventListener(projectId, (e) => {
				const res = e.data;
				const log = JSON.parse(res);

				if(log.type === 'initialize'){
					setLogs([]);
					setBuffer(0);
					setProgress(0);
					showLogs(log, log.progress, log.buffer);
				} else {
					showLogs(log, log.progress, log.buffer);
				}
			});
		}
	}, [eventSource, projectId]);

	React.useEffect(() => {
		if (contentRef.current) {
			contentRef.current.scrollTop = contentRef.current.scrollHeight;
		}
	}, [logs]);

  return (
	      <Dialog
	        open={open}
	        aria-labelledby="alert-dialog-title"
	        aria-describedby="alert-dialog-description"
	        sx={{ '& .MuiDialog-paper': { width: '100%'} }}
	      	maxWidth="md"
	      >
	        <DialogTitle id="alert-dialog-title">
	        	<span style={{color: 'skyblue'}}>{t("analytic__file__analyze")} { progress > 99 && t("analytic__analyze__completed") }</span>
	        	<LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
	        </DialogTitle>
	        { progress > 99 &&
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
	        }
	        <DialogContent
	        	ref={contentRef}
	        	dividers={true}
	        	style={{ maxHeight: '800px'}}
	        >
				<DialogContentText id="alert-dialog-description">
			        {logs.map((log, index) => (
						<React.Fragment key={index}>
							{log.type === "initialize" && (
								<><FlightTakeoffIcon color="success"/> <Typography component="span" color={log.type} >{log.message}</Typography></>
							)}
							{log.type === "info" && (
								<><BlurOnIcon color="info"/> <Typography component="span" color={log.type} >{log.message}</Typography></>
							)}
							{log.type === "log" && (
								<><AttachmentIcon color="secondary"/> <Typography component="span" color={log.type} >{log.message}</Typography></>
							)}
							{log.type === "warn" && (
								<><DoneOutlineIcon color="warning"/> <Typography component="span" color={log.type} >{log.message}</Typography></>
							)}
							{log.type === "finish" && (
								<><FlightLandIcon color="success"/> <Typography component="span" color={log.type} >{log.message}</Typography></>
							)}
							<br/>
						</React.Fragment>
			        ))}
	          </DialogContentText>
	        </DialogContent>
	        { progress > 99 &&
			<DialogActions>
		        <IconButton aria-label="close" onClick={handleClose}>
		          <CheckIcon />
		          <Typography>{t("btn__ok")}</Typography>
		        </IconButton>
			</DialogActions>
			}
	      </Dialog>
  );
}

export default ServerLogs;
