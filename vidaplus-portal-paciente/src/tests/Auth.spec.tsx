import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Auth from "@/pages/Auth";
import { BrowserRouter } from "react-router-dom";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: { success: vi.fn() },
}));

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

const renderAuth = () =>
  render(
    <BrowserRouter>
      <Auth />
    </BrowserRouter>
  );

describe("Auth Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("realiza login corretamente", async () => {
    vi.useFakeTimers();

    renderAuth();

    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "login@test.com" },
    });

    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));


    expect(screen.getByText("Entrando...")).toBeInTheDocument();

   
    vi.runAllTimers();

    expect(toast.success).toHaveBeenCalledWith("Login realizado com sucesso!");

    expect(mockedNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("mostra campos obrigatórios no formulário", () => {
    renderAuth();

    const emailInput = screen.getByLabelText("E-mail");
    const passwordInput = screen.getByLabelText("Senha");

    expect(emailInput).toHaveAttribute("required");
    expect(passwordInput).toHaveAttribute("required");
  });

  it("renderiza a página de login corretamente", () => {
    renderAuth();

    expect(screen.getByText("Bem-vindo(a)!")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar$/i })).toBeInTheDocument();
  });

  it("permite preencher os campos de login", () => {
    renderAuth();

    const emailInput = screen.getByLabelText("E-mail");
    const passwordInput = screen.getByLabelText("Senha");

    fireEvent.change(emailInput, { target: { value: "teste@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    expect(emailInput).toHaveValue("teste@email.com");
    expect(passwordInput).toHaveValue("123456");
  });

  it("exibe as abas de login e cadastro", () => {
    renderAuth();

    expect(screen.getByRole("tab", { name: "Entrar" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Cadastrar" })).toBeInTheDocument();
  });

  it("mostra descrição e título da página", () => {
    renderAuth();

    expect(screen.getByText("Bem-vindo(a)!")).toBeInTheDocument();
    expect(screen.getByText(/Entre com sua conta ou crie uma nova/i)).toBeInTheDocument();
    expect(screen.getByText("VidaPlus")).toBeInTheDocument();
    expect(screen.getByText("Sistema de Gestão Hospitalar")).toBeInTheDocument();
  });

  it("mostra botão de loading quando clicado", () => {
    renderAuth();

    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "test@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "123456" },
    });

    const submitButton = screen.getByRole("button", { name: /entrar$/i });
    fireEvent.click(submitButton);

    expect(screen.getByText("Entrando...")).toBeInTheDocument();
  });

  it("possui botão de esqueci senha", () => {
    renderAuth();

    expect(screen.getByRole("button", { name: /esqueceu sua senha/i })).toBeInTheDocument();
  });

  it("exibe elementos de segurança e benefícios", () => {
    renderAuth();
    
    expect(screen.getByText("Segurança Total")).toBeInTheDocument();
    expect(screen.getByText("Atendimento 24/7")).toBeInTheDocument();
    expect(screen.getByText(/Seus dados protegidos com criptografia/i)).toBeInTheDocument();
    expect(screen.getByText(/Telemedicina disponível a qualquer hora/i)).toBeInTheDocument();
  });
});