import { createRoot } from 'react-dom/client';
import './index.css';

import Entry from './index.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element not found');
}

createRoot(rootElement).render(<Entry />);
