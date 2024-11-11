import { useState } from "react";
import styled from "styled-components";
import { Container } from "../../componentes/Container";
import { Input } from "../../componentes/Input";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { Button } from "@mui/material";

// Tipo do resultado esperado da API
type ResultadoSimulacao = {
  valorTotalPremio: number;
  produtoEscolhido: {
    id: number;
    nome: string;
  };
};

// Tipo para a resposta de erro da API
type ApiErrorResponse = {
  error?: string;
  message?: string;
};

export const NovaSimulacao = () => {
  const [nomePessoa, setNomePessoa] = useState("");
  const [cpf, setCpf] = useState("");
  const [valorSegurado, setValorSegurado] = useState("");
  const [numeroContrato, setNumeroContrato] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [dataFimContrato, setDataFimContrato] = useState("");
  const [resultado, setResultado] = useState<ResultadoSimulacao | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!dataNascimento || !dataFimContrato) {
        throw new Error("Ambos os campos de data são obrigatórios.");
      }

      const response = await axios.post(
        "http://localhost:8080/calculadora-prestamista/simulacao/executar",
        {
          nomePessoa,
          cpf: cpf.replace(/\D/g, ""),
          valorSegurado: parseFloat(valorSegurado),
          numeroContratoDeEmprestimo: numeroContrato,
          dataNascimento,
          dataFimContrato,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data as ResultadoSimulacao;
      return data;
    },
    onSuccess: (data) => {
      setResultado(data);
      setError(null);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const responseData = error.response?.data as ApiErrorResponse; // Faz o type assertion
        const errorMessage =
          responseData?.error ||
          responseData?.message ||
          error.message ||
          "Erro ao realizar a simulação";
        console.error("Erro ao realizar a simulação:", errorMessage);
        setError(errorMessage);
      } else {
        console.error("Erro desconhecido:", error);
        setError("Erro desconhecido ao realizar a simulação");
      }
    },
  });

  const mascaraCPF = (value: string): string => {
    return value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(mascaraCPF(e.target.value));
  };

  return (
    <Container title="Simulação Seguro Prestamista">
      <FormWrapper>
        <InputRow>
          <Input
            label="Nome da Pessoa"
            value={nomePessoa}
            onChange={(e) =>
              setNomePessoa((e.target as HTMLInputElement).value)
            }
          />
        </InputRow>
        <InputRow>
          <Input
            label="CPF"
            placeholder="___.___.___-__"
            value={cpf}
            onChange={handleCpfChange}
          />
          <Input
            label="Valor Segurado"
            value={valorSegurado}
            onChange={(e) =>
              setValorSegurado((e.target as HTMLInputElement).value)
            }
          />
        </InputRow>
        <InputRow>
          <Input
            label="Número Contrato Empréstimo"
            value={numeroContrato}
            onChange={(e) =>
              setNumeroContrato((e.target as HTMLInputElement).value)
            }
          />
        </InputRow>
        <InputRow>
          <Input
            label="Fim Contrato Empréstimo"
            type="date"
            value={dataFimContrato}
            onChange={(e) =>
              setDataFimContrato((e.target as HTMLInputElement).value)
            }
          />
          <Input
            label="Data Nascimento"
            type="date"
            value={dataNascimento}
            onChange={(e) =>
              setDataNascimento((e.target as HTMLInputElement).value)
            }
          />
        </InputRow>
        <ButtonWrapper>
          <Button variant="contained" color="success" onClick={() => mutate()}>
            Simular
          </Button>
        </ButtonWrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormWrapper>

      {resultado && !error && (
        <ResultContainer>
          <ResultText>Valor Total Prêmio</ResultText>
          <ResultValue>
            {resultado.valorTotalPremio.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </ResultValue>
          <ResultText>Produto Escolhido</ResultText>
          <ResultProduct>{resultado.produtoEscolhido.nome}</ResultProduct>
        </ResultContainer>
      )}
    </Container>
  );
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  & > div {
    flex: 1;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 16px;
`;

const ResultContainer = styled.div`
  background-color: #e0f7e9;
  padding: 16px;
  margin-top: 24px;
  text-align: center;
  border-radius: 8px;
  color: #2e7d32;
  max-width: 400px;
  margin: 0 auto;
`;

const ResultText = styled.div`
  font-size: 20px;
  margin-bottom: 8px;
`;

const ResultValue = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const ResultProduct = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
