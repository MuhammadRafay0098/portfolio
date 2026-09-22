import {
  portfolioKnowledge,
  type PortfolioKnowledgeChunk,
} from "@/lib/portfolioKnowledge";

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "can",
  "did",
  "do",
  "does",
  "for",
  "from",
  "has",
  "have",
  "he",
  "his",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "of",
  "on",
  "or",
  "rafay",
  "tell",
  "that",
  "the",
  "to",
  "was",
  "what",
  "when",
  "where",
  "which",
  "who",
  "with",
  "you",
]);

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+#.\-\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string): string[] {
  return normalize(value)
    .split(" ")
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function scoreChunk(query: string, chunk: PortfolioKnowledgeChunk): number {
  const normalizedQuery = normalize(query);

  const queryTokens = new Set(tokenize(query));

  const searchableText = normalize(
    `${chunk.title} ${chunk.keywords.join(" ")} ${chunk.text}`,
  );

  const searchableTokens = new Set(tokenize(searchableText));

  let score = 0;

  for (const token of queryTokens) {
    if (searchableTokens.has(token)) {
      score += 2;
    }

    if (chunk.keywords.some((keyword) => normalize(keyword) === token)) {
      score += 3;
    }
  }

  for (const keyword of chunk.keywords) {
    const normalizedKeyword = normalize(keyword);

    if (
      normalizedKeyword.length > 2 &&
      normalizedQuery.includes(normalizedKeyword)
    ) {
      score += normalizedKeyword.includes(" ") ? 8 : 4;
    }
  }

  if (normalizedQuery.includes(normalize(chunk.title))) {
    score += 10;
  }

  return score;
}

export function retrievePortfolioContext(
  query: string,
  limit = 3,
): PortfolioKnowledgeChunk[] {
  return portfolioKnowledge
    .map((chunk) => ({
      chunk,
      score: scoreChunk(query, chunk),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ chunk }) => chunk);
}

export function buildPortfolioContext(
  chunks: PortfolioKnowledgeChunk[],
): string {
  return chunks
    .map((chunk) => `SECTION: ${chunk.title}\n\n${chunk.text}`)
    .join("\n\n---\n\n");
}
