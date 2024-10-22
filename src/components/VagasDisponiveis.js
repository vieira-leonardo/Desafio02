import React, { useState, useEffect } from "react";

function VagasDisponiveis() {
  const [vagasOcupadas, setVagasOcupadas] = useState([]);
  const [vagasDisponiveis, setVagasDisponiveis] = useState({});
  const [blocoSelecionado, setBlocoSelecionado] = useState("");

  useEffect(() => {
    const reservasSalvas = JSON.parse(localStorage.getItem("reservas")) || [];
    setVagasOcupadas(reservasSalvas);

    const vagasPorBloco = {};

    for (let i = 65; i <= 90; i++) {
      const bloco = String.fromCharCode(i);
      vagasPorBloco[bloco] = new Array(50).fill(true);
    }

    // Marcar as vagas ocupadas
    reservasSalvas.forEach((vaga) => {
      const bloco = vaga.bloco;
      const numeroVaga = vaga.vaga;

      if (vagasPorBloco[bloco]) {
        vagasPorBloco[bloco][numeroVaga - 1] = false;
      }
    });

    setVagasDisponiveis(vagasPorBloco);
  }, []);

  return (
    <div>
      <h2>Vagas Disponíveis</h2>
      <label htmlFor="bloco">Selecione um bloco:</label>
      <select
        id="bloco"
        value={blocoSelecionado}
        onChange={(e) => setBlocoSelecionado(e.target.value)}
      >
        <option value="">-- Escolha um bloco --</option>
        {Object.keys(vagasDisponiveis).map((bloco) => (
          <option key={bloco} value={bloco}>
            {bloco}
          </option>
        ))}
      </select>

      {blocoSelecionado && vagasDisponiveis[blocoSelecionado] ? (
        <div>
          <h3>Bloco {blocoSelecionado}</h3>
          <ul>
            {vagasDisponiveis[blocoSelecionado].map((disponivel, index) => (
              <li key={index}>
                Vaga {index + 1}: {disponivel ? "Disponível" : "Ocupada"}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        blocoSelecionado && <p>Não há vagas cadastradas para este bloco.</p>
      )}
    </div>
  );
}

export default VagasDisponiveis;
