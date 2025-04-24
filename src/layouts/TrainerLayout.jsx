import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TrainerHeader from '../components/trainer/TrainerHeader';
import TrainerSidebar from '../components/trainer/TrainerSidebar';
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

const TrainerLayout = () => {
  return (
    <LayoutRoot>
      <TrainerSidebar />
      <LayoutContent>
        <TrainerHeader />
        <MainContent>
          <Outlet />
        </MainContent>
      </LayoutContent>
    </LayoutRoot>
  );
};

export default TrainerLayout; 