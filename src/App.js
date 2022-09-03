import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import NewProject from './components/pages/NewProject';

import Container from './components/layout/Container';

function App() {
  return (
     <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/contact">Contato</Link>
        <Link to="/company">Empresa</Link>
        <Link to="/newproject">Novo Projeto</Link>
      </div>
        <Container customClass="minHeight">
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/company" element={<Company />} />
          <Route exact path="/newproject" element={<NewProject />} />
      </Routes>
        </Container>
      <p>Footer</p>
     </Router>
  );
}

export default App;
