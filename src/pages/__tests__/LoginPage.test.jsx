import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../LoginPage';
import authReducer from '../../redux/authSlice';

// Mock images
jest.mock('../../assets/Nutriwork-logo.png', () => 'nutriwork-logo.png');
jest.mock('../../assets/LoginBackgroundImage1.png', () => 'login-bg1.png');
jest.mock('../../assets/LoginBackgroundImage2.png', () => 'login-bg2.png');
jest.mock('../../assets/FacebookIcon.png', () => 'facebook-icon.png');
jest.mock('../../assets/GoogleIcon.png', () => 'google-icon.png');

// Mock store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        loading: false,
        error: null,
        ...initialState,
      },
    },
  });
};

describe('LoginPage', () => {
  const renderLoginPage = (store = createMockStore()) => {
    return render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
  };

  test('renders login form with all elements', () => {
    renderLoginPage();
    
    // Check if main elements are present
    expect(screen.getByText('LOGIN')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Password')).toBeInTheDocument();
    expect(screen.getByText('Login Now')).toBeInTheDocument();
    
    // Check if images are rendered (they will be mocked)
    expect(screen.getByAltText('Nutriwork Logo')).toBeInTheDocument();
    expect(screen.getByAltText('Fitness trainer and client')).toBeInTheDocument();
  });

  test('handles email input change', () => {
    renderLoginPage();
    
    const emailInput = screen.getByPlaceholderText('Your email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(emailInput.value).toBe('test@example.com');
  });

  test('handles password input change', () => {
    renderLoginPage();
    
    const passwordInput = screen.getByPlaceholderText('Your Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(passwordInput.value).toBe('password123');
  });

  test('shows error message when provided', () => {
    const store = createMockStore({
      error: 'Invalid credentials',
    });
    
    renderLoginPage(store);
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    const store = createMockStore({
      loading: true,
    });
    
    renderLoginPage(store);
    expect(screen.getByText('Login Now')).toBeInTheDocument();
  });
}); 