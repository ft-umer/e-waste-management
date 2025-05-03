export const classifyImage = async (imageUrl: string): Promise<string> => {
    const apiKey = 'AIzaSyDHCDA04DnowBuUha9C9YfPaeQgridleiA';
  
    try {
      // Step 1: Fetch the image as a blob
      const imageRes = await fetch(imageUrl);
      const imageBlob = await imageRes.blob();
  
      // Step 2: Convert to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = (reader.result as string).split(',')[1];
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageBlob);
      });
  
      // Step 3: Construct the Gemini API payload
      const payload = {
        contents: [
          {
            parts: [
              {
                text: "Classify this image as 'repairable' or 'recyclable'. Return only one word: 'repairable' or 'recyclable'."
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64
                }
              }
            ]
          }
        ]
      };
  
      // Step 4: Send to Gemini API
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );
  
      const data = await res.json();
      const classification = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toLowerCase();
  
      if (classification === 'repairable' || classification === 'recyclable') {
        return classification;
      }
  
      return 'unknown';
    } catch (err) {
      console.error('Gemini classification error:', err);
      return 'unknown';
    }
  };
  