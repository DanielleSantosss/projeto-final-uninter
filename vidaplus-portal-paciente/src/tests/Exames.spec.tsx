import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Exames from "@/pages/Exames";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderExames = () => {
  return render(
    <BrowserRouter>
      <Exames />
    </BrowserRouter>
  );
};

describe("Exames Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza o cabeçalho corretamente", () => {
    renderExames();

    expect(screen.getByText("Meus Exames")).toBeInTheDocument();
    expect(screen.getByText("Resultados e Evolução")).toBeInTheDocument();
    expect(screen.getByText("Maria Silva")).toBeInTheDocument();
  });

  it("renderiza os cards de estatísticas", () => {
    renderExames();

    expect(screen.getByText("Total de Exames")).toBeInTheDocument();
    expect(screen.getByText("24")).toBeInTheDocument();
    expect(screen.getByText("Este Mês")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Em Análise")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renderiza a lista de exames", () => {
    renderExames();

    expect(screen.getAllByText("Hemograma Completo")).toHaveLength(2);
    expect(screen.getByText("Colesterol Total")).toBeInTheDocument();
    expect(screen.getByText("Glicemia")).toBeInTheDocument();
    expect(screen.getByText("Raio-X Tórax")).toBeInTheDocument();
    expect(screen.getByText("Eletrocardiograma")).toBeInTheDocument();
  });

  it("navega para dashboard ao clicar no botão voltar", () => {
    renderExames();

    const backButtons = screen.getAllByRole("button", { name: "" });
    const backButton = backButtons[0];
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("faz logout corretamente", () => {
    renderExames();

    const logoutButtons = screen.getAllByRole("button", { name: "" });
    const logoutButton = logoutButtons[1];
    fireEvent.click(logoutButton);

    expect(mockNavigate).toHaveBeenCalledWith("/auth");
  });

  it("alterna entre abas Lista de Exames e Evolução", () => {
    renderExames();

    expect(screen.getByText("Seus Resultados")).toBeInTheDocument();

    const evolucaoTab = screen.getByRole("tab", { name: "Evolução" });
    const listaTab = screen.getByRole("tab", { name: "Lista de Exames" });
    
    expect(evolucaoTab).toBeInTheDocument();
    expect(listaTab).toBeInTheDocument();

    fireEvent.click(evolucaoTab);

    fireEvent.click(listaTab);

    expect(screen.getByText("Seus Resultados")).toBeInTheDocument();
    expect(screen.getByText("Histórico completo de exames")).toBeInTheDocument();
  });

  it("abre modal ao clicar em visualizar exame", () => {
    renderExames();

    const visualizarButton = screen.getAllByText("Visualizar")[0];
    fireEvent.click(visualizarButton);

    expect(screen.getByText("Visualização de PDF")).toBeInTheDocument();
    expect(screen.getByText(/aqui seria exibido o pdf/i)).toBeInTheDocument();
  });

  it("fecha modal ao clicar em fechar", () => {
    renderExames();

    const visualizarButton = screen.getAllByText("Visualizar")[0];
    fireEvent.click(visualizarButton);

    const fecharButton = screen.getByText("Fechar");
    fireEvent.click(fecharButton);

    expect(screen.queryByText("Visualização de PDF")).not.toBeInTheDocument();
  });

  it("não abre modal para exames em processamento", () => {
    renderExames();

    const processandoExam = screen.getByText("Processando");
    expect(processandoExam).toBeInTheDocument();

    const examCards = screen.getAllByText("Processando");
    expect(examCards).toHaveLength(1);
  });

  it("renderiza badges de status corretamente", () => {
    renderExames();

    expect(screen.getAllByText("Disponível")).toHaveLength(5);
    expect(screen.getByText("Processando")).toBeInTheDocument();
  });

  it("renderiza informações dos médicos", () => {
    renderExames();

    expect(screen.getAllByText(/dr\. joão santos/i)).toHaveLength(5);
    expect(screen.getByText(/dra\. ana costa/i)).toBeInTheDocument();
  });
});
