import React, { FormEventHandler, useState } from 'react';
import cls from "../../App.module.scss";
import { Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getLoginSelectors } from 'store/AuthByUsername';
import { useAppDispatch } from "store/config/store";
import { loginActions } from "store/AuthByUsername";
import { loginByUsername } from "store/AuthByUsername";
import { useNavigate, Navigate } from "react-router-dom";
import { authData } from "../../store/User/model/selectors/getUserSelectors";
import { getUserSelectors } from 'store/User'

const AuthPage = () => {
    const user = useSelector(getUserSelectors.authData);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(true);
    const username = useSelector(getLoginSelectors.username);
    const password = useSelector(getLoginSelectors.password);
    const isLoading = useSelector(getLoginSelectors.isLoading);
    const error = useSelector(getLoginSelectors.error);

    if (user) {
        return <Navigate to={'/contacts'} />
    }

    const onChangeUsername = (value: string) => {
        dispatch(loginActions.setUsername(value))
    }

    const onChangePassword = (value: string) => {
        dispatch(loginActions.setPassword(value))
    }

    const onLoginClick: FormEventHandler<HTMLFormElement> = async (e) => {
        setOpen(true);
        e.preventDefault()
        const result = await dispatch(loginByUsername({ username, password }))

        if (result.meta.requestStatus === 'fulfilled') {
            navigate('/contacts', { replace: true })
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const componentError = () => {
        return error ? <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert severity="error" sx={{ width: '100%', fontSize: '20px', display: 'flex', alignItems: 'center' }}>
                Неверный логин или пароль
            </Alert>
        </Snackbar>: null;
    }

    return (
        <form className={cls.form} noValidate autoComplete="off" onSubmit={onLoginClick}>
            <Typography
                sx={{ fontSize: 24, mb: 1, fontWeight: 'bold' }}
                color="text.secondary"
                gutterBottom
            >
                Авторизация
            </Typography>

            <div style={{ marginTop: '10px', marginBottom: '10px', fontSize: '20px' }}>
                <h3>Логин: user</h3>
                <h3>Пароль: 123</h3>
            </div>

            <TextField
                id="username"
                sx={{ width: '100%' }}
                label="Ваш логин"
                variant="outlined"
                value={username}
                onChange={(e) => onChangeUsername(e.target.value)}
            />

            <TextField
                id="password"
                label="Ваш пароль"
                sx={{ width: '100%' }}
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => onChangePassword(e.target.value)}
            />

            {componentError()}

            <Button
                variant="contained"
                color="primary"
                size="medium"
                type="submit"
                disabled={isLoading}
            >
                Войти
            </Button>
        </form>
    )
};

export default AuthPage;
