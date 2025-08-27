import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Ticket, Calendar, Users, CheckCircle, Loader2, User, Mail, Phone } from 'lucide-react';

interface ReservationData {
  nom: string;
  email: string;
  telephone: string;
}

interface Reservation {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  dateReservation: string;
}

const FreeTicketReservation: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [formData, setFormData] = useState<ReservationData>({
    nom: '',
    email: '',
    telephone: ''
  });

  const handleInputChange = (field: keyof ReservationData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.nom.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre nom complet",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast({
        title: "Erreur", 
        description: "Veuillez entrer une adresse email valide",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.telephone.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre numéro de téléphone",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const createReservation = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulation d'une réservation (ici vous pourriez intégrer avec votre base de données)
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newReservation: Reservation = {
        id: `RES-${Date.now()}`,
        nom: formData.nom,
        email: formData.email,
        telephone: formData.telephone,
        dateReservation: new Date().toISOString()
      };

      setReservation(newReservation);
      
      toast({
        title: "Réservation confirmée !",
        description: "Votre place gratuite a été réservée avec succès. Vous recevrez un email de confirmation.",
      });

    } catch (error) {
      console.error('Error creating reservation:', error);
      toast({
        title: "Erreur",
        description: "Impossible de traiter votre réservation. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setReservation(null);
    setFormData({
      nom: '',
      email: '',
      telephone: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Ticket className="w-8 h-8 text-primary" />
          Réservation Gratuite
        </h1>
        <p className="text-muted-foreground">
          Réservez votre place gratuite pour la formation intensive
        </p>
      </div>

      {!reservation ? (
        <Card className="bg-cyber-card cyber-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Formation Intensive - Développement Web & Cybersécurité
            </CardTitle>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>📅 Date :</strong> 6 Septembre 2025 à 8h00</p>
              <p><strong>📍 Durée :</strong> 6 mois (formation intensive)</p>
              <p><strong>🎯 Places :</strong> Limitées à 25 participants</p>
              <p><strong>💰 Prix :</strong> <span className="text-primary font-bold">GRATUIT</span></p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nom" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nom complet *
                </Label>
                <Input
                  id="nom"
                  value={formData.nom}
                  onChange={(e) => handleInputChange('nom', e.target.value)}
                  placeholder="Votre nom et prénom"
                  className="bg-background/50 border-primary/30 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="votre.email@exemple.com"
                  className="bg-background/50 border-primary/30 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Téléphone *
                </Label>
                <Input
                  id="telephone"
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => handleInputChange('telephone', e.target.value)}
                  placeholder="06 12 34 56 78"
                  className="bg-background/50 border-primary/30 focus:border-primary"
                />
              </div>
            </div>

            <Button 
              onClick={createReservation}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Réservation en cours...
                </>
              ) : (
                <>
                  <Ticket className="w-4 h-4 mr-2" />
                  Réserver ma place gratuite
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              En réservant, vous acceptez de recevoir des informations sur la formation.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-cyber-card cyber-glow">
          <CardHeader>
            <CardTitle className="text-center text-primary flex items-center justify-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Réservation Confirmée !
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <Badge className="bg-primary/20 text-primary border-primary/30 text-lg py-2 px-4">
                <Ticket className="w-4 h-4 mr-2" />
                Place Gratuite Réservée
              </Badge>
              
              <div className="bg-background/50 rounded-lg p-6 space-y-3">
                <h3 className="text-xl font-bold">Détails de votre réservation</h3>
                <div className="text-left space-y-2">
                  <p><strong>Numéro de réservation :</strong> {reservation.id}</p>
                  <p><strong>Nom :</strong> {reservation.nom}</p>
                  <p><strong>Email :</strong> {reservation.email}</p>
                  <p><strong>Téléphone :</strong> {reservation.telephone}</p>
                  <p><strong>Date de réservation :</strong> {new Date(reservation.dateReservation).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-4 text-sm">
                <p className="font-semibold mb-2">📧 Prochaines étapes :</p>
                <ul className="text-left space-y-1">
                  <li>• Vous recevrez un email de confirmation dans les 24h</li>
                  <li>• Un lien de connexion vous sera envoyé 48h avant le début</li>
                  <li>• Préparez-vous pour une expérience exceptionnelle !</li>
                </ul>
              </div>
            </div>

            <Button
              onClick={resetForm}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary/10"
              size="lg"
            >
              Nouvelle réservation
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FreeTicketReservation;