import './App.css';
import Form from './Form';
import UserData from './UserData';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/userdata' element={<UserData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
