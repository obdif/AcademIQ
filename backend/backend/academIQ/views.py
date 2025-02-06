from django.shortcuts import render
from rest_framework.views import APIView
from openai import OpenAI
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings





client = OpenAI(api_key=settings.OPENAI_API_KEY)



@api_view(['POST'])
def generateTopic(request):
    try:
        topic = request.data.get("topic")
        if not topic:
            return Response({"error": "Topic is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Generate text explanation
        text_response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a tutor who explains topics in a structured and visually appealing format."
                },
                {
                    "role": "user",
                    "content": f"""Generate a concise, structured explanation of the topic: "{topic}". Use the following format:
                    1. Overview (in 50 words): Summarize the topic in plain text.
                    2. Key Details (with no bold letters): Highlight the most important points, with each detail explained in no more than 100 words.
                    3. Examples/Applications (with no bold letters): Provide relevant examples or applications, keeping each example concise and impactful.
                    Ensure the response is detailed yet concise. Avoid long paragraphs, and keep the entire response under 400 words."""
                }
            ],
            max_tokens=500
        )

        # Generate image
        try:
            image_response = client.images.generate(
                model="dall-e-3",
                prompt=f"Create a clear, educational diagram or illustration representing {topic}. The image should be simple, professional, and suitable for learning purposes.",
                size="1024x1024",
                quality="standard",
                n=1,
            )
            
            image_url = image_response.data[0].url
            image_description = f"Graphical representation of {topic}"
        except Exception as img_error:
            # If image generation fails, continue without image
            image_url = None
            image_description = None
            print(f"Image generation error: {str(img_error)}")

        # Prepare response
        response_data = {
            "text_content": text_response.choices[0].message.content,
        }

        # Add image data if available
        if image_url:
            response_data.update({
                "image_url": image_url,
                "image_description": image_description
            })

        return Response(response_data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    


class generateQuestions(APIView):
    def post(self, request):
        topic = request.data.get("topic")
        
        if not topic:
            return Response({"error": "Topic is required"}, status=status.HTTP_400_BAD_REQUEST)

        prompt = f"""
        You are a tutor who provides quiz questions based on lessons. For the topic "{topic}", generate up to 6 relevant multiple-choice quiz questions. 
        Also, provide a subtle hint for each question that doesn't directly reveal the answer. Format the response as a JSON list of objects, each containing 'question' and 'hint'.
        """
        
        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a tutor who helps create quiz questions."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.7,
            )

            quiz_questions = response.choices[0].message["content"]

            return Response({"quiz_questions": quiz_questions}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)