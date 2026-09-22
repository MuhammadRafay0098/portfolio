from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from .rag import ask_portfolio


app = FastAPI(
    title="Muhammad Rafay Portfolio RAG API",
    version="1.0.0",
)


class ChatRequest(BaseModel):
    question: str = Field(
        min_length=1,
        max_length=500,
    )


class ChatResponse(BaseModel):
    answer: str


@app.get("/health")
def health() -> dict[str, str]:
    return {
        "status": "ok",
    }


@app.post(
    "/chat",
    response_model=ChatResponse,
)
def chat(
    request: ChatRequest,
) -> ChatResponse:
    try:
        answer = ask_portfolio(
            request.question
        )

        return ChatResponse(
            answer=answer
        )

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        ) from error

    except Exception as error:
        print(
            "RAG API error:",
            repr(error),
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "Unable to generate a response."
            ),
        ) from error