import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Countdown } from '@/components/ui/countdown';
import { useForm } from 'react-hook-form';
import { Shield, Code, Zap, Users, Award, Lock, ChevronDown, ChevronUp, Star, CheckCircle, Target, TrendingUp, Globe } from 'lucide-react';
import cyberHero from '@/assets/cyber-hero.jpg';

interface FormData {
  nom: string;
  email: string;
  telephone: string;
}

const Index = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const targetDate = new Date('2025-09-06T08:00:00');

  const onSubmit = (data: FormData) => {
    console.log('Inscription:', data);
    // Ici vous pouvez traiter l'inscription
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const testimonials = [
    {
      name: "Sarah M.",
      role: "DevOps Engineer",
      content: "Cette formation a complètement transformé ma carrière. Je suis passée de débutante à experte en 6 mois !",
      rating: 5
    },
    {
      name: "Alexandre D.",
      role: "Cybersecurity Analyst", 
      content: "Les formateurs sont exceptionnels et le contenu ultra pratique. Mon salaire a doublé après la formation.",
      rating: 5
    },
    {
      name: "Marie L.",
      role: "Full-Stack Developer",
      content: "J'ai enfin trouvé ma voie ! La combinaison dev web + cybersécurité est parfaite pour le marché actuel.",
      rating: 5
    }
  ];

  const benefits = [
    {
      icon: Code,
      title: "Maîtrise Complète",
      description: "Du code à la sécurité, devenez expert sur toute la chaîne de développement web"
    },
    {
      icon: Shield,
      title: "Expertise Cybersécurité",
      description: "Apprenez le hacking éthique et protégez les systèmes comme un pro"
    },
    {
      icon: TrendingUp,
      title: "Carrière Explosive",
      description: "Accédez aux métiers les mieux payés du numérique avec notre formation"
    }
  ];

  const opportunities = [
    { icon: Target, role: "Développeur Full-Stack", salary: "45-70K€" },
    { icon: Shield, role: "Expert Cybersécurité", salary: "55-85K€" },
    { icon: Code, role: "Consultant DevSecOps", salary: "60-90K€" },
    { icon: Globe, role: "Architecte Sécurité", salary: "70-120K€" }
  ];

  const faqs = [
    {
      question: "Quel est le niveau requis pour rejoindre la formation ?",
      answer: "Aucun prérequis technique ! Notre programme part de zéro et vous amène progressivement vers l'expertise. Seules la motivation et l'envie d'apprendre comptent."
    },
    {
      question: "Combien de temps dure la formation ?",
      answer: "La formation intensive dure 6 mois avec un rythme adapté aux actifs. Vous pouvez également choisir le format accéléré de 3 mois pour une immersion totale."
    },
    {
      question: "Y a-t-il un accompagnement personnalisé ?",
      answer: "Absolument ! Chaque étudiant bénéficie d'un mentor dédié, de sessions de coaching individuel et d'un suivi personnalisé tout au long du parcours."
    },
    {
      question: "Quelle certification obtiendrez-vous ?",
      answer: "Vous recevrez une certification reconnue par l'industrie en Développement Web & Cybersécurité, plus les préparations aux certifications CEH et CISSP."
    },
    {
      question: "Quel est le taux de placement après la formation ?",
      answer: "97% de nos diplômés trouvent un emploi dans les 3 mois suivant la formation, avec une augmentation de salaire moyenne de 65%."
    }
  ];

  return (
    <div className="min-h-screen bg-cyber-gradient overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${cyberHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 animate-pulse-green">
            <Zap className="w-4 h-4 mr-1" />
            Formation Intensive - Places Limitées
          </Badge>
          
          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
            Devenez Expert en{' '}
            <span className="text-primary cyber-text-glow">Développement Web</span>
            {' '}& <span className="text-secondary cyber-text-glow">Hacking Éthique</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            La seule formation qui vous transforme de débutant à expert cybersécurité en 6 mois. 
            Accédez aux métiers les mieux rémunérés du numérique avec notre méthode révolutionnaire.
          </p>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-cyber-card cyber-glow hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Countdown */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-primary">⏳ Prochaine session dans :</h3>
            <Countdown targetDate={targetDate} />
          </div>

          {/* CTA Form */}
          <Card className="bg-cyber-card cyber-glow max-w-2xl mx-auto p-8">
            <h3 className="text-3xl font-bold mb-6 text-center">🚀 Réservez Votre Place Maintenant</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input
                    {...register('nom', { required: 'Le nom est requis' })}
                    placeholder="Votre nom complet"
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                  {errors.nom && <p className="text-destructive text-sm mt-1">{errors.nom.message}</p>}
                </div>
                <div>
                  <Input
                    {...register('telephone', { required: 'Le téléphone est requis' })}
                    placeholder="Votre téléphone"
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                  {errors.telephone && <p className="text-destructive text-sm mt-1">{errors.telephone.message}</p>}
                </div>
              </div>
              <div>
                <Input
                  {...register('email', { 
                    required: 'L\'email est requis',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email invalide'
                    }
                  })}
                  type="email"
                  placeholder="Votre email professionnel"
                  className="bg-background/50 border-primary/30 focus:border-primary"
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="w-full text-xl py-6 bg-primary hover:bg-primary/90 animate-pulse-green font-bold"
              >
                🔘 JE M'INSCRIS MAINTENANT
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                <Lock className="w-4 h-4 inline mr-1" />
                Vos données sont protégées – confidentialité garantie
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            🎤 Ils ont transformé leur carrière
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-cyber-card cyber-glow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-bold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="py-20 px-4 bg-cyber-gray/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            🚀 Vos futures opportunités
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {opportunities.map((opportunity, index) => (
              <Card key={index} className="bg-cyber-card cyber-glow text-center hover:scale-105 transition-transform">
                <CardContent className="p-6">
                  <opportunity.icon className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">{opportunity.role}</h3>
                  <p className="text-2xl font-bold text-primary">{opportunity.salary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            ❓ Questions fréquentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-cyber-card cyber-glow">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-primary/5 transition-colors"
                  >
                    <h3 className="font-bold text-lg">{faq.question}</h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-6 h-6 text-primary" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-primary" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Credibility */}
      <section className="py-20 px-4 bg-cyber-gray/20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">
            🏆 Une formation d'excellence
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Award className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Certification Reconnue</h3>
              <p className="text-muted-foreground">Diplôme validé par l'industrie</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-16 h-16 text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">Experts Formateurs</h3>
              <p className="text-muted-foreground">15+ ans d'expérience terrain</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Accompagnement 24/7</h3>
              <p className="text-muted-foreground">Support personnalisé garanti</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6">
            Ne ratez pas cette opportunité unique !
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Seulement 25 places disponibles pour cette session exclusive
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="text-2xl py-8 px-12 bg-primary hover:bg-primary/90 animate-pulse-green font-bold"
            >
              🔘 JE RÉSERVE MA PLACE MAINTENANT
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10 font-bold text-xl px-8 py-8"
              onClick={() => window.location.href = '/auth'}
            >
              🔐 Se connecter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
