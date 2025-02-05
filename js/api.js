export async function getPokemonDescription() {
  try {
    const response = await fetch('/api/ai_completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Generate a creative description for a completely unique TimmysCoffee card. The name should be a creative blend of Timmy's interests like coffee, gaming (especially RuneScape), football (particularly Chelsea), or his Canadian identity.

        Include 1-2 types from: Gaming, Coffee, Football, Chelsea, Canadian, OSRS, RS3, Content

        The description should capture Timmy's personality as a 32-year-old Canadian RuneScape veteran, Chelsea fan, and content creator.

        interface Response {
          name: string;
          description: string;
          type: string;  // Single type or two types separated by /
          level: string; // Instead of height
          xp: string;    // Instead of weight
        }

        Example response (generate something different):
        {
          "name": "Maple Grind",
          "description": "A legendary Canadian coffee blend that grants double XP while playing RuneScape. Its aroma carries whispers of level-up sounds and the spirit of efficient skilling.",
          "type": "Coffee/Canadian",
          "level": "99",
          "xp": "13M"
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
      level: 'Unknown',
      xp: 'Unknown'
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
        prompt: `Generate a unique image URL for a TimmysCoffee card based on this description: "${description}". The image style should blend gaming elements with coffee themes, incorporating RuneScape, Chelsea FC, and Canadian imagery where appropriate. Return a URL to an image that matches the description.

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