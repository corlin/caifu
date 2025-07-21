import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants';
import HomePage from '../pages/HomePage';

// 这些页面将在后续任务中实现
// import AboutPage from '../pages/AboutPage';
// import ContactPage from '../pages/ContactPage';
// import LoginPage from '../pages/LoginPage';
// import RegisterPage from '../pages/RegisterPage';
// import ProfilePage from '../pages/ProfilePage';
// import SearchPage from '../pages/SearchPage';
// import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        {/* 以下路由将在后续任务中实现 */}
        {/* <Route path={ROUTES.ABOUT} element={<AboutPage />} /> */}
        {/* <Route path={ROUTES.CONTACT} element={<ContactPage />} /> */}
        {/* <Route path={ROUTES.LOGIN} element={<LoginPage />} /> */}
        {/* <Route path={ROUTES.REGISTER} element={<RegisterPage />} /> */}
        {/* <Route path={ROUTES.PROFILE} element={<ProfilePage />} /> */}
        {/* <Route path={ROUTES.SEARCH} element={<SearchPage />} /> */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;