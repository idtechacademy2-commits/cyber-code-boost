import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const eventbriteApiKey = Deno.env.get('EVENTBRITE_API_KEY');
    
    if (!eventbriteApiKey) {
      throw new Error('EVENTBRITE_API_KEY is not configured');
    }

    const { eventTitle, eventDescription, eventDate, eventTime, capacity } = await req.json();

    // Create event on Eventbrite
    const eventData = {
      event: {
        name: {
          html: eventTitle
        },
        description: {
          html: eventDescription
        },
        start: {
          timezone: "Europe/Paris",
          utc: new Date(`${eventDate}T${eventTime}:00.000Z`).toISOString()
        },
        end: {
          timezone: "Europe/Paris", 
          utc: new Date(new Date(`${eventDate}T${eventTime}:00.000Z`).getTime() + 4 * 60 * 60 * 1000).toISOString() // 4 hours duration
        },
        currency: "EUR",
        online_event: false,
        organizer_id: "me",
        listed: true,
        shareable: true,
        invite_only: false,
        show_remaining: true,
        capacity: capacity || 100
      }
    };

    console.log('Creating event with data:', eventData);

    const eventResponse = await fetch('https://www.eventbriteapi.com/v3/events/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${eventbriteApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (!eventResponse.ok) {
      const errorText = await eventResponse.text();
      console.error('Eventbrite API error:', errorText);
      throw new Error(`Failed to create event: ${errorText}`);
    }

    const eventResult = await eventResponse.json();
    console.log('Event created:', eventResult);

    // Create free ticket for the event
    const ticketData = {
      ticket_class: {
        name: "Ticket Gratuit - Formation Développement Web & Cybersécurité",
        description: "Ticket gratuit pour accéder à notre formation intensive en développement web et cybersécurité",
        free: true,
        quantity_total: capacity || 100,
        sales_channels: ["online"],
        delivery_methods: ["electronic"]
      }
    };

    console.log('Creating ticket with data:', ticketData);

    const ticketResponse = await fetch(`https://www.eventbriteapi.com/v3/events/${eventResult.id}/ticket_classes/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${eventbriteApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    });

    if (!ticketResponse.ok) {
      const errorText = await ticketResponse.text();
      console.error('Eventbrite ticket API error:', errorText);
      throw new Error(`Failed to create ticket: ${errorText}`);
    }

    const ticketResult = await ticketResponse.json();
    console.log('Ticket created:', ticketResult);

    // Publish the event
    const publishResponse = await fetch(`https://www.eventbriteapi.com/v3/events/${eventResult.id}/publish/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${eventbriteApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!publishResponse.ok) {
      const errorText = await publishResponse.text();
      console.error('Failed to publish event:', errorText);
      // Don't throw error here, event is still created
    }

    return new Response(JSON.stringify({
      success: true,
      event: {
        id: eventResult.id,
        url: eventResult.url,
        title: eventResult.name.text,
        start: eventResult.start.local,
        ticket_url: `https://www.eventbrite.com/e/${eventResult.id}`,
        ticket_id: ticketResult.id
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in create-eventbrite-tickets function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});