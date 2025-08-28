-- Créer une table pour les inscriptions à la formation
CREATE TABLE public.inscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS sur la table inscriptions
ALTER TABLE public.inscriptions ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre l'insertion publique des inscriptions
CREATE POLICY "Allow public insert on inscriptions" 
ON public.inscriptions 
FOR INSERT 
WITH CHECK (true);

-- Créer une politique pour permettre la lecture publique des inscriptions (pour les admins)
CREATE POLICY "Allow public read on inscriptions" 
ON public.inscriptions 
FOR SELECT 
USING (true);

-- Créer un trigger pour mettre à jour automatiquement le timestamp updated_at
CREATE TRIGGER update_inscriptions_updated_at
BEFORE UPDATE ON public.inscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();