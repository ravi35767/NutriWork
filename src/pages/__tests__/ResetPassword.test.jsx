import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResetPassword from '../ResetPassward';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock images
jest.mock('../../assets/Nutriwork-logo.png', () => 'nutriwork-logo.png');

describe('ResetPassword', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders reset password form with all elements', () => {
    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    // Check if main elements are present
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
    expect(screen.getByText('Enter your new password below.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your new password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
  });

  test('handles password input changes', () => {
    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText('Enter your new password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');

    fireEvent.change(passwordInput, { target: { value: 'newPassword123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newPassword123' } });

    expect(passwordInput.value).toBe('newPassword123');
    expect(confirmPasswordInput.value).toBe('newPassword123');
  });

  test('navigates to login page after successful password reset', () => {
    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Enter your new password'), {
      target: { value: 'newPassword123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), {
      target: { value: 'newPassword123' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    // Check if navigation occurred
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('renders logo and branding elements', () => {
    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    // Check if logo and branding elements are present
    expect(screen.getByAltText('Nutriwork Logo')).toBeInTheDocument();
    expect(screen.getByText('Nutriwork')).toBeInTheDocument();
    expect(
      screen.getByText('Your Gateway to Personalized Training and Nutrition')
    ).toBeInTheDocument();
  });
}); 