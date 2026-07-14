from .gemini_client import client
from .prompt_loader import SYSTEM_PROMPT


def generate_text(message: str):
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=message,
        config={
            "temperature": 0.2,
            "system_instruction": SYSTEM_PROMPT,
            "max_output_tokens": 300,
        },
    )

    return response.text
