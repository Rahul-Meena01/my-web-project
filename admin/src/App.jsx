import React from 'react';
// Line 2 ko isse badal dein
import Navbar from './Components/Navbar/Navbar'; // .jsx likhna bhi zaroori nahi hai, ye bhi kaam karega
import Admin from './pages/Admin/Admin'; // .jsx likhna bhi zaroori nahi hai, ye bhi kaam karega
const App = () => {
  return (
    <div>
      <Navbar />
      <Admin/>
    </div>
  )
}

export default App;