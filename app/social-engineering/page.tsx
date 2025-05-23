"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Users, Phone, Mail, Building, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Scenario {
  id: string
  title: string
  type: "email" | "phone" | "physical" | "social_media"
  description: string
  content: string
  choices: Array<{
    id: string
    text: string
    isCorrect: boolean
    explanation: string
    consequence: string
  }>
  redFlags: string[]
  learningPoints: string[]
}

const scenarios: Scenario[] = [
  {
    id: "phishing-email",
    title: "Suspicious Email from IT Department",
    type: "email",
    description: "You receive an urgent email claiming to be from your IT department.",
    content: `From: IT-Support@company-security.com
To: you@company.com
Subject: URGENT: Account Security Verification Required

Dear Employee,

We have detected suspicious activity on your account. Your password may have been compromised. 

To secure your account, please click the link below and verify your credentials immediately:
http://company-security-verification.net/login

Failure to verify within 24 hours will result in account suspension.

Best regards,
IT Security Team
Company Inc.`,
    choices: [
      {
        id: "click-link",
        text: "Click the link and enter my credentials",
        isCorrect: false,
        explanation: "This is a phishing attempt. The domain doesn't match your company's official domain.",
        consequence: "Your credentials would be stolen and your account compromised.",
      },
      {
        id: "forward-colleagues",
        text: "Forward the email to colleagues to warn them",
        isCorrect: false,
        explanation: "Forwarding phishing emails spreads the attack and could compromise more accounts.",
        consequence: "You would help the attackers reach more potential victims.",
      },
      {
        id: "contact-it",
        text: "Contact IT department directly through official channels",
        isCorrect: true,
        explanation: "Always verify suspicious communications through official channels.",
        consequence: "IT confirms this is a phishing attempt and thanks you for reporting it.",
      },
      {
        id: "ignore-email",
        text: "Ignore the email completely",
        isCorrect: false,
        explanation: "While not clicking is good, you should report phishing attempts to help protect others.",
        consequence: "The attack continues to target other employees who might fall for it.",
      },
    ],
    redFlags: [
      "External domain (company-security.com vs company.com)",
      "Urgent language creating pressure",
      "Generic greeting ('Dear Employee')",
      "Suspicious URL with different domain",
      "Threatening consequences for non-compliance",
    ],
    learningPoints: [
      "Always verify the sender's email domain",
      "Be suspicious of urgent requests for credentials",
      "Use official communication channels to verify requests",
      "Report phishing attempts to your security team",
      "Never click suspicious links or download attachments",
    ],
  },
  {
    id: "phone-pretexting",
    title: "Phone Call from 'Bank Security'",
    type: "phone",
    description: "You receive a phone call from someone claiming to be from your bank's security department.",
    content: `Caller: "Hello, this is Sarah from First National Bank Security Department. We've detected some unusual activity on your account ending in 4567. For your security, I need to verify some information with you."

"Can you please confirm your full account number and the security code on the back of your card? We need to verify this is really you before we can discuss the suspicious transactions."

"I see here that someone tried to make a $500 purchase in another state. We've temporarily frozen your account, but I can unlock it right now if you can verify your information."

The caller sounds professional and knows the last 4 digits of your account number.`,
    choices: [
      {
        id: "provide-info",
        text: "Provide the requested account information",
        isCorrect: false,
        explanation: "Banks never ask for full account numbers or security codes over the phone.",
        consequence: "The scammer now has your complete banking information and can access your account.",
      },
      {
        id: "hang-up-call-bank",
        text: "Hang up and call the bank directly using the number on your card",
        isCorrect: true,
        explanation: "Always verify by calling the official number, not the number the caller provides.",
        consequence: "The bank confirms no suspicious activity and no calls were made from their security department.",
      },
      {
        id: "ask-callback",
        text: "Ask them to call back later when you're available",
        isCorrect: false,
        explanation: "This doesn't solve the problem - the caller is still a scammer who will try again.",
        consequence: "The scammer calls back and may try different tactics or target someone else.",
      },
      {
        id: "partial-info",
        text: "Only provide partial information to 'verify' it's really the bank",
        isCorrect: false,
        explanation:
          "Any information given to scammers can be used against you or to make future attacks more convincing.",
        consequence: "Even partial information helps the scammer appear more legitimate in future attempts.",
      },
    ],
    redFlags: [
      "Unsolicited call about account security",
      "Requesting sensitive information over the phone",
      "Creating urgency with 'frozen account' claims",
      "Asking for security codes that banks never request",
      "Pressure to act immediately",
    ],
    learningPoints: [
      "Banks never ask for complete account numbers or security codes",
      "Always hang up and call the official number",
      "Be suspicious of unsolicited security calls",
      "Verify the caller's identity through official channels",
      "Don't provide any information to unexpected callers",
    ],
  },
  {
    id: "physical-tailgating",
    title: "Stranger Following You Into the Building",
    type: "physical",
    description: "You're entering your secure office building when someone approaches behind you.",
    content: `You badge into your company's secure office building. As the door opens, a well-dressed person carrying a laptop bag and coffee approaches quickly behind you.

Person: "Oh perfect timing! Thanks for holding the door. I'm here for the 2 PM meeting with Sarah in Marketing. I'm running a bit late and my temporary badge isn't working properly."

They seem professional, mention a specific person and time, and appear to belong in the office environment. They're dressed appropriately and carrying business materials.

The person is now standing right behind you as you hold the door open, waiting for you to let them in.`,
    choices: [
      {
        id: "let-them-in",
        text: "Hold the door open and let them follow you in",
        isCorrect: false,
        explanation: "This is called 'tailgating' - a common physical security breach technique.",
        consequence:
          "You've allowed an unauthorized person into a secure area who could steal information or plant malware.",
      },
      {
        id: "ask-for-badge",
        text: "Politely ask them to use their own badge or get a visitor pass",
        isCorrect: true,
        explanation:
          "Everyone should use their own credentials to enter secure areas, regardless of how legitimate they seem.",
        consequence:
          "The person becomes defensive and leaves, revealing they were likely attempting unauthorized access.",
      },
      {
        id: "escort-to-reception",
        text: "Offer to escort them to reception to get a visitor badge",
        isCorrect: true,
        explanation: "This is helpful while maintaining security protocols.",
        consequence: "Reception has no record of a meeting, confirming this was a social engineering attempt.",
      },
      {
        id: "call-sarah",
        text: "Offer to call Sarah to confirm the meeting",
        isCorrect: true,
        explanation: "Verifying the claimed meeting is a good security practice.",
        consequence: "Sarah confirms no meeting was scheduled, and security is notified of the attempt.",
      },
    ],
    redFlags: [
      "Requesting access without proper credentials",
      "Creating a plausible story with specific details",
      "Appearing professional to blend in",
      "Claiming technical issues with their badge",
      "Using time pressure ('running late')",
    ],
    learningPoints: [
      "Never let unauthorized people into secure areas",
      "Everyone must use their own credentials",
      "Verify claimed meetings or appointments",
      "Direct visitors to proper check-in procedures",
      "Report suspicious access attempts to security",
    ],
  },
  {
    id: "social-media-recon",
    title: "Suspicious Social Media Connection",
    type: "social_media",
    description: "You receive a connection request on LinkedIn from someone claiming to work at your company.",
    content: `You receive a LinkedIn connection request from "Alex Johnson" with the message:

"Hi! I'm Alex Johnson, the new IT Security Specialist at [Your Company]. I'm reaching out to connect with colleagues across different departments. I noticed we have several mutual connections.

I'm working on a company-wide security assessment and would love to chat about your department's current security practices. Would you be available for a quick coffee chat this week?

Looking forward to connecting!
Best,
Alex"

The profile shows:
- Professional headshot photo
- Claims to work at your company in IT Security
- Has 500+ connections
- Several mutual connections with your coworkers
- Recent posts about cybersecurity topics`,
    choices: [
      {
        id: "accept-and-meet",
        text: "Accept the connection and agree to meet for coffee",
        isCorrect: false,
        explanation: "This could be a social engineer gathering information about your company's security practices.",
        consequence:
          "During the meeting, they extract sensitive information about your security procedures and systems.",
      },
      {
        id: "verify-with-hr",
        text: "Check with HR or IT department to verify this person works there",
        isCorrect: true,
        explanation: "Always verify new employee claims through official channels.",
        consequence:
          "HR confirms no Alex Johnson was hired in IT Security, revealing this as a social engineering attempt.",
      },
      {
        id: "accept-but-no-meeting",
        text: "Accept the connection but decline the meeting",
        isCorrect: false,
        explanation: "Accepting the connection still gives them access to your network and information.",
        consequence: "They gain access to your connections and company information visible on your profile.",
      },
      {
        id: "ignore-request",
        text: "Ignore the connection request",
        isCorrect: false,
        explanation: "While safe, reporting suspicious profiles helps protect others.",
        consequence: "The fake profile continues to target other employees who might be less cautious.",
      },
    ],
    redFlags: [
      "Unsolicited connection from 'new employee'",
      "Requesting information about security practices",
      "Pushing for in-person meeting quickly",
      "Generic professional appearance",
      "Mentioning mutual connections to build trust",
    ],
    learningPoints: [
      "Verify new employee claims through official channels",
      "Be cautious about sharing security information",
      "Report suspicious profiles to your security team",
      "Don't accept connections from unverified colleagues",
      "Social engineers often impersonate employees",
    ],
  },
]

