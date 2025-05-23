"use client"

import Link from "next/link"
import { ArrowLeft, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine"

const cryptographyQuestions: QuizQuestion[] = [
  {
    id: "crypto-q1",
    question: "Which of the following is a symmetric encryption algorithm?",
    options: [
      { id: "crypto-q1-a", text: "RSA" },
      { id: "crypto-q1-b", text: "AES" },
      { id: "crypto-q1-c", text: "ECC" },
      { id: "crypto-q1-d", text: "Diffie-Hellman" },
    ],
    correctOptionId: "crypto-q1-b",
    explanation:
      "AES (Advanced Encryption Standard) is a symmetric encryption algorithm, meaning it uses the same key for both encryption and decryption. RSA, ECC, and Diffie-Hellman are asymmetric (public-key) cryptographic algorithms that use different keys for encryption and decryption.",
  },
  {
    id: "crypto-q2",
    question: "What is the primary purpose of a hash function in cryptography?",
    options: [
      { id: "crypto-q2-a", text: "To encrypt data for secure transmission" },
      { id: "crypto-q2-b", text: "To generate random numbers for encryption keys" },
      { id: "crypto-q2-c", text: "To create a fixed-size output from variable-size input data" },
      { id: "crypto-q2-d", text: "To decrypt encrypted messages" },
    ],
    correctOptionId: "crypto-q2-c",
    explanation:
      "Hash functions create a fixed-size output (hash) from variable-size input data. They're one-way functions used for data integrity verification, password storage, and digital signatures. Unlike encryption, hashing is not reversible - you cannot derive the original data from the hash.",
  },
  {
    id: "crypto-q3",
    question: "In the context of password security, what is a 'salt'?",
    options: [
      { id: "crypto-q3-a", text: "A type of encryption algorithm" },
      { id: "crypto-q3-b", text: "Random data added to a password before hashing" },
      { id: "crypto-q3-c", text: "A method to recover forgotten passwords" },
      { id: "crypto-q3-d", text: "A technique to make passwords shorter but more secure" },
    ],
    correctOptionId: "crypto-q3-b",
    explanation:
      "A salt is random data added to a password before hashing. This ensures that even identical passwords will have different hash values, protecting against rainbow table attacks and making it much harder for attackers to crack multiple passwords simultaneously.",
  },
  {
    id: "crypto-q4",
    question: "What is the Caesar cipher?",
    options: [
      { id: "crypto-q4-a", text: "A modern encryption algorithm used in banking" },
      { id: "crypto-q4-b", text: "A simple substitution cipher that shifts letters by a fixed number" },
      { id: "crypto-q4-c", text: "A hash function used for password storage" },
      { id: "crypto-q4-d", text: "A public key encryption method" },
    ],
    correctOptionId: "crypto-q4-b",
    explanation:
      "The Caesar cipher is one of the simplest and oldest encryption techniques. It's a substitution cipher where each letter in the plaintext is shifted a certain number of places down the alphabet. For example, with a shift of 3, 'A' would become 'D', 'B' would become 'E', and so on.",
  },
  {
    id: "crypto-q5",
    question: "What is the main advantage of public key cryptography over symmetric key cryptography?",
    options: [
      { id: "crypto-q5-a", text: "It's faster for encrypting large amounts of data" },
      { id: "crypto-q5-b", text: "It uses less computational resources" },
      { id: "crypto-q5-c", text: "It solves the key distribution problem" },
      { id: "crypto-q5-d", text: "It provides stronger encryption that cannot be broken" },
    ],
    correctOptionId: "crypto-q5-c",
    explanation:
      "Public key cryptography solves the key distribution problem that exists in symmetric cryptography. With symmetric encryption, both parties need to securely share the same secret key. Public key cryptography allows secure communication without requiring a pre-shared secret, as the public key can be freely distributed while the private key remains secret.",
  },
]

export default function CryptographyQuizPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center mb-8">
        <Link href="/cryptography">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module
          </Button>
        </Link>
        <h1 className="text-3xl font-bold flex items-center">
          <Lock className="mr-2 h-6 w-6 text-primary" /> Cryptography Assessment
        </h1>
      </div>

      <QuizEngine
        title="Cryptography Quiz"
        description="Test your knowledge of encryption methods, hashing, and cryptographic concepts."
        questions={cryptographyQuestions}
      />
    </div>
  )
}
