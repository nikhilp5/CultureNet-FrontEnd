import * as React from 'react';
import * as Mui from '@mui/material';
import { appTheme } from '../../themes/theme';

export default function LandingPage() {
    return (
        <Mui.ThemeProvider theme={appTheme}>
            <Mui.CssBaseline />

            <Mui.Grid sx={{ flexGrow: 1 }} container space={1} mt={3}>
                <Mui.Grid item xs={12}>
                    <Mui.Grid container justifyContent="center" spacing={2}>
                        <Mui.Grid item>
                            <div className="center">
                                <Mui.Typography component="h1" variant="h4" color="secondary">
                                    Oops! Page Not Found!
                                </Mui.Typography>
                            </div>
                            <div className="center">
                                <Mui.Typography component="h1" variant="h5" color="primary">
                                    This Page does not exist, or is under development! :)
                                </Mui.Typography>
                            </div>
                        </Mui.Grid>
                    </Mui.Grid>
                </Mui.Grid>
            </Mui.Grid>


        </Mui.ThemeProvider>
    );
}