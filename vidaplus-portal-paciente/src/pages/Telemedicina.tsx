import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  ArrowLeft,
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  MessageSquare,
  Monitor
} from "lucide-react";
import { toast } from "sonner";

const Telemedicina = () => {
  const navigate = useNavigate();
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    toast.success("Conectando à consulta...");
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
    toast.success("Consulta finalizada");
    navigate("/dashboard");
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast(isMuted ? "Microfone ativado" : "Microfone desativado");
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast(isVideoOn ? "Câmera desativada" : "Câmera ativada");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-sm sticky top-0 z-10">
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
                  <h1 className="text-lg font-bold text-foreground">Telemedicina</h1>
                  <p className="text-xs text-muted-foreground">
                    {isCallActive ? `Em chamada • ${formatDuration(callDuration)}` : "Sala de espera"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {!isCallActive ? (
            /* Waiting Room */
            <Card className="shadow-card border-2">
              <CardContent className="p-12">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-health rounded-3xl flex items-center justify-center mx-auto shadow-lg">
                    <Video className="w-12 h-12 text-white" />
                  </div>
                  
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-3">
                      Consulta com Dra. Ana Costa
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Dermatologia • 28 Nov 2025 • 10:00
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-6 max-w-md mx-auto">
                    <h3 className="font-semibold text-foreground mb-3">Antes de começar:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground text-left">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        Verifique sua conexão de internet
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        Teste seu microfone e câmera
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        Esteja em um local tranquilo e bem iluminado
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        Tenha seus documentos e exames em mãos
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-3 justify-center pt-4">
                    <Button 
                      size="lg" 
                      className="px-8"
                      onClick={handleStartCall}
                    >
                      <Video className="w-5 h-5 mr-2" />
                      Iniciar Consulta
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                    >
                      Voltar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 aspect-video bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl overflow-hidden relative border-2 border-border shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-xl">
                        <span className="text-4xl font-bold text-white">AC</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">Dra. Ana Costa</h3>
                        <p className="text-muted-foreground">Dermatologista • CRM 44444</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      {formatDuration(callDuration)}
                    </span>
                  </div>
                </div>

                <div className="aspect-video md:aspect-auto bg-gradient-to-br from-muted to-muted/50 rounded-2xl overflow-hidden relative border-2 border-border shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isVideoOn ? (
                      <div className="text-center space-y-2">
                        <div className="w-20 h-20 bg-gradient-health rounded-full flex items-center justify-center mx-auto shadow-lg">
                          <span className="text-2xl font-bold text-white">MS</span>
                        </div>
                        <p className="text-sm font-medium text-foreground">Você</p>
                      </div>
                    ) : (
                      <div className="text-center space-y-2">
                        <VideoOff className="w-12 h-12 text-muted-foreground mx-auto" />
                        <p className="text-sm text-muted-foreground">Câmera desativada</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Card className="shadow-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      size="lg"
                      variant={isMuted ? "destructive" : "secondary"}
                      className="w-14 h-14 rounded-full"
                      onClick={toggleMute}
                    >
                      {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </Button>

                    <Button
                      size="lg"
                      variant={isVideoOn ? "secondary" : "destructive"}
                      className="w-14 h-14 rounded-full"
                      onClick={toggleVideo}
                    >
                      {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="w-14 h-14 rounded-full"
                    >
                      <Monitor className="w-6 h-6" />
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="w-14 h-14 rounded-full"
                    >
                      <MessageSquare className="w-6 h-6" />
                    </Button>

                    <Button
                      size="lg"
                      variant="destructive"
                      className="w-16 h-16 rounded-full shadow-lg"
                      onClick={handleEndCall}
                    >
                      <PhoneOff className="w-6 h-6" />
                    </Button>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-sm text-muted-foreground">
                      Obs: A consulta está sendo gravada para fins de prontuário médico.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Telemedicina;
