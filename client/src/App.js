import { BrowserRouter, Route } from 'react-router-dom';
import Blog from './components/Blog';
import Login from './components/Login';
import Register from './components/Register';
import Stats from './components/Stats';



function App() {


  return (
    <BrowserRouter>
      <div>
        <Route path='/' exact component={Login} />
        <Route path='/vacations' component={Blog} />
        <Route path='/register' component={Register} />
        <Route path='/stats' component={() => <Stats />} />
      </div>
    </BrowserRouter>
  );
}

export default App;

