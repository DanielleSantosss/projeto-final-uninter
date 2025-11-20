import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { 
  Heart, 
  ArrowLeft, 
  Check,
  Stethoscope,
  Brain,
  Eye,
  Smile,
  Baby
} from "lucide-react";
import { toast } from "sonner";

const Agendar = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");

  const specialties = [
    { id: "cardiologia", name: "Cardiologia", icon: Heart, color: "primary" },
    { id: "neurologia", name: "Neurologia", icon: Brain, color: "secondary" },
    { id: "oftalmologia", name: "Oftalmologia", icon: Eye, color: "accent" },
    { id: "dermatologia", name: "Dermatologia", icon: Smile, color: "primary" },
    { id: "clinica-geral", name: "Clínica Geral", icon: Stethoscope, color: "secondary" },
    { id: "pediatria", name: "Pediatria", icon: Baby, color: "accent" },
  ];

  const doctors = {
    cardiologia: [
      { id: "1", name: "Dr. João Santos", crm: "CRM 12345" },
      { id: "2", name: "Dra. Maria Oliveira", crm: "CRM 67890" },
    ],
    neurologia: [
      { id: "3", name: "Dr. Pedro Costa", crm: "CRM 11111" },
      { id: "4", name: "Dra. Juliana Lima", crm: "CRM 22222" },
    ],
    oftalmologia: [
      { id: "5", name: "Dr. Carlos Mendes", crm: "CRM 33333" },
    ],
    dermatologia: [
      { id: "6", name: "Dra. Ana Costa", crm: "CRM 44444" },
    ],
    "clinica-geral": [
      { id: "7", name: "Dr. Roberto Silva", crm: "CRM 55555" },
      { id: "8", name: "Dra. Fernanda Rocha", crm: "CRM 66666" },
    ],
    pediatria: [
      { id: "9", name: "Dra. Beatriz Alves", crm: "CRM 77777" },
    ],
  };

  const availableTimes = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const handleConfirm = () => {
    toast.success("Consulta agendada com sucesso!");
    navigate("/dashboard");
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Escolha a Especialidade";
      case 2: return "Selecione o Profissional";
      case 3: return "Data e Horário";
      case 4: return "Confirmar Agendamento";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="bg-card border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => step === 1 ? navigate("/dashboard") : setStep(step - 1)}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">Agendar Nova Consulta</h1>
                  <p className="text-xs text-muted-foreground">Passo {step} de 4</p>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${
                    s === step
                      ? "bg-primary text-primary-foreground shadow-md"
                      : s < step
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s < step ? <Check className="w-5 h-5" /> : s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl">{getStepTitle()}</CardTitle>
            <CardDescription>
              {step === 1 && "Selecione a área médica desejada"}
              {step === 2 && "Escolha o médico de sua preferência"}
              {step === 3 && "Selecione uma data e horário disponível"}
              {step === 4 && "Revise os dados antes de confirmar"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {specialties.map((specialty) => {
                  const Icon = specialty.icon;
                  return (
                    <Card
                      key={specialty.id}
                      className={`cursor-pointer transition-smooth hover:shadow-lg border-2 ${
                        selectedSpecialty === specialty.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedSpecialty(specialty.id)}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <div className={`w-16 h-16 bg-${specialty.color}/10 rounded-2xl flex items-center justify-center mb-3`}>
                          <Icon className={`w-8 h-8 text-${specialty.color}`} />
                        </div>
                        <h3 className="font-semibold text-foreground">{specialty.name}</h3>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {step === 2 && (
              <RadioGroup value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <div className="space-y-3">
                  {doctors[selectedSpecialty as keyof typeof doctors]?.map((doctor) => (
                    <Label
                      key={doctor.id}
                      htmlFor={doctor.id}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                        selectedDoctor === doctor.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                          {doctor.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{doctor.name}</p>
                          <p className="text-sm text-muted-foreground">{doctor.crm}</p>
                        </div>
                      </div>
                      <RadioGroupItem value={doctor.id} id={doctor.id} />
                    </Label>
                  ))}
                </div>
              </RadioGroup>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base mb-3 block">Selecione a Data</Label>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-lg border shadow-sm"
                    />
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <Label className="text-base mb-3 block">Horários Disponíveis</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {availableTimes.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className="h-12"
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <Card className="bg-muted/30">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Especialidade:</span>
                      <span className="font-semibold text-foreground">
                        {specialties.find(s => s.id === selectedSpecialty)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Profissional:</span>
                      <span className="font-semibold text-foreground">
                        {doctors[selectedSpecialty as keyof typeof doctors]?.find(d => d.id === selectedDoctor)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Data:</span>
                      <span className="font-semibold text-foreground">
                        {selectedDate?.toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Horário:</span>
                      <span className="font-semibold text-foreground">{selectedTime}</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <p className="text-sm text-foreground">
                    <strong>Importante:</strong> Por favor, chegue com 15 minutos de antecedência. 
                    Traga seus documentos e cartão do convênio (se aplicável).
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  Voltar
                </Button>
              )}
              <Button
                onClick={() => {
                  if (step < 4) {
                    if (
                      (step === 1 && !selectedSpecialty) ||
                      (step === 2 && !selectedDoctor) ||
                      (step === 3 && (!selectedDate || !selectedTime))
                    ) {
                      toast.error("Por favor, complete a seleção antes de continuar");
                      return;
                    }
                    setStep(step + 1);
                  } else {
                    handleConfirm();
                  }
                }}
                className="flex-1"
                variant={step === 4 ? "accent" : "default"}
              >
                {step === 4 ? "Confirmar Agendamento" : "Próximo"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Agendar;
