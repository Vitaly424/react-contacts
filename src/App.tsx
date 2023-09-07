import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { AppBar, IconButton, Box, Typography, Button, Toolbar, TextField } from "@mui/material";
import cls from './App.module.scss';
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "./store/config/store";
import { getUserSelectors, userActions } from 'store/User';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
    const user = useSelector(getUserSelectors.authData);
    const inited = useSelector(getUserSelectors._inited);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch])

    const onLogout = () => {
        dispatch(userActions.logout());
        navigate('/', { replace: true });
    }

    return (
        <div className="app">
            <AppBar component="nav" className={cls.nav}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Контакты
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {user ? <Button sx={{ color: '#fff' }} onClick={onLogout}>
                            Выйти
                        </Button> : null}
                    </Box>
                </Toolbar>
            </AppBar>

            <div className='app__pages'>
                {inited ? <Suspense fallback={<p>Загрузка...</p>}>
                    <Outlet />
                </Suspense> : null}
            </div>
        </div>
    );
}

export default App;
