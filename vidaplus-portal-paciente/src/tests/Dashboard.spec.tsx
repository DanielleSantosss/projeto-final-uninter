import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
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

const renderDashboard = () => {
  return render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
};

describe("Dashboard Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza nome do paciente", () => {
    renderDashboard();

    expect(screen.getByText("Olá, Paciente! 👋")).toBeInTheDocument();
  });

  it("renderiza próximas consultas", () => {
    renderDashboard();

    expect(screen.getByText("Cardiologia")).toBeInTheDocument();
    expect(screen.getByText("Dermatologia")).toBeInTheDocument();
  });

  it("abre o modal ao clicar em cancelar consulta", () => {
    renderDashboard();

    const btnCancelar = screen.getAllByRole("button", { name: "Cancelar" })[0];
    fireEvent.click(btnCancelar);

    expect(screen.getByText("Cancelar Consulta")).toBeInTheDocument();
    expect(screen.getByText(/tem certeza que deseja cancelar esta consulta/i)).toBeInTheDocument();
  });

  it("cancela consulta ao confirmar", () => {
    renderDashboard();

    const btnCancelar = screen.getAllByRole("button", { name: "Cancelar" })[0];
    fireEvent.click(btnCancelar);

    fireEvent.click(screen.getByRole("button", { name: "Sim, Cancelar" }));

    expect(toast.success).toHaveBeenCalled();
    expect(screen.queryByText("Cardiologia")).not.toBeInTheDocument();
  });

  it("navega para agendar consulta ao clicar no card", () => {
    renderDashboard();

    const card = screen.getByText("Agendar Consulta");
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith("/agendar");
  });

  it("faz logout corretamente", () => {
    renderDashboard();

    const btnLogout = screen.getByRole("button", { name: "" });
    fireEvent.click(btnLogout);

    expect(toast.success).toHaveBeenCalledWith("Logout realizado com sucesso!");
    expect(mockNavigate).toHaveBeenCalledWith("/auth");
  });
});
