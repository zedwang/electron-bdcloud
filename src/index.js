import React from 'react';
import { render } from 'react-dom';
import Root from './container';
import '@fortawesome/fontawesome-free-solid';
import '@fortawesome/fontawesome-free-regular';
import 'normalize.css';
import './styles/index.scss';

render(<Root/>, document.getElementById('root'));
