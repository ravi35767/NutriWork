import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import SignupPage from '../SignupPage';
import { createMockStore } from '../../test-utils';

// Mock images
jest.mock('../../assets/Nutriwork-logo.png', () => 'nutriwork-logo.png');
jest.mock('../../assets/trainer-client.png', () => 'trainer-client.png');

// Mock redux dispatch
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SignupPage', () => {
  const renderSignupPage = (store = createMockStore()) => {
    return render(
      <Provider store={store}>
        <MemoryRouter>
          <SignupPage />
        </MemoryRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders signup form with all elements', () => {
    renderSignupPage();
    
    // Check form fields
    expect(screen.getByLabelText('First Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email *')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone No *')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender *')).toBeInTheDocument();
    expect(screen.getByLabelText('Date of Birth *')).toBeInTheDocument();
    expect(screen.getByLabelText('Password *')).toBeInTheDocument();
    
    // Check buttons
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles form input changes', () => {
    renderSignupPage();
    
    const firstNameInput = screen.getByLabelText('First Name *');
    const lastNameInput = screen.getByLabelText('Last Name *');
    const emailInput = screen.getByLabelText('Email *');
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    
    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john@example.com');
  });

  it('shows password mismatch error', () => {
    renderSignupPage();
    
    const passwordInput = screen.getByLabelText('Password *');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password *');
    
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
    
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('shows error message when signup fails', async () => {
    const store = createMockStore({
      auth: {
        error: 'Email already exists',
        loading: false
      }
    });

    renderSignupPage(store);
    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument();
    });
  });

  it('shows loading state during signup', () => {
    const store = createMockStore({
      auth: {
        loading: true
      }
    });

    renderSignupPage(store);
    expect(screen.getByRole('button', { name: /creating account/i })).toBeDisabled();
  });

  it('navigates to login page after successful signup', async () => {
    const store = createMockStore({
      auth: {
        loading: false,
        error: null
      }
    });

    renderSignupPage(store);

    // Fill in form
    fireEvent.change(screen.getByLabelText('First Name *'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name *'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone No *'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Gender *'), { target: { value: 'male' } });
    fireEvent.change(screen.getByLabelText('Date of Birth *'), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByLabelText('Password *'), { target: { value: 'password123' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    // Wait for navigation
    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });
  });
}); 