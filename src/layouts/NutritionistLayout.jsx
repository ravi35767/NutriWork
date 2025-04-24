import React, { useState } from "react";
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import NutritionistHeader from '../components/nutritionist/NutritionistHeader';
import NutritionistSidebar from '../components/nutritionist/Sidebar';
import { Outlet } from 'react-router-dom';

const LayoutRoot = styled(Box)({
  display: 'flex',
  height: '100vh',
  overflow: 'hidden',
  width: '100%'
});

const LayoutContent = styled(Box)({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

const MainContent = styled(Box)({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
  backgroundColor: '#F5F5F5'
});

const NutritionistLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <LayoutRoot>
      <Box
        sx={{
          width: sidebarOpen ? 300 : 0,
          transition: 'width 0.3s ease',
          overflow: 'hidden',
        }}
      >
        <NutritionistSidebar />
      </Box>
      <LayoutContent>
        <NutritionistHeader onToggleSidebar={handleToggleSidebar} />
        <MainContent>
          <Outlet />
        </MainContent>
      </LayoutContent>
    </LayoutRoot>
  );
};

export default NutritionistLayout; 