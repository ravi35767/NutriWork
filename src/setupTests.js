const require = require;
const global = global;
import { jest } from '@jest/globals';
global.jest = jest;
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.mock('./src/config/api.cjs', () => ({
  API_BASE_URL: 'http://localhost:3000',
  API_ENDPOINTS: {
    LOGIN: 'http://localhost:3000/login',
    FORGOT_PASSWORD: 'http://localhost:3000/forgot-password',
    RESET_PASSWORD: 'http://localhost:3000/reset-password',
    SIGNUP_TRAINER: 'http://localhost:3000/signup/trainer',
    SIGNUP_NUTRITIONIST: 'http://localhost:3000/signup/nutritionist',
    SIGNUP_USER: 'http://localhost:3000/signup/user',
    UPDATE_PROFILE_TRAINER: 'http://localhost:3000/update/trainer',
    UPDATE_PROFILE_NUTRITIONIST: 'http://localhost:3000/update/nutritionist',
    UPDATE_PROFILE_USER: 'http://localhost:3000/update/user',
  },
}));