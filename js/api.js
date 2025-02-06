export async function getPokemonDescription() {
  try {
    const response = await fetch('/api/ai_completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Generate a creative description for a unique TimmysCoffee card. The name should be a creative blend of Timmy's interests like coffee, gaming (especially RuneScape), football (particularly Chelsea), content creation, or his Canadian identity.

        Include 1-2 types from: Gaming, Coffee, Football, Chelsea, Canadian, OSRS, RS3, Content, Sky, Flora, Elemental, Celestial, Light

        The description should capture the essence of TimmysCoffee (Ryan) - a 32-year-old Canadian RuneScape veteran of 20+ years, Chelsea fan, Twitch streamer, and content creator known for epic gaming moments and engaging streams.

        Level Context:
        - Lower levels (1-50) should be more common
        - Mid levels (51-80) should be less common
        - High levels (81-99) should be rare
        - Max level (99) should be very rare
        
        XP Context:
        - 0-100k XP (common)
        - 100k-1M XP (uncommon)
        - 1M-10M XP (rare)
        - 10M+ XP (very rare)
        - 13M XP (extremely rare, only for level 99 cards)

        Do NOT generate holographic cards (these are extremely rare special events only)

        Incorporate real TimmysCoffee stream moments when possible:
        - Beaver pet drops
        - Kraken battles
        - Late night skill grinds
        - RuneScape beer chugging moments
        - Chelsea FC reactions
        - Canadian hometown pride
        - Coffee brewing sessions

        interface Response {
          name: string;
          description: string;
          type: string;  // Single type or two types separated by /
          level: string; // For level metric
          xp: string;    // For XP metric
        }

        Example response (generate something different):
        {
          "name": "Late Night Grinder",
          "description": "A legendary coffee-fueled skilling session where TimmysCoffee achieved 99 Woodcutting at 3 AM while sharing stories of Canadian winters. The stream peaked when the coveted beaver pet dropped, causing an eruption of celebration.",
          "type": "Coffee/OSRS",
          "level": "lvl 99",
          "xp": "13M xp"
        }`,
        data: ""
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching TimmysCoffee description:', error);
    return {
      name: 'Error',
      description: 'Failed to generate card description',
      type: 'Unknown',
      level: 'lvl 1', 
      xp: '0 xp'
    };
  }
}

export async function generatePokemonImage(description) {
  try {
    const response = await fetch('/api/ai_completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Generate a unique image URL for a TimmysCoffee card based on this description: "${description}". 

        The image should blend elements of:
        - RuneScape gameplay (OSRS and RS3)
        - Coffee culture
        - Chelsea FC
        - Canadian imagery
        - Twitch streaming/content creation
        - Epic gaming moments
        
        Style: Clean, vibrant, slightly stylized but not cartoonish
        
        interface Response {
          imageUrl: string;
        }

        Example response (generate something different):
        {
          "imageUrl": "https://example.com/timmyscoffee-image.jpg"
        }`,
        data: description
      }),
    });
    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Error generating card image:', error);
    return null;
  }
}