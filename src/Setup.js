// src/Setup.js
import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { loadUser } from './redux/authSlice';

const Setup = () => {
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      if (state._persist?.rehydrated) {
        dispatch(loadUser());
        unsubscribe();
      }
    });
  }, [dispatch, store]);

  return null;
};

export default Setup;