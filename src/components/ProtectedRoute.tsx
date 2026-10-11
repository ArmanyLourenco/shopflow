import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';
import { useAuth } from '../hooks/useAuth';
export default function ProtectedRoute() { const { isAuthenticated, isLoading } = useAuth(); const location = useLocation(); if (isLoading) return <Center mih="50vh"><Loader color="violet"/></Center>; return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace state={{ from: location.pathname }}/>; }
