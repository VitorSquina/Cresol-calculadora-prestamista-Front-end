import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import styled, { css } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { NovaSimulacao } from "./paginas/nova-simulacao";
import { Simulacoes } from "./paginas/simulacoes";

const queryClient = new QueryClient();

const NavBar = () => {
  const location = useLocation();
  return (
    <NavContainer>
      <StyledNavLink to="/" active={location.pathname === "/"}>
        <span>+</span> Nova Simulação
      </StyledNavLink>
      <StyledNavLink
        to="/simulacoes"
        active={location.pathname === "/simulacoes"}
      >
        <span>≡</span> Simulações
      </StyledNavLink>
    </NavContainer>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<NovaSimulacao />} />
          <Route path="/simulacoes" element={<Simulacoes />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color:
  width: 100%; 
`;

const StyledNavLink = styled(Link)<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  text-decoration: none;
  color: ${({ active }) => (active ? "#2e7d32" : "#333")};
  background-color: ${({ active }) => (active ? "#e0f7e9" : "transparent")};
  font-weight: bold;
  border-radius: 4px;
  margin: 0 8px; /* Espaçamento entre os botões */

  &:hover {
    color: #2e7d32;
    background-color: #e0f7e9;
  }

  span {
    font-size: 1.2em;
    margin-right: 8px;
  }
`;
export default App;
