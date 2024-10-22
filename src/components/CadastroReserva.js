import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CadastroReserva() {
  const [reserva, setReserva] = useState({
    placa: "",
    nome: "",
    apartamento: "",
    bloco: "",
    modelo: "",
    cor: "",
    vaga: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const nomeTemNumero = /\d/.test(reserva.nome);
    if (nomeTemNumero) {
      alert("O nome do proprietário não pode conter números.");
      return false;
    }

    if (!/^[A-Z]$/.test(reserva.bloco)) {
      alert("O bloco deve ser uma letra de A a Z.");
      return false;
    }

    if (!/^[A-Za-z]+$/.test(reserva.cor)) {
      alert("A cor deve conter apenas letras.");
      return false;
    }

    const numeroVaga = parseInt(reserva.vaga, 10);
    if (isNaN(numeroVaga) || numeroVaga < 1 || numeroVaga > 50) {
      alert("O número da vaga deve ser um número entre 1 e 50.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const reservasSalvas = JSON.parse(localStorage.getItem("reservas")) || [];
    const vagaOcupada = reservasSalvas.find(
      (vaga) => vaga.bloco === reserva.bloco && vaga.vaga === reserva.vaga
    );

    if (vagaOcupada) {
      alert("A vaga já está ocupada neste bloco.");
      return;
    }

    console.log(reserva);
    alert("Cadastro realizado com sucesso!");

    reservasSalvas.push(reserva);
    localStorage.setItem("reservas", JSON.stringify(reservasSalvas));

    navigate("/listar");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="placa"
        placeholder="Placa do veículo"
        onChange={handleChange}
        required
      />
      <input
        name="nome"
        placeholder="Nome do proprietário"
        onChange={handleChange}
        required
      />
      <input
        name="apartamento"
        placeholder="Número do apartamento"
        onChange={handleChange}
        required
      />
      <input
        name="bloco"
        placeholder="Bloco do apartamento (A-Z)"
        onChange={handleChange}
        required
      />
      <input
        name="modelo"
        placeholder="Modelo do veículo"
        onChange={handleChange}
        required
      />
      <input
        name="cor"
        placeholder="Cor do veículo (apenas letras)"
        onChange={handleChange}
        required
      />
      <input
        name="vaga"
        placeholder="Número da vaga (1-50)"
        onChange={handleChange}
        required
      />
      <button type="submit">Salvar</button>
    </form>
  );
}

export default CadastroReserva;
