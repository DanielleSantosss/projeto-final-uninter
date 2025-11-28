import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HistoricoClinico from "@/pages/HistoricoClinico";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: { success: vi.fn() },
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderHistoricoClinico = () => {
  return render(
    <BrowserRouter>
      <HistoricoClinico />
    </BrowserRouter>
  );
};

describe("HistoricoClinico Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza o cabeçalho corretamente", () => {
    renderHistoricoClinico();

    expect(screen.getByText("VidaPlus")).toBeInTheDocument();
    expect(screen.getByText("Histórico Clínico")).toBeInTheDocument();
    expect(screen.getByText("Paciente Silva")).toBeInTheDocument();
  });

  it("renderiza o título principal e descrição", () => {
    renderHistoricoClinico();

    expect(screen.getByText("Histórico Clínico 📋")).toBeInTheDocument();
    expect(screen.getByText("Visualize todo seu histórico médico em um só lugar.")).toBeInTheDocument();
  });

  it("renderiza filtros de pesquisa", () => {
    renderHistoricoClinico();

    expect(screen.getByText("Filtros de Pesquisa")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Buscar por título, médico ou especialidade...")).toBeInTheDocument();
  });

  it("renderiza a lista de registros médicos", () => {
    renderHistoricoClinico();

    expect(screen.getByText("Registros Médicos")).toBeInTheDocument();
    expect(screen.getByText("Consulta Cardiológica")).toBeInTheDocument();
    expect(screen.getByText("Exame de Sangue Completo")).toBeInTheDocument();
    expect(screen.getByText("Receita Médica - Antibiótico")).toBeInTheDocument();
    expect(screen.getByText("Raio-X de Tórax")).toBeInTheDocument();
    expect(screen.getByText("Vacina contra Influenza")).toBeInTheDocument();
    expect(screen.getByText("Consulta Dermatológica")).toBeInTheDocument();
  });

  it("filtra registros por busca textual", async () => {
    renderHistoricoClinico();

    const searchInput = screen.getByPlaceholderText("Buscar por título, médico ou especialidade...");
    fireEvent.change(searchInput, { target: { value: "cardiológica" } });

    await waitFor(() => {
      expect(screen.getByText("Consulta Cardiológica")).toBeInTheDocument();
      expect(screen.queryByText("Exame de Sangue Completo")).not.toBeInTheDocument();
    });
  });

  it("verifica se os filtros de tipo estão disponíveis", () => {
    renderHistoricoClinico();

    expect(screen.getByText("Consulta Cardiológica")).toBeInTheDocument();
    expect(screen.getByText("Exame de Sangue Completo")).toBeInTheDocument();
    expect(screen.getByText("Receita Médica - Antibiótico")).toBeInTheDocument();
    expect(screen.getByText("Vacina contra Influenza")).toBeInTheDocument();
  });

  it("mostra mensagem quando nenhum registro é encontrado", async () => {
    renderHistoricoClinico();

    const searchInput = screen.getByPlaceholderText("Buscar por título, médico ou especialidade...");
    fireEvent.change(searchInput, { target: { value: "registro inexistente" } });

    await waitFor(() => {
      expect(screen.getByText("Nenhum registro encontrado com os filtros aplicados.")).toBeInTheDocument();
    });
  });

  it("navega de volta para dashboard ao clicar no botão voltar", () => {
    renderHistoricoClinico();

    const backButtons = screen.getAllByRole("button", { name: "" });
    const backButton = backButtons[0];
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("faz logout corretamente", () => {
    renderHistoricoClinico();

    const logoutButtons = screen.getAllByRole("button", { name: "" });
    const logoutButton = logoutButtons[1]; 
    fireEvent.click(logoutButton);

    expect(toast.success).toHaveBeenCalledWith("Logout realizado com sucesso!");
    expect(mockNavigate).toHaveBeenCalledWith("/auth");
  });

  it("abre modal de detalhes ao clicar em um registro", async () => {
    renderHistoricoClinico();

    const detailsButton = screen.getAllByText("Detalhes")[0];
    fireEvent.click(detailsButton);

    await waitFor(() => {
      expect(screen.getByText("Detalhes completos do registro médico")).toBeInTheDocument();
    });
  });

  it("renderiza badges de status corretamente", () => {
    renderHistoricoClinico();

    expect(screen.getAllByText("Concluído")).toHaveLength(5);
    expect(screen.getByText("Pendente")).toBeInTheDocument();
  });

  it("renderiza badges de tipo corretamente", () => {
    renderHistoricoClinico();

    expect(screen.getAllByText("Consulta")).toHaveLength(2);
    expect(screen.getAllByText("Exame")).toHaveLength(2);
    expect(screen.getByText("Prescrição")).toBeInTheDocument();
    expect(screen.getByText("Vacina")).toBeInTheDocument();
  });

  it("mostra contagem de registros", () => {
    renderHistoricoClinico();

    expect(screen.getByText("6 registro(s)")).toBeInTheDocument();
  });

  it("atualiza contagem após filtrar", async () => {
    renderHistoricoClinico();

    const searchInput = screen.getByPlaceholderText("Buscar por título, médico ou especialidade...");
    fireEvent.change(searchInput, { target: { value: "Dr. João Santos" } });

    await waitFor(() => {
      expect(screen.getByText("1 registro(s)")).toBeInTheDocument();
    });
  });

  it("executa download de anexos", () => {
    renderHistoricoClinico();

    const downloadButtons = screen.getAllByText("Baixar");
    fireEvent.click(downloadButtons[0]);

    expect(toast.success).toHaveBeenCalledWith("Downloads iniciados!");
  });

  it("renderiza informações dos médicos nos registros", () => {
    renderHistoricoClinico();

    expect(screen.getByText("Dr. João Santos - Cardiologia")).toBeInTheDocument();
    expect(screen.getByText("Dra. Maria Oliveira - Análises Clínicas")).toBeInTheDocument();
    expect(screen.getByText("Dr. Carlos Pereira - Clínica Geral")).toBeInTheDocument();
    expect(screen.getByText("Dr. Ana Santos - Radiologia")).toBeInTheDocument();
    expect(screen.getByText("Enf. Paula Lima - Imunização")).toBeInTheDocument();
  });

  it("renderiza datas e horários dos registros", () => {
    renderHistoricoClinico();

    expect(screen.getByText("10 Nov 2025 às 14:30")).toBeInTheDocument();
    expect(screen.getByText("05 Nov 2025 às 08:00")).toBeInTheDocument();
    expect(screen.getByText("01 Nov 2025 às 16:45")).toBeInTheDocument();
  });

  it("mostra informações de anexos quando disponíveis", () => {
    renderHistoricoClinico();

    expect(screen.getByText("2 anexo(s)")).toBeInTheDocument();
    expect(screen.getAllByText("1 anexo(s)")).toHaveLength(3);
  });
});
