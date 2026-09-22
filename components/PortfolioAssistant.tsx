"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, LoaderCircle, Send, Sparkles, User, X } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
}

interface AssistantResponse {
  answer?: string;
  error?: string;
}

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm **Rafay AI**, Muhammad Rafay's portfolio assistant. Ask me about his **skills, projects, education, or professional experience**.",
};

const SUGGESTED_QUESTIONS = [
  "What technologies does Rafay know?",
  "Tell me about NutriSmart.",
  "What experience does Rafay have?",
];

const MAX_QUESTION_LENGTH = 500;

const RATE_LIMIT_MESSAGE =
  "You've reached the message limit for the moment. Please wait a little and try again.";

const TEMPORARY_ERROR_MESSAGE =
  "I couldn't reach the portfolio assistant right now. Please try again in a moment.";

function createMessageId(): string {
  return crypto.randomUUID();
}

function createAssistantMessage(content: string): Message {
  return {
    id: createMessageId(),
    role: "assistant",
    content,
  };
}

export default function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading, isOpen]);

  async function sendQuestion(question: string) {
    const trimmedQuestion = question.trim();

    if (
      !trimmedQuestion ||
      isLoading ||
      trimmedQuestion.length > MAX_QUESTION_LENGTH
    ) {
      return;
    }

    const userMessage: Message = {
      id: createMessageId(),
      role: "user",
      content: trimmedQuestion,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);

    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmedQuestion,
        }),
      });

      let data: AssistantResponse;

      try {
        data = (await response.json()) as AssistantResponse;
      } catch {
        data = {};
      }

      /*
       * Rate limit response.
       *
       * The API route returns HTTP 429 when the visitor
       * exceeds the allowed number of requests.
       */
      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");

        const rateLimitContent = retryAfter
          ? `You've reached the message limit for the moment. Please try again in about **${retryAfter} seconds**.`
          : RATE_LIMIT_MESSAGE;

        setMessages((currentMessages) => [
          ...currentMessages,
          createAssistantMessage(rateLimitContent),
        ]);

        return;
      }

      /*
       * Other API errors.
       *
       * We intentionally avoid displaying raw backend errors
       * unless they contain a safe user-facing message.
       */
      if (!response.ok) {
        console.error(
          "Portfolio assistant request failed:",
          response.status,
          data.error,
        );

        setMessages((currentMessages) => [
          ...currentMessages,
          createAssistantMessage(data.error?.trim() || TEMPORARY_ERROR_MESSAGE),
        ]);

        return;
      }

      if (!data.answer?.trim()) {
        console.error("Portfolio assistant returned an empty response.");

        setMessages((currentMessages) => [
          ...currentMessages,
          createAssistantMessage(TEMPORARY_ERROR_MESSAGE),
        ]);

        return;
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        createAssistantMessage(data.answer!.trim()),
      ]);
    } catch (error) {
      /*
       * This normally represents a network failure rather
       * than an error returned by the assistant API itself.
       */
      console.error("Portfolio assistant network error:", error);

      setMessages((currentMessages) => [
        ...currentMessages,
        createAssistantMessage(TEMPORARY_ERROR_MESSAGE),
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    void sendQuestion(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      void sendQuestion(input);
    }
  }

  const remainingCharacters = MAX_QUESTION_LENGTH - input.length;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{
              opacity: 0,
              y: 24,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 18,
              scale: 0.97,
            }}
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
            className="
              fixed bottom-24 right-3 z-50
              flex
              h-[min(620px,calc(100dvh-7rem))]
              w-[calc(100vw-1.5rem)]
              max-w-[410px]
              flex-col overflow-hidden
              rounded-2xl
              border border-slate-700/70
              bg-slate-950/95
              shadow-2xl shadow-black/50
              backdrop-blur-xl
              sm:right-6 sm:w-[400px]
            "
            aria-label="Rafay AI portfolio assistant"
          >
            {/* Decorative top glow */}
            <div
              className="
                pointer-events-none
                absolute inset-x-10 top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-teal-400/80
                to-transparent
              "
            />

            {/* Header */}
            <header
              className="
                relative
                flex items-center justify-between
                border-b border-slate-800
                bg-slate-900/80
                px-4 py-3
              "
            >
              <div className="flex min-w-0 items-center gap-3">
                {/* Header bot avatar */}
                <div
                  className="
                    relative flex
                    size-10 shrink-0
                    items-center justify-center
                  "
                >
                  <div
                    className="
                      absolute inset-0
                      rounded-xl
                      bg-teal-400/20
                      blur-md
                    "
                  />

                  <div
                    className="
                      relative flex
                      size-10
                      items-center justify-center
                      rounded-xl
                      border border-teal-400/20
                      bg-gradient-to-br
                      from-teal-400/15
                      via-cyan-400/10
                      to-violet-500/15
                    "
                  >
                    <Bot className="size-5 text-teal-300" aria-hidden="true" />
                  </div>

                  <span
                    className="
                      absolute
                      -bottom-0.5 -right-0.5
                      size-3
                      rounded-full
                      border-2 border-slate-900
                      bg-teal-400
                      shadow-[0_0_8px_rgba(45,212,191,0.9)]
                    "
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2
                      className="
                        truncate
                        text-sm font-semibold
                        text-slate-100
                      "
                    >
                      Rafay AI
                    </h2>

                    <span
                      className="
                        inline-flex
                        items-center gap-1.5
                        rounded-full
                        border border-teal-400/10
                        bg-teal-400/5
                        px-1.5 py-0.5
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-teal-300
                      "
                    >
                      <span
                        className="
                          size-1.5
                          rounded-full
                          bg-teal-400
                          shadow-[0_0_6px_rgba(45,212,191,0.9)]
                        "
                      />
                      Online
                    </span>
                  </div>

                  <p
                    className="
                      mt-0.5
                      truncate
                      text-[11px]
                      text-slate-400
                    "
                  >
                    AI portfolio assistant
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="
                  rounded-lg
                  p-2
                  text-slate-500
                  transition-all duration-200
                  hover:bg-slate-800
                  hover:text-slate-100
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-teal-400
                "
                aria-label="Close Rafay AI"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </header>

            {/* Messages */}
            <div
              className="
                flex-1
                space-y-4
                overflow-y-auto
                px-4 py-4
                [scrollbar-color:rgb(51_65_85)_transparent]
                [scrollbar-width:thin]
              "
              aria-live="polite"
            >
              {messages.map((message) => {
                const isAssistant = message.role === "assistant";

                return (
                  <motion.div
                    key={message.id}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className={`flex gap-2.5 ${
                      isAssistant ? "justify-start" : "justify-end"
                    }`}
                  >
                    {isAssistant && (
                      <div
                        className="
                          mt-1
                          flex size-7
                          shrink-0
                          items-center justify-center
                          rounded-lg
                          border border-teal-400/10
                          bg-teal-400/10
                        "
                      >
                        <Bot
                          className="size-4 text-teal-300"
                          aria-hidden="true"
                        />
                      </div>
                    )}

                    <div
                      className={`
                        max-w-[82%]
                        rounded-2xl
                        px-3.5 py-2.5
                        text-sm leading-6
                        ${
                          isAssistant
                            ? `
                              rounded-tl-md
                              border border-slate-800
                              bg-slate-900
                              text-slate-300
                              shadow-sm shadow-black/20
                            `
                            : `
                              rounded-tr-md
                              bg-gradient-to-br
                              from-teal-400
                              to-cyan-500
                              font-medium
                              text-slate-950
                              shadow-md shadow-teal-950/20
                            `
                        }
                      `}
                    >
                      {isAssistant ? (
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <p className="mb-2 last:mb-0">{children}</p>
                            ),

                            strong: ({ children }) => (
                              <strong
                                className="
                                  font-semibold
                                  text-slate-100
                                "
                              >
                                {children}
                              </strong>
                            ),

                            ul: ({ children }) => (
                              <ul
                                className="
                                  my-2
                                  list-disc
                                  space-y-1
                                  pl-4
                                "
                              >
                                {children}
                              </ul>
                            ),

                            ol: ({ children }) => (
                              <ol
                                className="
                                  my-2
                                  list-decimal
                                  space-y-1
                                  pl-4
                                "
                              >
                                {children}
                              </ol>
                            ),

                            li: ({ children }) => (
                              <li className="pl-0.5">{children}</li>
                            ),

                            code: ({ children }) => (
                              <code
                                className="
                                  rounded
                                  bg-slate-800
                                  px-1.5 py-0.5
                                  font-mono
                                  text-xs
                                  text-teal-300
                                "
                              >
                                {children}
                              </code>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>

                    {!isAssistant && (
                      <div
                        className="
                          mt-1
                          flex size-7
                          shrink-0
                          items-center justify-center
                          rounded-lg
                          border border-violet-400/10
                          bg-violet-400/10
                        "
                      >
                        <User
                          className="size-4 text-violet-300"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Thinking indicator */}
              {isLoading && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    flex
                    items-start
                    gap-2.5
                  "
                >
                  <div
                    className="
                      mt-1
                      flex size-7
                      items-center justify-center
                      rounded-lg
                      border border-teal-400/10
                      bg-teal-400/10
                    "
                  >
                    <Bot className="size-4 text-teal-300" aria-hidden="true" />
                  </div>

                  <div
                    className="
                      flex
                      items-center gap-2
                      rounded-2xl
                      rounded-tl-md
                      border border-slate-800
                      bg-slate-900
                      px-4 py-3
                      text-sm
                      text-slate-400
                    "
                  >
                    <LoaderCircle
                      className="
                        size-4
                        animate-spin
                        text-teal-300
                      "
                      aria-hidden="true"
                    />

                    <span>Rafay AI is thinking...</span>
                  </div>
                </motion.div>
              )}

              {/* Suggested questions */}
              {messages.length === 1 && (
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.15,
                  }}
                  className="space-y-2.5 pt-1"
                >
                  <div className="flex items-center gap-1.5">
                    <Sparkles
                      className="size-3 text-violet-400"
                      aria-hidden="true"
                    />

                    <p
                      className="
                        text-[11px]
                        font-medium
                        uppercase
                        tracking-wider
                        text-slate-500
                      "
                    >
                      Try asking
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((question) => (
                      <button
                        key={question}
                        type="button"
                        disabled={isLoading}
                        onClick={() => {
                          void sendQuestion(question);
                        }}
                        className="
                          rounded-full
                          border border-slate-700
                          bg-slate-900/80
                          px-3 py-1.5
                          text-left
                          text-xs
                          text-slate-300
                          transition-all duration-200
                          hover:-translate-y-0.5
                          hover:border-teal-400/40
                          hover:bg-teal-400/5
                          hover:text-teal-200
                          hover:shadow-md
                          hover:shadow-teal-950/30
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="
                border-t border-slate-800
                bg-slate-950/95
                p-3
              "
            >
              <div
                className="
                  flex
                  items-end gap-2
                  rounded-xl
                  border border-slate-700
                  bg-slate-900
                  px-3 py-2
                  transition-all duration-200
                  focus-within:border-teal-400/60
                  focus-within:shadow-[0_0_0_3px_rgba(45,212,191,0.06)]
                "
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value.slice(0, MAX_QUESTION_LENGTH));
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Rafay AI..."
                  rows={1}
                  disabled={isLoading}
                  className="
                    max-h-28
                    min-h-8
                    flex-1
                    resize-none
                    bg-transparent
                    py-1
                    text-sm
                    text-slate-100
                    outline-none
                    placeholder:text-slate-500
                    disabled:cursor-not-allowed
                  "
                  aria-label="Ask Rafay AI a question"
                />

                <motion.button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  whileHover={
                    input.trim() && !isLoading
                      ? {
                          scale: 1.06,
                        }
                      : undefined
                  }
                  whileTap={
                    input.trim() && !isLoading
                      ? {
                          scale: 0.94,
                        }
                      : undefined
                  }
                  className="
                    flex size-9
                    shrink-0
                    items-center justify-center
                    rounded-lg
                    bg-gradient-to-br
                    from-teal-400
                    to-cyan-500
                    text-slate-950
                    shadow-md
                    shadow-teal-500/10
                    transition-opacity
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                  aria-label="Send question"
                >
                  {isLoading ? (
                    <LoaderCircle
                      className="size-4 animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <Send className="size-4" aria-hidden="true" />
                  )}
                </motion.button>
              </div>

              <div
                className="
                  mt-2
                  flex
                  items-center justify-between
                  px-1
                  text-[10px]
                  text-slate-600
                "
              >
                <span className="flex items-center gap-1">
                  <Sparkles className="size-2.5" aria-hidden="true" />
                  Answers grounded in Rafay&apos;s portfolio
                </span>

                <span
                  className={
                    remainingCharacters < 50 ? "text-amber-400" : undefined
                  }
                >
                  {remainingCharacters}
                </span>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Floating AI launcher */}
      <div
        className="
          fixed
          bottom-5 right-4
          z-50
          flex
          items-center gap-3
          sm:right-6
        "
      >
        {/* Rafay AI text label */}
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              type="button"
              onClick={() => setIsOpen(true)}
              initial={{
                opacity: 0,
                x: 12,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: 10,
                scale: 0.96,
              }}
              whileHover={{
                y: -2,
              }}
              className="
                hidden
                items-center gap-2
                rounded-full
                border border-slate-700/80
                bg-slate-900/95
                px-4 py-2.5
                shadow-xl shadow-black/30
                backdrop-blur-xl
                transition-colors
                hover:border-teal-400/30
                sm:flex
              "
              aria-label="Open Rafay AI assistant"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="
                      text-xs
                      font-semibold
                      text-slate-100
                    "
                  >
                    Ask Rafay AI
                  </span>

                  <span
                    className="
                      size-1.5
                      rounded-full
                      bg-teal-400
                      shadow-[0_0_6px_rgba(45,212,191,0.9)]
                    "
                  />
                </div>

                <p className="mt-0.5 text-[9px] text-slate-500">
                  Portfolio assistant
                </p>
              </div>

              <Sparkles
                className="size-3.5 text-violet-400"
                aria-hidden="true"
              />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Main glowing bot button */}
        <div className="relative">
          {!isOpen && (
            <>
              <motion.span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute -inset-2
                  rounded-full
                  border border-teal-400/25
                "
                animate={{
                  scale: [1, 1.16, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute -inset-3
                  rounded-full
                  bg-gradient-to-br
                  from-teal-400/25
                  to-violet-500/25
                  blur-xl
                "
              />
            </>
          )}

          <motion.button
            type="button"
            onClick={() => {
              setIsOpen((current) => !current);
            }}
            whileHover={{
              scale: 1.08,
              y: -2,
            }}
            whileTap={{
              scale: 0.92,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            className="
              relative
              flex size-14
              items-center justify-center
              overflow-hidden
              rounded-full
              border border-white/20
              bg-gradient-to-br
              from-teal-400
              via-cyan-400
              to-violet-500
              text-slate-950
              shadow-[0_0_24px_rgba(45,212,191,0.35)]
              outline-none
              transition-shadow
              hover:shadow-[0_0_32px_rgba(45,212,191,0.55)]
              focus-visible:ring-2
              focus-visible:ring-teal-300
              focus-visible:ring-offset-2
              focus-visible:ring-offset-slate-950
            "
            aria-label={
              isOpen ? "Close Rafay AI assistant" : "Open Rafay AI assistant"
            }
            aria-expanded={isOpen}
          >
            {/* Subtle highlight */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-x-2 top-1
                h-px
                bg-white/50
                blur-[1px]
              "
            />

            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  transition={{
                    duration: 0.15,
                  }}
                >
                  <X className="size-6" aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="bot"
                  initial={{
                    opacity: 0,
                    scale: 0.6,
                    rotate: -10,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.6,
                    rotate: 10,
                  }}
                  transition={{
                    duration: 0.18,
                  }}
                  className="
                    relative
                    flex
                    items-center justify-center
                  "
                >
                  <Bot
                    className="size-7 drop-shadow-sm"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />

                  <span
                    className="
                      absolute
                      -right-1 -top-1
                      size-2
                      rounded-full
                      border border-white/70
                      bg-white
                      shadow-[0_0_7px_rgba(255,255,255,0.9)]
                    "
                  />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </>
  );
}
