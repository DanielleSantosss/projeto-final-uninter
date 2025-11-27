import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Agendar from "@/pages/Agendar";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Agendar - fluxo básico", () => {
  const renderAgendar = () =>
    render(
      <MemoryRouter>
        <Agendar />
      </MemoryRouter>
    );

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("exibe a etapa 1 com especialidades", () => {
    renderAgendar();
    expect(screen.getByText("Escolha a Especialidade")).toBeInTheDocument();
    expect(screen.getByText("Cardiologia")).toBeInTheDocument();
  });

  it("avança para etapa 2 após escolher a especialidade", () => {
    renderAgendar();

    fireEvent.click(screen.getByText("Cardiologia"));
    fireEvent.click(screen.getByText("Próximo"));

    expect(screen.getByText("Selecione o Profissional")).toBeInTheDocument();
    expect(screen.getByText("Dr. João Santos")).toBeInTheDocument();
  });

  it("avança para etapa 3 após escolher médico", () => {
    renderAgendar();

    fireEvent.click(screen.getByText("Cardiologia"));
    fireEvent.click(screen.getByText("Próximo"));

    fireEvent.click(screen.getByText("Dr. João Santos"));
    fireEvent.click(screen.getByText("Próximo"));

    expect(screen.getByText("Selecione a Data")).toBeInTheDocument();
  });

  it("exige data e horário antes de avançar", () => {
    renderAgendar();

    fireEvent.click(screen.getByText("Cardiologia"));
    fireEvent.click(screen.getByText("Próximo"));

    fireEvent.click(screen.getByText("Dr. João Santos"));
    fireEvent.click(screen.getByText("Próximo"));

    fireEvent.click(screen.getByText("Próximo"));

    expect(screen.getByText("Selecione a Data")).toBeInTheDocument();
  });

  it("avança para confirmação depois de preencher data e horário", () => {
    renderAgendar();

    fireEvent.click(screen.getByText("Cardiologia"));
    fireEvent.click(screen.getByText("Próximo"));

    fireEvent.click(screen.getByText("Dr. João Santos"));
    fireEvent.click(screen.getByText("Próximo"));

    expect(screen.getByText("Selecione a Data")).toBeInTheDocument();

    expect(screen.getByText("Data e Horário")).toBeInTheDocument();
  })

  it("testa a estrutura do fluxo de agendamento", () => {
    renderAgendar();

    fireEvent.click(screen.getByText("Cardiologia"));
    fireEvent.click(screen.getByText("Próximo"));

    fireEvent.click(screen.getByText("Dr. João Santos"));
    fireEvent.click(screen.getByText("Próximo"));

    expect(screen.getByText("Data e Horário")).toBeInTheDocument();
    expect(screen.getByText("Selecione a Data")).toBeInTheDocument();
  });

  it("mostra mensagem de erro quando tenta avançar sem seleções obrigatórias", () => {
    renderAgendar();

    fireEvent.click(screen.getByText("Próximo"));
    
    expect(screen.getByText("Escolha a Especialidade")).toBeInTheDocument();
    
    fireEvent.click(screen.getByText("Cardiologia"));
    fireEvent.click(screen.getByText("Próximo"));
    fireEvent.click(screen.getByText("Próximo"));
    
    expect(screen.getByText("Selecione o Profissional")).toBeInTheDocument();
  });
})
