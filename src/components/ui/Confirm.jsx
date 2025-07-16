import * as React from 'react';
import PropTypes from 'prop-types';

import { Button, DialogActions, DialogContent, DialogTitle, Dialog } from '@mui/material';

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>Phone Ringtone</DialogTitle>
      <DialogContent dividers>
        빈 프로젝트가 아닙니다.<br/>
        삭제하시겠습니까?
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          확인
        </Button>
        <Button onClick={handleOk}>취소</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

