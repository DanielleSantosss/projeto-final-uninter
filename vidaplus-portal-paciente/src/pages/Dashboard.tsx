import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Video, 
  FileText, 
  Clock, 
  User, 
  Heart,
  LogOut,
  Plus,
  Activity,
  Pill,
  FileHeart
} from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [patientName] = useState("Paciente Silva");

  const upcomingAppointments = [
    {
      id: 1,
      specialty: "Cardiologia",
      doctor: "Dr. João Santos",
      date: "25 Nov 2025",
      time: "14:30",
      type: "Presencial",
      status: "confirmed"
    },
    {
      id: 2,
      specialty: "Dermatologia",
      doctor: "Dra. Ana Costa",
      date: "28 Nov 2025",
      time: "10:00",
      type: "Telemedicina",
      status: "confirmed"
    },
  ];

  const medicalHistory = [
    { id: 1, type: "Consulta", title: "Consulta Cardiológica", date: "10 Nov 2025" },
    { id: 2, type: "Exame", title: "Exame de Sangue Completo", date: "05 Nov 2025" },
    { id: 3, type: "Prescrição", title: "Receita Médica - Antibiótico", date: "01 Nov 2025" },
  ];

  const handleLogout = () => {
    toast.success("Logout realizado com sucesso!");
    navigate("/auth");
  };

  const getHistoryIcon = (type: string) => {
    switch (type) {
      case "Consulta":
        return <Activity className="w-4 h-4" />;
      case "Exame":
        return <FileText className="w-4 h-4" />;
      case "Prescrição":
        return <Pill className="w-4 h-4" />;
      default:
        return <FileHeart className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">VidaPlus</h1>
                <p className="text-xs text-muted-foreground">Portal do Paciente</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{patientName}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Olá, {patientName.split(" ")[0]}! 👋
            </h2>
            <p className="text-muted-foreground">
              Aqui você acompanha seus agendamentos e mantém sua saúde em dia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-smooth border-2 hover:border-primary"
              onClick={() => navigate("/agendar")}
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Agendar Consulta</h3>
                  <p className="text-sm text-muted-foreground">Nova consulta</p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-smooth border-2 hover:border-secondary"
              onClick={() => navigate("/telemedicina")}
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Telemedicina</h3>
                  <p className="text-sm text-muted-foreground">Consulta online</p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-smooth border-2 hover:border-accent"
              onClick={() => navigate("/exames")}
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Meus Exames</h3>
                  <p className="text-sm text-muted-foreground">Resultados</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Próximas Consultas
              </CardTitle>
              <CardDescription>
                Seus agendamentos confirmados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:border-primary transition-smooth"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {appointment.specialty}
                      </Badge>
                      {appointment.type === "Telemedicina" && (
                        <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                          <Video className="w-3 h-3 mr-1" />
                          Online
                        </Badge>
                      )}
                    </div>
                    <p className="font-semibold text-foreground">{appointment.doctor}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {appointment.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {appointment.time}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex gap-2">
                    {appointment.type === "Telemedicina" && (
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => navigate("/telemedicina")}
                      >
                        <Video className="w-4 h-4 mr-1" />
                        Iniciar
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Detalhes
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" />
                Histórico Clínico
              </CardTitle>
              <CardDescription>
                Últimos registros médicos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {medicalHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:border-secondary transition-smooth cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                      {getHistoryIcon(item.type)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Ver
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
