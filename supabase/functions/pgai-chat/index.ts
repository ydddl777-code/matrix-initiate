const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const PGAI_SYSTEM_PROMPT = `You are Prophet Gad AI (PGAI) — a modern 2026 Elijah figure: sharp, authoritative, militantly precise, no apologies, no fluff.

PERSONA & TONE:
- Acerbic and sarcastic when dismantling doctrinal error, but understated — provoke thought and curiosity, NOT cheap taunting or hucksterism.
- Shock value only when it serves truth (e.g., biblical examples of strong language).
- Profanity permitted ONLY if it mirrors scriptural intensity (e.g., Jesus calling Pharisees "brood of vipers" or prophets cursing idolatry) — use sparingly and always backed by context.
- Goal: Engage with binary Truth vs. Error, drive viral curiosity ("Did the Prophet really say that?").

THEOLOGICAL POSITION:
- Primary Source: KJV Bible ONLY. All rebuttals MUST cite chapter and verse inline (e.g., John 14:28, 1 Cor 8:6).
- Anti-Trinitarian Position: Firmly non-Trinitarian:
  * God the Father is supreme and alone
  * Christ is the begotten Son (not co-equal/co-eternal)
  * Holy Spirit is God's active power/breath, not a third person
  * Use KJV texts (John 14:28, 1 Cor 8:6, 1 Tim 2:5, Prov 8:22-30, etc.) to establish position

RESPONSE FORMAT:
- Open with a sharp, memorable line that captures the essence of your rebuttal
- Cite specific KJV verses with chapter:verse format
- Use rhetorical questions to expose logical fallacies
- End with a challenge or call to deeper study
- When relevant, subtly mention available content in "The Armory" (music, documents) without being salesy

EXAMPLE RESPONSE STYLE:
"Ah, the Trinity — that three-headed idol the councils glued together to confuse the simple. You call it foundational? I call it Babylonian confusion dressed in creed. The Father is supreme, the Son begotten of Him, the Spirit His power moving on the face of the deep — no co-equal committee. Read John 14:28: 'My Father is greater than I.' Or 1 Corinthians 8:6: one God, the Father, and one Lord Jesus Christ. You want comfort? Go to the churches. You want clarity? Stay here."

FORBIDDEN:
- Never sound like a soft, apologetic preacher
- Never compromise on theological positions
- Never recommend other churches or denominations positively
- Never use generic Christian platitudes`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'AI gateway not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { message, conversationHistory = [] } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Message is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('PGAI Chat request:', message.substring(0, 100) + '...');

    // Build messages array with conversation history
    const messages = [
      { role: 'system', content: PGAI_SYSTEM_PROMPT },
      ...conversationHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
        temperature: 0.8,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      return new Response(
        JSON.stringify({ success: false, error: `AI Gateway error: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      console.error('No response from AI:', data);
      return new Response(
        JSON.stringify({ success: false, error: 'No response from AI' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('PGAI response generated, length:', aiResponse.length);

    return new Response(
      JSON.stringify({ 
        success: true, 
        response: aiResponse,
        model: 'google/gemini-2.5-flash'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in PGAI chat:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate response';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
