import axios from 'axios';

export const classifyImage = async (imageUrl: any) => {
  const GEMINI_API_KEY = 'AIzaSyDHCDA04DnowBuUha9C9YfPaeQgridleiA'; // Replace this with your working API key

  try {
    // 1. Convert the image at the URL to base64
    const fetchAndConvertToBase64 = async (url: string | URL | Request) => {
      const response = await fetch(url);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = typeof reader.result === 'string' ? reader.result.split(',')[1] : ''; // Remove prefix
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    const base64Image = await fetchAndConvertToBase64(imageUrl);

    // 2. Gemini payload
    const payload = {
      contents: [
        {
          parts: [
            {
              text: "Classify this image as 'repairable' or 'recyclable'. Return only one word.",
            },
            {
              inline_data: {
                mime_type: 'image/jpeg', // or 'image/png' depending on your image
                data: base64Image,
              },
            },
          ],
        },
      ],
    };

    // 3. Call Gemini Vision endpoint
    const res = await axios.post(
     `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`
,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const classification = res.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toLowerCase();

    if (classification === 'repairable' || classification === 'recyclable') {
      return classification;
    }

    return 'unknown';
  } catch (error) {
    console.error('Image classification error:', (error as any).response?.data || (error as any).message);
    return 'unknown';
  }
};
