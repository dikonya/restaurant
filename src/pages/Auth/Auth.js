import { Container } from 'react-bootstrap';
import {useLocation , Outlet} from 'react-router-dom';
import '../../style/all.css';



const Auth = () => {

  const location = useLocation();

  const isLogin = location.pathname === "/login";
  return (
    <Container>
      <Outlet />
     { }
    </Container>
  );
};

export default Auth;