import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Calendar, 
  FileText, 
  User, 
  Heart,
  LogOut,
  Activity,
  Pill,
  FileHeart,
  Search,
  Filter,
  Download,
  Eye,
  ArrowLeft,
  Stethoscope,
  TestTube,
  ClipboardList,
  MapPin,
  Clock
} from "lucide-react";
import { toast } from "sonner";

interface MedicalRecord {
  id: number;
  type: "Consulta" | "Exame" | "Prescrição" | "Vacina" | "Cirurgia";
  title: string;
  date: string;
  time?: string;
  doctor: string;
  specialty: string;
  description: string;
  details?: string;
  location?: string;
  status: "Concluído" | "Pendente" | "Cancelado";
  attachments?: string[];
}

const HistoricoClinico = () => {
  const navigate = useNavigate();
  const [patientName] = useState("Paciente Silva");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("todos");
  const [filterPeriod, setFilterPeriod] = useState<string>("todos");
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  const medicalRecords: MedicalRecord[] = [
    {
      id: 1,
      type: "Consulta",
      title: "Consulta Cardiológica",
      date: "10 Nov 2025",
      time: "14:30",
      doctor: "Dr. João Santos",
      specialty: "Cardiologia",
      description: "Consulta de rotina para acompanhamento cardiovascular",
      details: "Pressão arterial: 120/80 mmHg\nFrequência cardíaca: 72 bpm\nECG: Normal\nRecomendações: Manter atividade física regular e dieta balanceada.",
      location: "Clínica VidaPlus - Sala 205",
      status: "Concluído",
      attachments: ["ECG_10Nov2025.pdf", "Receita_Cardiologia.pdf"]
    },
    {
      id: 2,
      type: "Exame",
      title: "Exame de Sangue Completo",
      date: "05 Nov 2025",
      time: "08:00",
      doctor: "Dra. Maria Oliveira",
      specialty: "Análises Clínicas",
      description: "Hemograma completo e perfil lipídico",
      details: "Hemoglobina: 14.2 g/dl (Normal)\nGlicose: 85 mg/dl (Normal)\nColesterol Total: 180 mg/dl (Normal)\nHDL: 55 mg/dl (Bom)\nLDL: 110 mg/dl (Normal)",
      location: "Laboratório VidaPlus",
      status: "Concluído",
      attachments: ["Hemograma_05Nov2025.pdf"]
    },
    {
      id: 3,
      type: "Prescrição",
      title: "Receita Médica - Antibiótico",
      date: "01 Nov 2025",
      time: "16:45",
      doctor: "Dr. Carlos Pereira",
      specialty: "Clínica Geral",
      description: "Prescrição de antibiótico para tratamento de infecção respiratória",
      details: "Amoxicilina 500mg - 1 comprimido de 8/8h por 7 dias\nParacetamol 750mg - 1 comprimido de 6/6h se dor ou febre\nObservações: Tomar com alimentos para evitar desconforto gástrico",
      status: "Concluído",
      attachments: ["Receita_01Nov2025.pdf"]
    },
    {
      id: 4,
      type: "Exame",
      title: "Raio-X de Tórax",
      date: "28 Out 2025",
      time: "10:15",
      doctor: "Dr. Ana Santos",
      specialty: "Radiologia",
      description: "Exame radiológico para investigação de sintomas respiratórios",
      details: "Resultado: Pulmões limpos, sem sinais de consolidação ou derrame pleural. Coração de tamanho normal. Estruturas ósseas preservadas.",
      location: "Centro de Imagem VidaPlus",
      status: "Concluído",
      attachments: ["RaioX_Torax_28Out2025.pdf"]
    },
    {
      id: 5,
      type: "Vacina",
      title: "Vacina contra Influenza",
      date: "15 Out 2025",
      time: "09:30",
      doctor: "Enf. Paula Lima",
      specialty: "Imunização",
      description: "Vacinação anual contra gripe",
      details: "Vacina Influenza Trivalente 2025\nLote: INF2025-A47\nLocal de aplicação: Braço esquerdo\nPróxima dose: Outubro 2026",
      location: "Sala de Vacinação - VidaPlus",
      status: "Concluído"
    },
    {
      id: 6,
      type: "Consulta",
      title: "Consulta Dermatológica",
      date: "30 Nov 2025",
      time: "15:00",
      doctor: "Dra. Ana Costa",
      specialty: "Dermatologia",
      description: "Avaliação de lesão cutânea",
      details: "Exame agendado para avaliação de mancha na pele. Paciente orientado sobre cuidados com exposição solar.",
      location: "Clínica VidaPlus - Sala 301",
      status: "Pendente"
    }
  ];

  const getRecordIcon = (type: string) => {
    switch (type) {
      case "Consulta":
        return <Stethoscope className="w-5 h-5" />;
      case "Exame":
        return <TestTube className="w-5 h-5" />;
      case "Prescrição":
        return <Pill className="w-5 h-5" />;
      case "Vacina":
        return <Activity className="w-5 h-5" />;
      case "Cirurgia":
        return <ClipboardList className="w-5 h-5" />;
      default:
        return <FileHeart className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Cancelado":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Consulta":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Exame":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Prescrição":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Vacina":
        return "bg-green-100 text-green-800 border-green-200";
      case "Cirurgia":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "todos" || record.type === filterType;
    
    let matchesPeriod = true;
    if (filterPeriod !== "todos") {
      const recordDate = new Date(record.date);
      const now = new Date();
      
      switch (filterPeriod) {
        case "30dias":
          matchesPeriod = (now.getTime() - recordDate.getTime()) <= (30 * 24 * 60 * 60 * 1000);
          break;
        case "6meses":
          matchesPeriod = (now.getTime() - recordDate.getTime()) <= (6 * 30 * 24 * 60 * 60 * 1000);
          break;
        case "1ano":
          matchesPeriod = (now.getTime() - recordDate.getTime()) <= (365 * 24 * 60 * 60 * 1000);
          break;
      }
    }
    
    return matchesSearch && matchesType && matchesPeriod;
  });

  const handleDownloadAttachment = (filename: string) => {
    toast.success(`Download iniciado: ${filename}`);
  };

  const handleLogout = () => {
    toast.success("Logout realizado com sucesso!");
    navigate("/auth");
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
                onClick={() => navigate("/dashboard")}
                className="mr-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">VidaPlus</h1>
                <p className="text-xs text-muted-foreground">Histórico Clínico</p>
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
              Histórico Clínico 📋
            </h2>
            <p className="text-muted-foreground">
              Visualize todo seu histórico médico em um só lugar.
            </p>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                Filtros de Pesquisa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar por título, médico ou especialidade..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de registro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os tipos</SelectItem>
                    <SelectItem value="Consulta">Consultas</SelectItem>
                    <SelectItem value="Exame">Exames</SelectItem>
                    <SelectItem value="Prescrição">Prescrições</SelectItem>
                    <SelectItem value="Vacina">Vacinas</SelectItem>
                    <SelectItem value="Cirurgia">Cirurgias</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todo o período</SelectItem>
                    <SelectItem value="30dias">Últimos 30 dias</SelectItem>
                    <SelectItem value="6meses">Últimos 6 meses</SelectItem>
                    <SelectItem value="1ano">Último ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-secondary" />
                  Registros Médicos
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {filteredRecords.length} registro(s)
                </Badge>
              </CardTitle>
              <CardDescription>
                Histórico completo de consultas, exames e procedimentos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredRecords.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhum registro encontrado com os filtros aplicados.</p>
                </div>
              ) : (
                filteredRecords.map((record) => (
                  <div
                    key={record.id}
                    className="p-6 bg-muted/30 rounded-lg border border-border hover:border-secondary transition-smooth"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-secondary ${getTypeColor(record.type).replace('text-', 'text-').replace('bg-', 'bg-')}`}>
                            {getRecordIcon(record.type)}
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className={getTypeColor(record.type)}>
                              {record.type}
                            </Badge>
                            <Badge variant="outline" className={getStatusColor(record.status)}>
                              {record.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">{record.title}</h3>
                          <p className="text-muted-foreground">{record.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{record.doctor} - {record.specialty}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{record.date} {record.time && `às ${record.time}`}</span>
                          </div>
                          {record.location && (
                            <div className="flex items-center gap-2 md:col-span-2">
                              <MapPin className="w-4 h-4" />
                              <span>{record.location}</span>
                            </div>
                          )}
                        </div>
                        
                        {record.attachments && record.attachments.length > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {record.attachments.length} anexo(s)
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedRecord(record)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Detalhes
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                {getRecordIcon(record.type)}
                                {record.title}
                              </DialogTitle>
                              <DialogDescription>
                                Detalhes completos do registro médico
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedRecord && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">TIPO</h4>
                                    <Badge variant="outline" className={getTypeColor(selectedRecord.type)}>
                                      {selectedRecord.type}
                                    </Badge>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">STATUS</h4>
                                    <Badge variant="outline" className={getStatusColor(selectedRecord.status)}>
                                      {selectedRecord.status}
                                    </Badge>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">MÉDICO</h4>
                                    <p className="text-foreground">{selectedRecord.doctor}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">ESPECIALIDADE</h4>
                                    <p className="text-foreground">{selectedRecord.specialty}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">DATA</h4>
                                    <p className="text-foreground">{selectedRecord.date}</p>
                                  </div>
                                  {selectedRecord.time && (
                                    <div>
                                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">HORÁRIO</h4>
                                      <p className="text-foreground">{selectedRecord.time}</p>
                                    </div>
                                  )}
                                  {selectedRecord.location && (
                                    <div className="md:col-span-2">
                                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">LOCAL</h4>
                                      <p className="text-foreground">{selectedRecord.location}</p>
                                    </div>
                                  )}
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">DESCRIÇÃO</h4>
                                  <p className="text-foreground">{selectedRecord.description}</p>
                                </div>
                                
                                {selectedRecord.details && (
                                  <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">DETALHES CLÍNICOS</h4>
                                    <div className="p-4 bg-muted/50 rounded-lg border">
                                      <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                                        {selectedRecord.details}
                                      </pre>
                                    </div>
                                  </div>
                                )}
                                
                                {selectedRecord.attachments && selectedRecord.attachments.length > 0 && (
                                  <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">ANEXOS</h4>
                                    <div className="space-y-2">
                                      {selectedRecord.attachments.map((filename, index) => (
                                        <div 
                                          key={index} 
                                          className="flex items-center justify-between p-2 bg-muted/30 rounded border"
                                        >
                                          <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm text-foreground">{filename}</span>
                                          </div>
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleDownloadAttachment(filename)}
                                          >
                                            <Download className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        {record.attachments && record.attachments.length > 0 && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => toast.success("Downloads iniciados!")}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Baixar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HistoricoClinico;