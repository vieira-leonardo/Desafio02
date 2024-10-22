import React, { useState, useEffect } from "react";

function ListaVagas() {
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    const reservasSalvas = JSON.parse(localStorage.getItem("reservas")) || [];

    if (reservasSalvas.length === 0) {
      const vagasFicticias = [
        {
          placa: "ABC1234",
          nome: "João",
          apartamento: "101",
          bloco: "A",
          modelo: "SUV",
          cor: "Preto",
          vaga: "10",
        },
        {
          placa: "XYZ5678",
          nome: "Maria",
          apartamento: "202",
          bloco: "B",
          modelo: "Sedan",
          cor: "Branco",
          vaga: "12",
        },
      ];

      localStorage.setItem("reservas", JSON.stringify(vagasFicticias));
      setVagas(vagasFicticias);
    } else {
      setVagas(reservasSalvas);
    }
  }, []);

  const handleDelete = (index) => {
    const novasVagas = vagas.filter((_, i) => i !== index);
    localStorage.setItem("reservas", JSON.stringify(novasVagas));
    setVagas(novasVagas);
  };

  return (
    <div className="lista-vagas">
      <h2>Vagas Cadastradas</h2>
      <ul>
        {vagas.map((vaga, index) => (
          <li key={index}>
            <div>
              <strong>Placa:</strong> {vaga.placa} <br />
              <strong>Nome:</strong> {vaga.nome} <br />
              <strong>Apartamento:</strong> {vaga.apartamento} <br />
              <strong>Bloco:</strong> {vaga.bloco} <br />
              <strong>Modelo:</strong> {vaga.modelo} <br />
              <strong>Cor:</strong> {vaga.cor} <br />
              <strong>Vaga:</strong> {vaga.vaga} <br />
            </div>
            <button
              onClick={() => handleDelete(index)}
              style={{ marginTop: "10px", color: "red" }}
            >
              Apagar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaVagas;
