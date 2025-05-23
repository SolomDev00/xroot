"use client"

import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine"

const systemProtectionQuestions: QuizQuestion[] = [
  {
    id: "sp-q1",
    question: "Which of the following is NOT a type of firewall?",
    options: [
      { id: "sp-q1-a", text: "Packet-filtering firewall" },
      { id: "sp-q1-b", text: "Stateful inspection firewall" },
      { id: "sp-q1-c", text: "Encryption firewall" },
      { id: "sp-q1-d", text: "Next-generation firewall (NGFW)" },
    ],
    correctOptionId: "sp-q1-c",
    explanation:
      "Encryption firewalls don't exist as a specific type. The main types include packet-filtering, stateful inspection, proxy, and next-generation firewalls. Encryption is a security feature that can be implemented alongside firewalls but isn't a firewall type itself.",
  },
  {
    id: "sp-q2",
    question: "What is the principle of least privilege in access control?",
    options: [
      { id: "sp-q2-a", text: "Users should have the minimum permissions necessary to perform their job functions" },
      { id: "sp-q2-b", text: "All users should have equal access to all resources" },
      { id: "sp-q2-c", text: "Only administrators should have access to system resources" },
      { id: "sp-q2-d", text: "Users should be granted all permissions by default" },
    ],
    correctOptionId: "sp-q2-a",
    explanation:
      "The principle of least privilege states that users should be given only the minimum levels of access necessary to complete their job functions. This reduces the attack surface and limits potential damage from compromised accounts.",
  },
  {
    id: "sp-q3",
    question: "Which of the following best describes an Intrusion Detection System (IDS)?",
    options: [
      { id: "sp-q3-a", text: "A system that blocks all incoming network traffic" },
      {
        id: "sp-q3-b",
        text: "A system that monitors network traffic for suspicious activity and alerts administrators",
      },
      { id: "sp-q3-c", text: "A system that encrypts all network communications" },
      { id: "sp-q3-d", text: "A system that authenticates users before allowing access" },
    ],
    correctOptionId: "sp-q3-b",
    explanation:
      "An Intrusion Detection System (IDS) monitors network traffic for suspicious activity and policy violations, alerting administrators when potential threats are detected. Unlike an Intrusion Prevention System (IPS), it doesn't automatically block traffic.",
  },
  {
    id: "sp-q4",
    question: "What is the main difference between RBAC and ABAC access control models?",
    options: [
      { id: "sp-q4-a", text: "RBAC uses roles while ABAC uses attributes for access decisions" },
      { id: "sp-q4-b", text: "RBAC is more secure than ABAC" },
      { id: "sp-q4-c", text: "ABAC can only be implemented in cloud environments" },
      { id: "sp-q4-d", text: "RBAC is a newer technology than ABAC" },
    ],
    correctOptionId: "sp-q4-a",
    explanation:
      "Role-Based Access Control (RBAC) grants permissions based on predefined roles assigned to users. Attribute-Based Access Control (ABAC) makes access decisions based on attributes of users, resources, actions, and environment. ABAC is more flexible but more complex to implement.",
  },
  {
    id: "sp-q5",
    question: "Which security measure helps protect against SQL injection attacks?",
    options: [
      { id: "sp-q5-a", text: "Firewall configuration" },
      { id: "sp-q5-b", text: "Input validation and parameterized queries" },
      { id: "sp-q5-c", text: "Strong password policies" },
      { id: "sp-q5-d", text: "Regular system updates" },
    ],
    correctOptionId: "sp-q5-b",
    explanation:
      "Input validation and parameterized queries are the most effective defenses against SQL injection attacks. They ensure that user input is properly sanitized and treated as data rather than executable code, preventing attackers from manipulating database queries.",
  },
]

export default function SystemProtectionQuizPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center mb-8">
        <Link href="/system-protection">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module
          </Button>
        </Link>
        <h1 className="text-3xl font-bold flex items-center">
          <Shield className="mr-2 h-6 w-6 text-primary" /> System Protection Assessment
        </h1>
      </div>

      <QuizEngine
        title="System Protection Quiz"
        description="Test your knowledge of firewalls, access control, and intrusion detection systems."
        questions={systemProtectionQuestions}
      />
    </div>
  )
}
