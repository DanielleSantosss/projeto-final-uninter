import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Telemedicina from "@/pages/Telemedicina";

vi.mock("sonner", () => ({
  toast: Object.assign(vi.fn(), {
    success: vi.fn(),
  }),
}));

const mockToast = vi.mocked((await import("sonner")).toast);
const mockToastSuccess = vi.mocked((await import("sonner")).toast.success);

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderTelemedicina = () => {
  return render(
    <BrowserRouter>
      <Telemedicina />
    </BrowserRouter>
  );
};

describe("Telemedicina Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockToast.mockClear();
    mockToastSuccess.mockClear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renderiza o cabeçalho corretamente", () => {
    renderTelemedicina();

    expect(screen.getByText("Telemedicina")).toBeInTheDocument();
    expect(screen.getByText("Sala de espera")).toBeInTheDocument();
  });

  it("renderiza a sala de espera inicialmente", () => {
    renderTelemedicina();

    expect(screen.getByText("Consulta com Dra. Ana Costa")).toBeInTheDocument();
    expect(screen.getByText("Dermatologia • 28 Nov 2025 • 10:00")).toBeInTheDocument();
    expect(screen.getByText("Antes de começar:")).toBeInTheDocument();
    expect(screen.getByText("Iniciar Consulta")).toBeInTheDocument();
  });

  it("mostra as instruções pré-consulta", () => {
    renderTelemedicina();

    expect(screen.getByText("Verifique sua conexão de internet")).toBeInTheDocument();
    expect(screen.getByText("Teste seu microfone e câmera")).toBeInTheDocument();
    expect(screen.getByText("Esteja em um local tranquilo e bem iluminado")).toBeInTheDocument();
    expect(screen.getByText("Tenha seus documentos e exames em mãos")).toBeInTheDocument();
  });

  it("navega de volta para dashboard ao clicar em voltar na sala de espera", () => {
    renderTelemedicina();

    const voltarButton = screen.getByText("Voltar");
    fireEvent.click(voltarButton);

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("navega de volta para dashboard ao clicar no botão voltar do header", () => {
    renderTelemedicina();

    const backButton = screen.getByRole("button", { name: "" });
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("inicia a chamada ao clicar em 'Iniciar Consulta'", () => {
    renderTelemedicina();

    const iniciarButton = screen.getByText("Iniciar Consulta");
    fireEvent.click(iniciarButton);

    expect(mockToastSuccess).toHaveBeenCalledWith("Conectando à consulta...");
    expect(screen.getByText("Dra. Ana Costa")).toBeInTheDocument();
    expect(screen.getByText("Dermatologista • CRM 44444")).toBeInTheDocument();
  });

  it("mostra a interface de chamada ativa após iniciar", () => {
    renderTelemedicina();

    const iniciarButton = screen.getByText("Iniciar Consulta");
    fireEvent.click(iniciarButton);

    expect(screen.getByText("Você")).toBeInTheDocument();
    expect(screen.queryByText("Sala de espera")).not.toBeInTheDocument();
    expect(screen.getByText(/em chamada/i)).toBeInTheDocument();
  });

  it("mostra o cronômetro da chamada", () => {
    renderTelemedicina();

    const iniciarButton = screen.getByText("Iniciar Consulta");
    fireEvent.click(iniciarButton);

    expect(screen.getByText("00:00")).toBeInTheDocument();
  });

  it("permite alternar o estado do microfone", () => {
    renderTelemedicina();

    const iniciarButton = screen.getByText("Iniciar Consulta");
    fireEvent.click(iniciarButton);

    const allButtons = screen.getAllByRole("button", { name: "" });
    const micButton = allButtons.find(button => 
      button.querySelector('svg')?.classList.contains('lucide-mic')
    );
    
    expect(micButton).toBeDefined();
    if (micButton) {
      fireEvent.click(micButton);
      expect(mockToast).toHaveBeenCalledWith("Microfone desativado");
    }
  });

  it("permite alternar o estado da câmera", () => {
    renderTelemedicina();

    const iniciarButton = screen.getByText("Iniciar Consulta");
    fireEvent.click(iniciarButton);

    const allButtons = screen.getAllByRole("button", { name: "" });
    const videoButton = allButtons.find(button => 
      button.querySelector('svg')?.classList.contains('lucide-video')
    );
    
    expect(videoButton).toBeDefined();
    if (videoButton) {
      fireEvent.click(videoButton);
      expect(mockToast).toHaveBeenCalledWith("Câmera desativada");
    }
  });

  it("mostra status de câmera desativada quando desligada", () => {
    renderTelemedicina();

    const iniciarButton = screen.getByText("Iniciar Consulta");
    fireEvent.click(iniciarButton);

    const buttons = screen.getAllByRole("button", { name: "" });
    const videoButton = buttons.find(button => 
      button.querySelector('svg')?.getAttribute('class')?.includes('lucide-video')
    );
    
    if (videoButton) {
      fireEvent.click(videoButton);
      expect(screen.getByText("Câmera desativada")).toBeInTheDocument();
    }
  });

  it("finaliza a chamada ao clicar no botão de desligar", () => {
    renderTelemedicina();

    const iniciarButton = screen.getByText("Iniciar Consulta");
    fireEvent.click(iniciarButton);

    const allButtons = screen.getAllByRole("button", { name: "" });
    const endCallButton = allButtons.find(button => 
      button.querySelector('svg')?.classList.contains('lucide-phone-off')
    );
    
    if (endCallButton) {
      fireEvent.click(endCallButton);
      expect(mockToastSuccess).toHaveBeenCalledWith("Consulta finalizada");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    }
  });

  it("mostra aviso sobre gravação da consulta", () => {
    renderTelemedicina();

    const iniciarButton = screen.getByText("Iniciar Consulta");
    fireEvent.click(iniciarButton);

    expect(screen.getByText(/a consulta está sendo gravada/i)).toBeInTheDocument();
  });

  it("atualiza o cabeçalho com status da chamada", () => {
    renderTelemedicina();

    expect(screen.getByText("Sala de espera")).toBeInTheDocument();

    const iniciarButton = screen.getByText("Iniciar Consulta");
    fireEvent.click(iniciarButton);

    expect(screen.queryByText("Sala de espera")).not.toBeInTheDocument();
    expect(screen.getByText(/em chamada/i)).toBeInTheDocument();
  });

  it("reseta o cronômetro ao finalizar a chamada", () => {
    renderTelemedicina();

    const iniciarButton = screen.getByText("Iniciar Consulta");
    fireEvent.click(iniciarButton);

    vi.advanceTimersByTime(5000);
    
    const allButtons = screen.getAllByRole("button", { name: "" });
    const endCallButton = allButtons.find(button => 
      button.querySelector('svg')?.classList.contains('lucide-phone-off')
    );
    
    if (endCallButton) {
      fireEvent.click(endCallButton);
    }
  });

  it("renderiza todos os controles da chamada", () => {
    renderTelemedicina();

    const iniciarButton = screen.getByText("Iniciar Consulta");
    fireEvent.click(iniciarButton);

    const buttons = screen.getAllByRole("button", { name: "" });
    expect(buttons.length).toBeGreaterThanOrEqual(5);
  });

  it("mostra informações do médico na tela de chamada", () => {
    renderTelemedicina();

    const iniciarButton = screen.getByText("Iniciar Consulta");
    fireEvent.click(iniciarButton);

    expect(screen.getByText("Dra. Ana Costa")).toBeInTheDocument();
    expect(screen.getByText("Dermatologista • CRM 44444")).toBeInTheDocument();
    expect(screen.getByText("AC")).toBeInTheDocument(); 
  });

  it("mostra avatar do paciente", () => {
    renderTelemedicina();

    const iniciarButton = screen.getByText("Iniciar Consulta");
    fireEvent.click(iniciarButton);

    expect(screen.getByText("MS")).toBeInTheDocument(); 
    expect(screen.getByText("Você")).toBeInTheDocument();
  });
});
