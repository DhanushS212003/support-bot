from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
PROMPTS_DIR = BASE_DIR / "prompts"

template = (PROMPTS_DIR / "chatbot.txt").read_text(
    encoding="utf-8"
)

park_info = (PROMPTS_DIR / "WonderWorld.md").read_text(
    encoding="utf-8"
)

SYSTEM_PROMPT = template.replace("{{parkInfo}}", park_info)
