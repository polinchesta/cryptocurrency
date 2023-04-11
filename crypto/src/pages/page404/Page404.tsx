import React from 'react';
import './Page404.scss';
import monster from '../../../public/monster.svg';

export function Page404() {
    return (
        <div className="error">
            <h2>Упс... Страница не найдена, но мы поищем</h2>
            <img src={monster} alt="Image404" />
        </div>
    );
}
