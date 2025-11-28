/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  ArrowLeft,
  FileText,
  Download,
  Eye,
  TrendingDown,
  Calendar,
  Filter,
  Activity,
  Droplets,
  Zap,
  User,
  LogOut
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const Exames = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [patientName] = useState("Maria Silva");

  const exames = [
    {
      id: 1,
      type: "Hemograma Completo",
      date: "15 Nov 2025",
      status: "available",
      category: "Sangue",
      doctor: "Dr. João Santos",
      hasFile: true
    },
    {
      id: 2,
      type: "Colesterol Total",
      date: "10 Nov 2025",
      status: "available",
      category: "Sangue",
      doctor: "Dr. João Santos",
      hasFile: true
    },
    {
      id: 3,
      type: "Glicemia",
      date: "10 Nov 2025",
      status: "available",
      category: "Sangue",
      doctor: "Dr. João Santos",
      hasFile: true
    },
    {
      id: 4,
      type: "Raio-X Tórax",
      date: "08 Nov 2025",
      status: "available",
      category: "Imagem",
      doctor: "Dra. Ana Costa",
      hasFile: true
    },
    {
      id: 5,
      type: "Eletrocardiograma",
      date: "05 Nov 2025",
      status: "available",
      category: "Cardíaco",
      doctor: "Dr. João Santos",
      hasFile: true
    },
    {
      id: 6,
      type: "Hemograma Completo",
      date: "Processando",
      status: "processing",
      category: "Sangue",
      doctor: "Dr. João Santos",
      hasFile: false
    },
  ];

  const glicemiaData = [
    { date: "Jan", value: 98, reference: 100 },
    { date: "Fev", value: 102, reference: 100 },
    { date: "Mar", value: 95, reference: 100 },
    { date: "Abr", value: 105, reference: 100 },
    { date: "Mai", value: 92, reference: 100 },
    { date: "Jun", value: 88, reference: 100 },
    { date: "Jul", value: 90, reference: 100 },
    { date: "Ago", value: 93, reference: 100 },
    { date: "Set", value: 91, reference: 100 },
    { date: "Out", value: 89, reference: 100 },
    { date: "Nov", value: 87, reference: 100 },
  ];

  const colesterolData = [
    { date: "Jan", total: 220, hdl: 45, ldl: 145 },
    { date: "Fev", total: 215, hdl: 48, ldl: 140 },
    { date: "Mar", total: 210, hdl: 50, ldl: 135 },
    { date: "Abr", total: 205, hdl: 52, ldl: 130 },
    { date: "Mai", total: 200, hdl: 55, ldl: 125 },
    { date: "Jun", total: 195, hdl: 58, ldl: 120 },
    { date: "Jul", total: 190, hdl: 60, ldl: 115 },
    { date: "Ago", total: 188, hdl: 62, ldl: 112 },
    { date: "Set", total: 185, hdl: 65, ldl: 108 },
    { date: "Out", total: 182, hdl: 67, ldl: 105 },
    { date: "Nov", total: 180, hdl: 70, ldl: 100 },
  ];

  const pressaoData = [
    { date: "Jan", sistolica: 135, diastolica: 88 },
    { date: "Fev", sistolica: 132, diastolica: 86 },
    { date: "Mar", sistolica: 130, diastolica: 85 },
    { date: "Abr", sistolica: 128, diastolica: 84 },
    { date: "Mai", sistolica: 125, diastolica: 82 },
    { date: "Jun", sistolica: 123, diastolica: 80 },
    { date: "Jul", sistolica: 122, diastolica: 79 },
    { date: "Ago", sistolica: 120, diastolica: 78 },
    { date: "Set", sistolica: 118, diastolica: 77 },
    { date: "Out", sistolica: 120, diastolica: 78 },
    { date: "Nov", sistolica: 119, diastolica: 77 },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Sangue":
        return <Droplets className="w-4 h-4" />;
      case "Cardíaco":
        return <Activity className="w-4 h-4" />;
      case "Imagem":
        return <Eye className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleLogout = () => {
    navigate("/auth");
  };

  const handleViewPDF = (exam: any) => {
    setSelectedExam(exam);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">Meus Exames</h1>
                  <p className="text-xs text-muted-foreground">Resultados e Evolução</p>
                </div>
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
        <Tabs defaultValue="lista" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="lista">Lista de Exames</TabsTrigger>
            <TabsTrigger value="evolucao">Evolução</TabsTrigger>
          </TabsList>

          <TabsContent value="lista" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Seus Resultados</h2>
                <p className="text-muted-foreground">Histórico completo de exames</p>
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total de Exames</p>
                      <p className="text-3xl font-bold text-foreground">24</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Este Mês</p>
                      <p className="text-3xl font-bold text-foreground">5</p>
                    </div>
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Em Análise</p>
                      <p className="text-3xl font-bold text-foreground">1</p>
                    </div>
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Resultados Disponíveis</CardTitle>
                <CardDescription>
                  Clique em um exame para visualizar o resultado completo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {exames.map((exam) => (
                  <div
                    key={exam.id}
                    className={`p-4 rounded-lg border-2 transition-smooth ${
                      exam.status === "processing"
                        ? "bg-muted/20 border-border"
                        : "bg-card border-border hover:border-primary cursor-pointer"
                    }`}
                    onClick={() => exam.hasFile && handleViewPDF(exam)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          exam.category === "Sangue" ? "bg-primary/10 text-primary" :
                          exam.category === "Cardíaco" ? "bg-secondary/10 text-secondary" :
                          "bg-accent/10 text-accent"
                        }`}>
                          {getCategoryIcon(exam.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{exam.type}</h3>
                            {exam.status === "processing" ? (
                              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                                Processando
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                                Disponível
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {exam.date} • {exam.doctor}
                          </p>
                        </div>
                      </div>
                      
                      {exam.hasFile && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewPDF(exam);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Visualizar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Baixar
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evolucao" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Evolução dos Exames</h2>
              <p className="text-muted-foreground">Acompanhe a evolução dos seus resultados ao longo do tempo</p>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-primary" />
                      Glicemia em Jejum
                    </CardTitle>
                    <CardDescription>Valores em mg/dL • Referência: até 100 mg/dL</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-secondary" />
                    <span className="text-sm font-semibold text-secondary">-11 mg/dL</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={glicemiaData}>
                    <defs>
                      <linearGradient id="colorGlicemia" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" domain={[70, 120]} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="reference" 
                      stroke="hsl(var(--destructive))" 
                      strokeDasharray="5 5"
                      strokeWidth={2}
                      dot={false}
                      name="Referência"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorGlicemia)"
                      name="Glicemia"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-secondary/10 rounded-lg">
                  <p className="text-sm text-foreground">
                    <strong>Análise:</strong> Excelente evolução! Seus níveis de glicemia reduziram 11.2% nos últimos meses 
                    e estão dentro dos valores normais. Continue com os hábitos saudáveis.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-secondary" />
                      Perfil Lipídico (Colesterol)
                    </CardTitle>
                    <CardDescription>Valores em mg/dL • Total ideal: até 200 mg/dL</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-secondary" />
                    <span className="text-sm font-semibold text-secondary">-40 mg/dL</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={colesterolData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 250]} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      name="Total"
                      dot={{ r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ldl" 
                      stroke="hsl(var(--destructive))" 
                      strokeWidth={2}
                      name="LDL (Ruim)"
                      dot={{ r: 3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hdl" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={2}
                      name="HDL (Bom)"
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-foreground">
                    <strong>Análise:</strong> Ótima melhora no perfil lipídico! O colesterol total reduziu 18% e o HDL (bom colesterol) 
                    aumentou significativamente. O LDL está próximo do ideal.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-accent" />
                      Pressão Arterial
                    </CardTitle>
                    <CardDescription>Valores em mmHg • Ideal: 120/80 mmHg</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-secondary" />
                    <span className="text-sm font-semibold text-secondary">Normalizada</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={pressaoData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" domain={[60, 150]} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="sistolica" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={3}
                      name="Sistólica"
                      dot={{ r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="diastolica" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      name="Diastólica"
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm text-foreground">
                    <strong>Análise:</strong> Pressão arterial bem controlada! Seus valores estão dentro da faixa normal. 
                    Continue monitorando regularmente e mantendo estilo de vida saudável.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {selectedExam && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedExam.type}</CardTitle>
                  <CardDescription>{selectedExam.date} • {selectedExam.doctor}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Baixar PDF
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedExam(null)}>
                    Fechar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[70vh] bg-muted/30 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <FileText className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Visualização de PDF
                    </h3>
                    <p className="text-muted-foreground max-w-md">
                      Aqui seria exibido o PDF do resultado do exame. Em produção, integraria com um visualizador 
                      de PDF ou exibiria o documento diretamente.
                    </p>
                  </div>
                  <div className="pt-4 space-y-2 text-left bg-card p-6 rounded-lg max-w-md mx-auto">
                    <p className="text-sm"><strong>Exame:</strong> {selectedExam.type}</p>
                    <p className="text-sm"><strong>Data:</strong> {selectedExam.date}</p>
                    <p className="text-sm"><strong>Médico:</strong> {selectedExam.doctor}</p>
                    <p className="text-sm"><strong>Status:</strong> Resultado Normal</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Exames;
