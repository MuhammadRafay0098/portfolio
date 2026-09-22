import { NextResponse } from "next/server";

interface AssistantRequest {
  question?: unknown;
}

interface RagApiResponse {
  answer: string;
}

const MAX_QUESTION_LENGTH = 500;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AssistantRequest;

    if (typeof body.question !== "string" || !body.question.trim()) {
      return NextResponse.json(
        {
          error: "Please enter a question.",
        },
        {
          status: 400,
        },
      );
    }

    const question = body.question.trim();

    if (question.length > MAX_QUESTION_LENGTH) {
      return NextResponse.json(
        {
          error: `Question must be ${MAX_QUESTION_LENGTH} characters or fewer.`,
        },
        {
          status: 400,
        },
      );
    }

    const ragApiUrl = process.env.RAG_API_URL;

    if (!ragApiUrl) {
      console.error("RAG_API_URL is not configured.");

      return NextResponse.json(
        {
          error: "AI assistant is currently unavailable.",
        },
        {
          status: 503,
        },
      );
    }

    const response = await fetch(`${ragApiUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(30_000),
    });

    if (!response.ok) {
      console.error("RAG API request failed:", response.status);

      return NextResponse.json(
        {
          error: "AI assistant is currently unavailable.",
        },
        {
          status: 502,
        },
      );
    }

    const data = (await response.json()) as RagApiResponse;

    if (typeof data.answer !== "string" || !data.answer.trim()) {
      console.error("RAG API returned an invalid response.");

      return NextResponse.json(
        {
          error: "AI assistant returned an invalid response.",
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json({
      answer: data.answer.trim(),
    });
  } catch (error) {
    console.error("Portfolio assistant error:", error);

    return NextResponse.json(
      {
        error: "Unable to process your request.",
      },
      {
        status: 500,
      },
    );
  }
}
