import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Ticket, Calendar, Users, ExternalLink, Loader2 } from 'lucide-react';

interface EventData {
  eventTitle: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  capacity: number;
}

interface CreatedEvent {
  id: string;
  url: string;
  title: string;
  start: string;
  ticket_url: string;
  ticket_id: string;
}

const EventbriteTickets: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [createdEvent, setCreatedEvent] = useState<CreatedEvent | null>(null);
  const [eventData, setEventData] = useState<EventData>({
    eventTitle: 'Formation Intensive - Développement Web & Cybersécurité',
    eventDescription: `<h2>Transformez votre carrière avec notre formation intensive !</h2>
    
<p>Rejoignez notre formation révolutionnaire qui vous transformera de débutant à expert en développement web et cybersécurité en seulement 6 mois.</p>

<h3>🎯 Ce que vous apprendrez :</h3>
<ul>
<li>Développement web full-stack (HTML, CSS, JavaScript, React, Node.js)</li>
<li>Techniques de hacking éthique et cybersécurité</li>
<li>Sécurisation d'applications web</li>
<li>Tests de pénétration</li>
<li>Architecture sécurisée</li>
</ul>

<h3>🚀 Avantages de la formation :</h3>
<ul>
<li>Formation 100% pratique avec projets réels</li>
<li>Accompagnement personnalisé par des experts</li>
<li>Certification reconnue par l'industrie</li>
<li>Aide au placement professionnel</li>
<li>Accès aux métiers les mieux rémunérés du numérique</li>
</ul>

<p><strong>Places limitées à 25 participants pour garantir un suivi personnalisé optimal !</strong></p>`,
    eventDate: '2025-09-06',
    eventTime: '08:00',
    capacity: 25
  });

  const handleInputChange = (field: keyof EventData, value: string | number) => {
    setEventData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const createEvent = async () => {
    if (!eventData.eventTitle || !eventData.eventDate || !eventData.eventTime) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log('Creating event with data:', eventData);

      const { data, error } = await supabase.functions.invoke('create-eventbrite-tickets', {
        body: eventData
      });

      if (error) {
        throw error;
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Erreur inconnue lors de la création de l\'événement');
      }

      setCreatedEvent(data.event);
      
      toast({
        title: "Événement créé avec succès !",
        description: "Votre événement et ses tickets gratuits sont maintenant disponibles sur Eventbrite",
      });

    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : 'Impossible de créer l\'événement',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCreatedEvent(null);
    setEventData({
      eventTitle: 'Formation Intensive - Développement Web & Cybersécurité',
      eventDescription: `<h2>Transformez votre carrière avec notre formation intensive !</h2>
      
<p>Rejoignez notre formation révolutionnaire qui vous transformera de débutant à expert en développement web et cybersécurité en seulement 6 mois.</p>

<h3>🎯 Ce que vous apprendrez :</h3>
<ul>
<li>Développement web full-stack (HTML, CSS, JavaScript, React, Node.js)</li>
<li>Techniques de hacking éthique et cybersécurité</li>
<li>Sécurisation d'applications web</li>
<li>Tests de pénétration</li>
<li>Architecture sécurisée</li>
</ul>

<h3>🚀 Avantages de la formation :</h3>
<ul>
<li>Formation 100% pratique avec projets réels</li>
<li>Accompagnement personnalisé par des experts</li>
<li>Certification reconnue par l'industrie</li>
<li>Aide au placement professionnel</li>
<li>Accès aux métiers les mieux rémunérés du numérique</li>
</ul>

<p><strong>Places limitées à 25 participants pour garantir un suivi personnalisé optimal !</strong></p>`,
      eventDate: '2025-09-06',
      eventTime: '08:00',
      capacity: 25
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Ticket className="w-8 h-8 text-primary" />
          Création de Tickets Gratuits Eventbrite
        </h1>
        <p className="text-muted-foreground">
          Créez votre événement et générez des tickets gratuits pour la formation
        </p>
      </div>

      {!createdEvent ? (
        <Card className="bg-cyber-card cyber-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Détails de l'événement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="eventTitle">Titre de l'événement *</Label>
              <Input
                id="eventTitle"
                value={eventData.eventTitle}
                onChange={(e) => handleInputChange('eventTitle', e.target.value)}
                placeholder="Nom de votre événement"
                className="bg-background/50 border-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventDescription">Description de l'événement</Label>
              <Textarea
                id="eventDescription"
                value={eventData.eventDescription}
                onChange={(e) => handleInputChange('eventDescription', e.target.value)}
                placeholder="Description détaillée de votre événement"
                rows={10}
                className="bg-background/50 border-primary/30 focus:border-primary"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventDate">Date de l'événement *</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={eventData.eventDate}
                  onChange={(e) => handleInputChange('eventDate', e.target.value)}
                  className="bg-background/50 border-primary/30 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventTime">Heure de début *</Label>
                <Input
                  id="eventTime"
                  type="time"
                  value={eventData.eventTime}
                  onChange={(e) => handleInputChange('eventTime', e.target.value)}
                  className="bg-background/50 border-primary/30 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Nombre de places disponibles</Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                max="1000"
                value={eventData.capacity}
                onChange={(e) => handleInputChange('capacity', parseInt(e.target.value) || 25)}
                className="bg-background/50 border-primary/30 focus:border-primary"
              />
            </div>

            <Button 
              onClick={createEvent}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Création en cours...
                </>
              ) : (
                <>
                  <Ticket className="w-4 h-4 mr-2" />
                  Créer l'événement et les tickets
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-cyber-card cyber-glow">
          <CardHeader>
            <CardTitle className="text-center text-primary">
              🎉 Événement créé avec succès !
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <Badge className="bg-primary/20 text-primary border-primary/30 text-lg py-2 px-4">
                <Users className="w-4 h-4 mr-2" />
                {eventData.capacity} places gratuites disponibles
              </Badge>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{createdEvent.title}</h3>
                <p className="text-muted-foreground">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {new Date(createdEvent.start).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.open(createdEvent.ticket_url, '_blank')}
                className="bg-secondary hover:bg-secondary/90 text-white font-bold"
                size="lg"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Voir sur Eventbrite
              </Button>
              
              <Button
                onClick={resetForm}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                size="lg"
              >
                Créer un nouvel événement
              </Button>
            </div>

            <div className="bg-background/50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold">Liens de l'événement :</p>
              <div className="space-y-1 text-xs">
                <p><strong>Page Eventbrite :</strong> <a href={createdEvent.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{createdEvent.url}</a></p>
                <p><strong>Lien de réservation :</strong> <a href={createdEvent.ticket_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{createdEvent.ticket_url}</a></p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventbriteTickets;