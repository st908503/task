import Form from './pages/Form';
import UserData from './pages/UserData';
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
