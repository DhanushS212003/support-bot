from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .services.llm_client import generate_text


@api_view(["POST"])
def chat(request):
    message = request.data.get("prompt")
    testing = request.data.get("testing")

    if not message:
        return Response(
            {"error": "Message is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if len(message) > 100:
        return Response(
            {"error": "Message is too long (max 100 characters)."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if testing:
        return Response(
            {"reply": f"You've send '{message}'"},
            status=status.HTTP_200_OK
        )

    return Response(
        {"reply": generate_text(message)},
        status=status.HTTP_200_OK
    )
