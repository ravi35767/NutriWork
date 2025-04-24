import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import ForgetPassword from '../ForgetPassword';
import authReducer from '../../redux/authSlice';

// Mock images
jest.mock('../../assets/Nutriwork-logo.png', () => 'nutriwork-logo.png');

// Mock redux dispatch
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Create mock store
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

describe('ForgetPassword', () => {
  const renderForgetPassword = (store = createMockStore()) => {
    return render(
      <Provider store={store}>
        <MemoryRouter>
          <ForgetPassword />
        </MemoryRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders forgot password form with all elements', () => {
    renderForgetPassword();
    
    // Check if main elements are present
    expect(screen.getByText('Forgot Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByText('Send Verification Code')).toBeInTheDocument();
    expect(screen.getByText('Enter your email to receive a verification code.')).toBeInTheDocument();
  });

  test('handles email input change', () => {
    renderForgetPassword();
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(emailInput.value).toBe('test@example.com');
  });

  test('shows error message when reset password fails', () => {
    const store = createMockStore({
      error: 'Email not found',
    });
    
    renderForgetPassword(store);
    expect(screen.getByText('Email not found')).toBeInTheDocument();
  });

  test('shows loading state during password reset request', () => {
    const store = createMockStore({
      loading: true,
    });
    
    renderForgetPassword(store);
    expect(screen.getByText('Sending...')).toBeInTheDocument();
  });

  test('shows reset password form after email verification', () => {
    renderForgetPassword();
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    const verifyButton = screen.getByText('Send Verification Code');
    fireEvent.click(verifyButton);
    
    // After verification, should show reset password form
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
  });

  test('handles password reset', () => {
    renderForgetPassword();
    
    // First verify email
    const emailInput = screen.getByPlaceholderText('Enter your email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Send Verification Code'));
    
    // Then fill in new passwords
    const newPasswordInput = screen.getByPlaceholderText('New Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    
    fireEvent.change(newPasswordInput, { target: { value: 'newpassword123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword123' } });
    
    // Submit new password
    fireEvent.click(screen.getByText('Reset Password'));
    
    // Should navigate to login page
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
}); 