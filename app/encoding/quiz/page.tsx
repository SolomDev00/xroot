"use client"

import Link from "next/link"
import { ArrowLeft, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine"

const encodingQuestions: QuizQuestion[] = [
  {
    id: "enc-q1",
    question: "What is the decimal value of the binary number 10110?",
    options: [
      { id: "enc-q1-a", text: "16" },
      { id: "enc-q1-b", text: "22" },
      { id: "enc-q1-c", text: "26" },
      { id: "enc-q1-d", text: "32" },
    ],
    correctOptionId: "enc-q1-b",
    explanation:
      "To convert binary to decimal, multiply each digit by the power of 2 corresponding to its position (from right to left, starting with 2^0): 10110 = 1×2^4 + 0×2^3 + 1×2^2 + 1×2^1 + 0×2^0 = 16 + 0 + 4 + 2 + 0 = 22.",
  },
  {
    id: "enc-q2",
    question: "Which of the following is NOT a purpose of Base64 encoding?",
    options: [
      { id: "enc-q2-a", text: "To represent binary data in ASCII string format" },
      { id: "enc-q2-b", text: "To encrypt sensitive data" },
      { id: "enc-q2-c", text: "To safely transmit binary data over text-based protocols" },
      { id: "enc-q2-d", text: "To embed images in HTML or CSS" },
    ],
    correctOptionId: "enc-q2-b",
    explanation:
      "Base64 is an encoding scheme, not an encryption method. It converts binary data to ASCII text format to ensure safe transmission over text-based protocols, but it provides no security or confidentiality. Anyone can decode Base64 data, as the algorithm is publicly known and no key is required.",
  },
  {
    id: "enc-q3",
    question: "What is the main difference between ASCII and Unicode?",
    options: [
      { id: "enc-q3-a", text: "ASCII is newer than Unicode" },
      { id: "enc-q3-b", text: "ASCII supports more characters than Unicode" },
      { id: "enc-q3-c", text: "Unicode supports a much wider range of characters from different languages" },
      { id: "enc-q3-d", text: "ASCII is used for web applications while Unicode is used for desktop applications" },
    ],
    correctOptionId: "enc-q3-c",
    explanation:
      "The main difference is that ASCII is limited to 128 characters (or 256 in extended ASCII), primarily covering English characters and common symbols. Unicode supports over 140,000 characters covering virtually all of the world's writing systems, including emojis and special symbols.",
  },
  {
    id: "enc-q4",
    question: "What is the hexadecimal representation of the decimal number 255?",
    options: [
      { id: "enc-q4-a", text: "0xFF" },
      { id: "enc-q4-b", text: "0x11111111" },
      { id: "enc-q4-c", text: "0xFFF" },
      { id: "enc-q4-d", text: "0x100" },
    ],
    correctOptionId: "enc-q4-a",
    explanation:
      "The decimal number 255 is represented as FF in hexadecimal. This is because 255 = 15×16^1 + 15×16^0, and in hexadecimal, the digit 15 is represented as 'F'. So 255 in hexadecimal is FF, often written as 0xFF to indicate it's a hexadecimal number.",
  },
  {
    id: "enc-q5",
    question: "Which encoding standard is most commonly used for the web and is backward compatible with ASCII?",
    options: [
      { id: "enc-q5-a", text: "UTF-32" },
      { id: "enc-q5-b", text: "UTF-16" },
      { id: "enc-q5-c", text: "UTF-8" },
      { id: "enc-q5-d", text: "ISO-8859-1" },
    ],
    correctOptionId: "enc-q5-c",
    explanation:
      "UTF-8 is the most widely used encoding standard for the web. It's backward compatible with ASCII (the first 128 characters are identical), uses variable-length encoding (1 to 4 bytes per character), and can represent all Unicode characters. This makes it efficient for English text while still supporting international characters.",
  },
]

export default function EncodingQuizPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center mb-8">
        <Link href="/encoding">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module
          </Button>
        </Link>
        <h1 className="text-3xl font-bold flex items-center">
          <Code className="mr-2 h-6 w-6 text-primary" /> Data Encoding Assessment
        </h1>
      </div>

      <QuizEngine
        title="Data Encoding Quiz"
        description="Test your knowledge of number systems, character encodings, and data representation."
        questions={encodingQuestions}
      />
    </div>
  )
}
