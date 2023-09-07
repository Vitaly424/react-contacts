import React from 'react';
import cls from './NotFoundPage.module.scss';

const NotFoundPage = () => (
    <div className={cls.block}>
        <img className={cls.img} src={'https://podzamenu.ru/public/v5/404.png'}/>
    </div>
);

export default NotFoundPage;
