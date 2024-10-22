import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import CadastroReserva from "./components/CadastroReserva";
import ListaVagas from "./components/ListaVagas";
import VagasDisponiveis from "./components/VagasDisponiveis";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/cadastro">Cadastro de Vaga</Link>
          </li>
          <li>
            <Link to="/listar">Listar Vagas</Link>
          </li>
          <li>
            <Link to="/disponiveis">Vagas Disponíveis</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/cadastro" />} />{" "}
        {/* Redireciona para Cadastro de Vaga */}
        <Route path="/cadastro" element={<CadastroReserva />} />
        <Route path="/listar" element={<ListaVagas />} />
        <Route path="/disponiveis" element={<VagasDisponiveis />} />
      </Routes>
    </Router>
  );
}

export default App;
