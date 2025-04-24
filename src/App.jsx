import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes'; // Import the AppRoutes component we created

function App() {
  return (
    <Router>
      <AppRoutes /> {/* Render the routes defined in src/routes/index.jsx */}
    </Router>
  );
}

export default App;
