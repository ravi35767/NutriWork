import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  certificates: [
    {
      id: 1,
      name: 'Training Certificate',
      organization: 'Tropsch Systems',
      issueDate: '2024-05',
      certificateUrl: 'dummy-url-1'
    }
  ]
};

const certificatesSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {
    addCertificate: (state, action) => {
      const newCertificate = {
        id: state.certificates.length + 1,
        ...action.payload,
      };
      state.certificates.push(newCertificate);
    },
    deleteCertificate: (state, action) => {
      state.certificates = state.certificates.filter(cert => cert.id !== action.payload);
    }
  }
});

export const { addCertificate, deleteCertificate } = certificatesSlice.actions;
export default certificatesSlice.reducer; 