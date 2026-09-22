from __future__ import annotations

import json
import re
from pathlib import Path

import faiss
import fitz
import numpy as np
from sentence_transformers import SentenceTransformer


ROOT_DIR = Path(__file__).resolve().parents[1]

PDF_PATH = (
    ROOT_DIR
    / "documents"
    / "Muhammad_Rafay_RAG_Knowledge_Base.pdf"
)

INDEX_DIR = ROOT_DIR / "index"

FAISS_PATH = INDEX_DIR / "portfolio.faiss"
METADATA_PATH = INDEX_DIR / "metadata.json"

EMBEDDING_MODEL = "BAAI/bge-small-en-v1.5"

CHUNK_SIZE = 900
CHUNK_OVERLAP = 150


def extract_pdf_text(pdf_path: Path) -> list[dict]:
    if not pdf_path.exists():
        raise FileNotFoundError(
            f"Knowledge PDF not found: {pdf_path}"
        )

    document = fitz.open(pdf_path)

    pages: list[dict] = []

    for page_number, page in enumerate(document, start=1):
        text = page.get_text("text")

        if not text.strip():
            continue

        pages.append(
            {
                "page": page_number,
                "text": clean_text(text),
            }
        )

    document.close()

    return pages


def clean_text(text: str) -> str:
    text = text.replace("\u00a0", " ")

    text = re.sub(
        r"Page\s+\d+",
        "",
        text,
        flags=re.IGNORECASE,
    )

    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()


def chunk_text(
    text: str,
    chunk_size: int = CHUNK_SIZE,
    overlap: int = CHUNK_OVERLAP,
) -> list[str]:
    if not text:
        return []

    chunks: list[str] = []

    start = 0
    text_length = len(text)

    while start < text_length:
        end = min(start + chunk_size, text_length)

        chunk = text[start:end]

        if end < text_length:
            preferred_break = max(
                chunk.rfind("\n\n"),
                chunk.rfind(". "),
                chunk.rfind("\n"),
            )

            if preferred_break > chunk_size // 2:
                end = start + preferred_break + 1
                chunk = text[start:end]

        cleaned_chunk = chunk.strip()

        if cleaned_chunk:
            chunks.append(cleaned_chunk)

        if end >= text_length:
            break

        start = max(end - overlap, start + 1)

    return chunks


def create_chunks(
    pages: list[dict],
) -> list[dict]:
    records: list[dict] = []

    chunk_id = 0

    for page in pages:
        page_chunks = chunk_text(page["text"])

        for chunk in page_chunks:
            records.append(
                {
                    "id": chunk_id,
                    "page": page["page"],
                    "source": PDF_PATH.name,
                    "text": chunk,
                }
            )

            chunk_id += 1

    return records


def build_faiss_index(
    chunks: list[dict],
) -> None:
    if not chunks:
        raise ValueError(
            "No chunks were generated from the PDF."
        )

    print(f"Loading embedding model: {EMBEDDING_MODEL}")

    model = SentenceTransformer(
        EMBEDDING_MODEL
    )

    texts = [
        chunk["text"]
        for chunk in chunks
    ]

    print(
        f"Generating embeddings for "
        f"{len(texts)} chunks..."
    )

    embeddings = model.encode(
        texts,
        normalize_embeddings=True,
        show_progress_bar=True,
        convert_to_numpy=True,
    )

    embeddings = np.asarray(
        embeddings,
        dtype="float32",
    )

    dimension = embeddings.shape[1]

    index = faiss.IndexFlatIP(dimension)

    index.add(embeddings)

    INDEX_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    faiss.write_index(
        index,
        str(FAISS_PATH),
    )

    metadata = {
        "embedding_model": EMBEDDING_MODEL,
        "embedding_dimension": dimension,
        "similarity": "cosine",
        "chunk_size": CHUNK_SIZE,
        "chunk_overlap": CHUNK_OVERLAP,
        "total_chunks": len(chunks),
        "documents": [PDF_PATH.name],
        "chunks": chunks,
    }

    with METADATA_PATH.open(
        "w",
        encoding="utf-8",
    ) as file:
        json.dump(
            metadata,
            file,
            ensure_ascii=False,
            indent=2,
        )

    print("\nRAG index created successfully.")
    print(f"Chunks: {len(chunks)}")
    print(f"Embedding dimension: {dimension}")
    print(f"FAISS: {FAISS_PATH}")
    print(f"Metadata: {METADATA_PATH}")


def main() -> None:
    print("Extracting portfolio knowledge...")

    pages = extract_pdf_text(PDF_PATH)

    print(
        f"Extracted {len(pages)} pages."
    )

    chunks = create_chunks(pages)

    print(
        f"Created {len(chunks)} chunks."
    )

    build_faiss_index(chunks)


if __name__ == "__main__":
    main()