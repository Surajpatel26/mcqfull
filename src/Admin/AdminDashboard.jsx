import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CsvUploader from './CSVUpload';
import RequestManagement from './RequestManagement';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import './AdminDashboard.css';
import FilterQuestions from './FilterQuestions';
import UserList from './UserList';
import UserProfile from './UserProfile';
import AdminDashboard from './Dashboard';
import AdminSubtopicsPage from './AdminSubtopicsPage';

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <AdminNavbar />
            <div className="admin-content">
                <AdminSidebar />
                <div className="admin-page">
                    <Routes>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="csv-upload" element={<CsvUploader />} />
                        <Route path="request-management" element={<RequestManagement />} />
                        <Route path="questions" element={<FilterQuestions />} />
                        <Route path="users" element={<UserList />} />
                        <Route path="users/:user_id" element={<UserProfile />} />
                        <Route path="subtopics" element={<AdminSubtopicsPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
