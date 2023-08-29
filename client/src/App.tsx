import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TrackingPlanForm from './components/trackingPlanForm';
import TrackingPlanList from './components/trackingPlanList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/add-plan" element={<TrackingPlanForm/>} />
          <Route path="/" element={<TrackingPlanList/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
