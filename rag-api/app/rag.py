from __future__ import annotations

import json
import os
from pathlib import Path

import faiss
import numpy as np
from dotenv import load_dotenv
from groq import Groq
from sentence_transformers import SentenceTransformer

from .prompts import SYSTEM_PROMPT


load_dotenv()


BASE_DIR = Path(__file__).resolve().parents[2]

INDEX_DIR = BASE_DIR / "rag" / "index"

FAISS_PATH = INDEX_DIR / "portfolio.faiss"
METADATA_PATH = INDEX_DIR / "metadata.json"

MODEL_NAME = "BAAI/bge-small-en-v1.5"
GROQ_MODEL = "openai/gpt-oss-120b"

TOP_K = 3


if not FAISS_PATH.exists():
    raise RuntimeError(
        f"FAISS index not found: {FAISS_PATH}"
    )

if not METADATA_PATH.exists():
    raise RuntimeError(
        f"Metadata not found: {METADATA_PATH}"
    )


with METADATA_PATH.open(
    "r",
    encoding="utf-8",
) as file:
    metadata = json.load(file)


chunks: list[dict] = metadata["chunks"]


embedding_model = SentenceTransformer(
    MODEL_NAME
)


faiss_index = faiss.read_index(
    str(FAISS_PATH)
)


groq_api_key = os.getenv(
    "GROQ_API_KEY"
)

if not groq_api_key:
    raise RuntimeError(
        "GROQ_API_KEY is missing."
    )


groq_client = Groq(
    api_key=groq_api_key
)


def retrieve(
    query: str,
    top_k: int = TOP_K,
) -> list[dict]:
    query_embedding = embedding_model.encode(
        [query],
        normalize_embeddings=True,
        convert_to_numpy=True,
    )

    query_embedding = np.asarray(
        query_embedding,
        dtype="float32",
    )

    scores, indices = faiss_index.search(
        query_embedding,
        top_k,
    )

    results: list[dict] = []

    for score, index_id in zip(
        scores[0],
        indices[0],
    ):
        if index_id < 0:
            continue

        chunk = chunks[index_id]

        results.append(
            {
                **chunk,
                "score": float(score),
            }
        )

    return results


def build_context(
    question: str,
) -> str:
    results = retrieve(
        question,
        top_k=TOP_K,
    )

    context_parts: list[str] = []

    for result in results:
        context_parts.append(
            f"SECTION: {result['section']}\n"
            f"{result['text']}"
        )

    return "\n\n---\n\n".join(
        context_parts
    )


def ask_portfolio(
    question: str,
) -> str:
    question = question.strip()

    if not question:
        raise ValueError(
            "Question cannot be empty."
        )

    context = build_context(
        question
    )

    user_prompt = f"""
RETRIEVED PORTFOLIO CONTEXT:

{context}

VISITOR QUESTION:

{question}

Answer the visitor using only the retrieved portfolio context.
"""

    response = groq_client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": user_prompt,
            },
        ],
        temperature=0.1,
        max_tokens=300,
    )

    answer = (
        response
        .choices[0]
        .message
        .content
    )

    if not answer:
        raise RuntimeError(
            "Groq returned an empty response."
        )

    return answer