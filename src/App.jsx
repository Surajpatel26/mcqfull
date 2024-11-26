import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import TestSetupPage from './components/TestSetupPage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ProfilePage from './components/ProfilePage';
import TestInstructions from './components/TestInstructions';
import RequestForm from './components/CreateRequest';
import Notifications from './components/UserNotifications';
import AdminLogin from './Admin/AdminLogin';
import AdminLayout from './Admin/AdminDashboard';
import { isAuthenticated } from './utils/userAuth';
import { isAdminAuthenticated } from './utils/adminAuth';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(isAdminAuthenticated());

    useEffect(() => {
        const userStatus = isAuthenticated();
        const adminStatus = isAdminAuthenticated();

        setIsLoggedIn(userStatus);
        setIsAdminLoggedIn(adminStatus);
    }, []);

    return (
        <Router>
            <Routes>
                {/* Public User Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/test-setup" element={<TestSetupPage />} />
                <Route path="/quiz/:exam_id" element={<QuizPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/test-instructions" element={<TestInstructions />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/results/:exam_id/:user_id" element={<ResultPage />} />
                <Route path="/request" element={<RequestForm />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/dashboard" element={<ProfilePage />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                {isAdminLoggedIn ? (
                    <Route path="/admin/*" element={<AdminLayout />} />
                ) : (
                    <Route path="/admin/*" element={<Navigate to="/admin/login" />} />
                )}

                {/* Fallback for Undefined Routes */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
