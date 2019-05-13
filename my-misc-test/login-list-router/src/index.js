import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './router-main';

render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));