export default function SocialEngineeringPage() {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [completedScenarios, setCompletedScenarios] = useState<Set<string>>(new Set())
  const [score, setScore] = useState(0)

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId)
    setShowResult(true)

    if (currentScenario) {
      const choice = currentScenario.choices.find((c) => c.id === choiceId)
      if (choice?.isCorrect) {
        setScore((prev) => prev + 1)
      }
      setCompletedScenarios((prev) => new Set([...prev, currentScenario.id]))
    }
  }

  const resetScenario = () => {
    setSelectedChoice(null)
    setShowResult(false)
  }

  const startScenario = (scenario: Scenario) => {
    setCurrentScenario(scenario)
    resetScenario()
  }

  const getScenarioIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-5 w-5" />
      case "phone":
        return <Phone className="h-5 w-5" />
      case "physical":
        return <Building className="h-5 w-5" />
      case "social_media":
        return <Users className="h-5 w-5" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "email":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "phone":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "physical":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "social_media":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  if (currentScenario) {
    return (
      <div className="container py-8">
        <div className="flex items-center mb-8">
          <Button variant="outline" size="sm" className="mr-4" onClick={() => setCurrentScenario(null)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Scenarios
          </Button>
          <h1 className="text-2xl font-bold">{currentScenario.title}</h1>
          <Badge className={`ml-4 ${getTypeColor(currentScenario.type)}`}>
            {getScenarioIcon(currentScenario.type)}
            <span className="ml-1 capitalize">{currentScenario.type.replace("_", " ")}</span>
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Scenario</CardTitle>
                <CardDescription>{currentScenario.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm whitespace-pre-wrap mb-6">
                  {currentScenario.content}
                </div>

                <h3 className="text-lg font-medium mb-4">What would you do?</h3>

                <div className="space-y-3">
                  {currentScenario.choices.map((choice) => (
                    <motion.div key={choice.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant={selectedChoice === choice.id ? "default" : "outline"}
                        className="w-full text-left justify-start h-auto p-4"
                        onClick={() => handleChoiceSelect(choice.id)}
                        disabled={showResult}
                      >
                        <div className="flex items-start gap-3">
                          {showResult && (
                            <div className="mt-1">
                              {choice.isCorrect ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : selectedChoice === choice.id ? (
                                <XCircle className="h-5 w-5 text-red-500" />
                              ) : null}
                            </div>
                          )}
                          <span>{choice.text}</span>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <AnimatePresence>
                  {showResult && selectedChoice && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6"
                    >
                      {(() => {
                        const choice = currentScenario.choices.find((c) => c.id === selectedChoice)
                        if (!choice) return null

                        return (
                          <Alert
                            className={
                              choice.isCorrect
                                ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
                                : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20"
                            }
                          >
                            {choice.isCorrect ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <AlertTitle
                              className={
                                choice.isCorrect
                                  ? "text-green-700 dark:text-green-400"
                                  : "text-red-700 dark:text-red-400"
                              }
                            >
                              {choice.isCorrect ? "Correct Choice!" : "Incorrect Choice"}
                            </AlertTitle>
                            <AlertDescription
                              className={
                                choice.isCorrect
                                  ? "text-green-600 dark:text-green-300"
                                  : "text-red-600 dark:text-red-300"
                              }
                            >
                              <p className="mb-2">
                                <strong>Explanation:</strong> {choice.explanation}
                              </p>
                              <p>
                                <strong>Consequence:</strong> {choice.consequence}
                              </p>
                            </AlertDescription>
                          </Alert>
                        )
                      })()}

                      <div className="flex gap-2 mt-4">
                        <Button onClick={resetScenario} variant="outline">
                          Try Again
                        </Button>
                        <Button onClick={() => setCurrentScenario(null)}>Back to Scenarios</Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600 dark:text-red-400">Red Flags</CardTitle>
                <CardDescription>Warning signs to watch for</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {currentScenario.redFlags.map((flag, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{flag}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-600 dark:text-green-400">Learning Points</CardTitle>
                <CardDescription>Key takeaways from this scenario</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {currentScenario.learningPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold flex items-center">
          <Users className="mr-2 h-6 w-6 text-primary" /> Social Engineering Simulation
        </h1>
      </div>

      <Alert className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
        <AlertTriangle className="h-4 w-4 text-blue-500" />
        <AlertTitle className="text-blue-700 dark:text-blue-400">Safe Learning Environment</AlertTitle>
        <AlertDescription className="text-blue-600 dark:text-blue-300">
          These simulations are designed to teach you about social engineering techniques in a safe environment.
          Practice identifying and responding to common attack scenarios.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Track your learning across different social engineering scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span>Scenarios Completed</span>
              <span>
                {completedScenarios.size} / {scenarios.length}
              </span>
            </div>
            <Progress value={(completedScenarios.size / scenarios.length) * 100} className="mb-4" />

            <div className="flex items-center justify-between">
              <span>Correct Responses</span>
              <span>
                {score} / {completedScenarios.size}
              </span>
            </div>
            <Progress value={completedScenarios.size > 0 ? (score / completedScenarios.size) * 100 : 0} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {scenarios.map((scenario) => (
          <motion.div key={scenario.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="cursor-pointer h-full" onClick={() => startScenario(scenario)}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {getScenarioIcon(scenario.type)}
                    {scenario.title}
                  </CardTitle>
                  {completedScenarios.has(scenario.id) && <CheckCircle className="h-5 w-5 text-green-500" />}
                </div>
                <div className="flex gap-2">
                  <Badge className={getTypeColor(scenario.type)}>{scenario.type.replace("_", " ")}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{scenario.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>About Social Engineering</CardTitle>
          <CardDescription>Understanding the human element of cybersecurity</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="techniques">Techniques</TabsTrigger>
              <TabsTrigger value="prevention">Prevention</TabsTrigger>
              <TabsTrigger value="reporting">Reporting</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="space-y-4">
                <p>
                  Social engineering is the art of manipulating people to divulge confidential information or perform
                  actions that compromise security. It exploits human psychology rather than technical vulnerabilities.
                </p>
                <h4 className="font-medium">Why Social Engineering Works:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Exploits natural human tendencies to trust and help others</li>
                  <li>Creates artificial urgency and pressure</li>
                  <li>Uses authority and social proof to influence decisions</li>
                  <li>Leverages publicly available information to appear legitimate</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="techniques" className="mt-4">
              <div className="space-y-4">
                <h4 className="font-medium">Common Social Engineering Techniques:</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h5 className="font-medium text-blue-600 dark:text-blue-400">Phishing</h5>
                    <p className="text-sm text-muted-foreground">
                      Fraudulent emails designed to steal credentials or install malware
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-600 dark:text-green-400">Pretexting</h5>
                    <p className="text-sm text-muted-foreground">
                      Creating fake scenarios to extract information over phone or in person
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-600 dark:text-purple-400">Tailgating</h5>
                    <p className="text-sm text-muted-foreground">
                      Following authorized personnel into secure areas without proper access
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-orange-600 dark:text-orange-400">Baiting</h5>
                    <p className="text-sm text-muted-foreground">
                      Offering something enticing to spark curiosity and prompt unsafe actions
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="prevention" className="mt-4">
              <div className="space-y-4">
                <h4 className="font-medium">How to Protect Yourself:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Verify Identity:</strong> Always confirm the identity of people requesting information
                    through official channels
                  </li>
                  <li>
                    <strong>Be Skeptical:</strong> Question unexpected requests, especially those creating urgency or
                    pressure
                  </li>
                  <li>
                    <strong>Limit Information Sharing:</strong> Be cautious about what you share on social media and in
                    public
                  </li>
                  <li>
                    <strong>Follow Policies:</strong> Adhere to your organization's security policies and procedures
                  </li>
                  <li>
                    <strong>Stay Informed:</strong> Keep up with current social engineering tactics and trends
                  </li>
                  <li>
                    <strong>Trust Your Instincts:</strong> If something feels wrong, investigate further before acting
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="reporting" className="mt-4">
              <div className="space-y-4">
                <h4 className="font-medium">When and How to Report:</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-red-600 dark:text-red-400">Report Immediately If:</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>You receive suspicious emails or phone calls</li>
                      <li>Someone attempts unauthorized physical access</li>
                      <li>You accidentally provided information to a potential attacker</li>
                      <li>You notice unusual activity on your accounts</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-600 dark:text-green-400">How to Report:</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Contact your IT security team immediately</li>
                      <li>Forward suspicious emails to your security team</li>
                      <li>Document the incident with as much detail as possible</li>
                      <li>Don't be embarrassed - reporting helps protect everyone</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
