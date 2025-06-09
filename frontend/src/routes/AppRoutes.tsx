import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Pages
import Index from '@/pages/index';
import Gift from '@/pages/voucher-gift';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/gift" element={<Gift />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;