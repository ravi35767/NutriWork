import { describe, it, expect } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Dashboard from '../Dashboard.jsx';

describe('Dashboard Component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});