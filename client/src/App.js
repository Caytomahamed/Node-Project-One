import './App.css';
import Form from './component/Form';
import User from './component/User';

function App() {
  return (
    <div className="App">
      <div className='form-con'>
      <Form/>
      </div>
      
      <div className='user-con'>
      <User/>
      </div>
    </div>
  );
}

export default App;
