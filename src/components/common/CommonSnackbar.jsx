// Author: Monil Hitesh Andharia (B00884813)

import MuiAlert from '@mui/material/Alert';
import { UserContext } from '../../utils/UserContext';
import { useContext, forwardRef } from "react";
import { Snackbar } from "@mui/material";

export default function CommonSnackbar() {
    const { openSnackbar, setOpenSnackbar } = useContext(UserContext);
    const { snackbarMessage, setSnackbarMessage } = useContext(UserContext);
    const { snackbarSeverity, setSnackbarSeverity } = useContext(UserContext);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarMessage('');
        setOpenSnackbar(false);
    };

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    return (
        <Snackbar id="snackbar" name="snackbar" open={openSnackbar} autoHideDuration={5000} onClose={handleClose}>
            <Alert id="alert" name="alert" onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
    );
}