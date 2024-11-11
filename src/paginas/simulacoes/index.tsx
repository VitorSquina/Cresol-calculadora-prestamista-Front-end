import { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../../componentes/Container";
import axios from "axios";

type SimulacaoHistorico = {
  id: number;
  nome: string;
  valorSegurado: number;
  numeroContratoEmprestimo: string;
  fimContratoEmprestimo: string | [number, number, number];
  valorTotalPremio: number;
  produtoEscolhido: {
    id: number;
    nome: string;
    idadeMinima: number;
    idadeMaxima: number;
    taxaJuros: number;
    valorMinimoPremio: number;
  };
};

const formatarData = (data: string | [number, number, number]): string => {
  if (Array.isArray(data)) {
    const [ano, mes, dia] = data;
    return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR");
  } else {
    return new Date(data).toLocaleDateString("pt-BR");
  }
};

export const Simulacoes = () => {
  const [historico, setHistorico] = useState<SimulacaoHistorico[]>([]);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const response = await axios.get<SimulacaoHistorico[]>(
          "http://localhost:8080/calculadora-prestamista/simulacao/"
        );
        setHistorico(response.data);
      } catch (error) {
        console.error("Erro ao buscar o histórico de simulações:", error);
      }
    };

    fetchHistorico();
  }, []);

  return (
    <Container title="Simulação Seguro Prestamista">
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Pessoa</th>
              <th>Valor Segurado</th>
              <th>Nº Contrato Empréstimo</th>
              <th>Fim Contrato</th>
              <th>Valor Prêmio</th>
              <th>Produto</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((simulacao) => (
              <tr key={simulacao.id}>
                <td>{simulacao.nome}</td>
                <td>
                  {simulacao.valorSegurado.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>{simulacao.numeroContratoEmprestimo || "N/A"}</td>
                <td>{formatarData(simulacao.fimContratoEmprestimo)}</td>{" "}
                {/* Atualizado para fimContratoEmprestimo */}
                <td>
                  {simulacao.valorTotalPremio.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>{simulacao.produtoEscolhido.nome}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

const TableContainer = styled.div`
  margin-top: 24px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  th,
  td {
    padding: 12px 16px;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export default Simulacoes;
