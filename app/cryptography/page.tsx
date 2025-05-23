"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Lock, Key, RefreshCw, AlertCircle, BookOpen, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CryptographyPage() {
  // Caesar Cipher
  const [plaintext, setPlaintext] = useState("Hello World")
  const [shift, setShift] = useState(3)
  const [ciphertext, setCiphertext] = useState("")

  // Password Strength
  const [password, setPassword] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordFeedback, setPasswordFeedback] = useState("")

  // Encryption Method
  const [encryptionInput, setEncryptionInput] = useState("Sensitive data")
  const [encryptionMethod, setEncryptionMethod] = useState("base64")
  const [encryptionOutput, setEncryptionOutput] = useState("")
  const [encryptionTime, setEncryptionTime] = useState(0)

  // Caesar Cipher Logic
  useEffect(() => {
    const encrypted = plaintext
      .split("")
      .map((char) => {
        // Only shift alphabetic characters
        if (/[a-zA-Z]/.test(char)) {
          const code = char.charCodeAt(0)
          const isUpperCase = code >= 65 && code <= 90
          const base = isUpperCase ? 65 : 97
          return String.fromCharCode(((code - base + shift) % 26) + base)
        }
        return char
      })
      .join("")

    setCiphertext(encrypted)
  }, [plaintext, shift])

  // Password Strength Logic
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0)
      setPasswordFeedback("Enter a password")
      return
    }

    let strength = 0
    const feedback = []

    // Length check
    if (password.length >= 8) {
      strength += 20
    } else {
      feedback.push("Password should be at least 8 characters")
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      strength += 20
    } else {
      feedback.push("Add uppercase letters")
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      strength += 20
    } else {
      feedback.push("Add lowercase letters")
    }

    // Number check
    if (/[0-9]/.test(password)) {
      strength += 20
    } else {
      feedback.push("Add numbers")
    }

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 20
    } else {
      feedback.push("Add special characters")
    }

    setPasswordStrength(strength)
    setPasswordFeedback(feedback.length > 0 ? feedback[0] : "Strong password!")
  }, [password])

  // Encryption Method Logic
  const handleEncrypt = () => {
    const startTime = performance.now()

    let result = ""
    switch (encryptionMethod) {
      case "base64":
        result = btoa(encryptionInput)
        break
      case "rot13":
        result = encryptionInput.replace(/[a-zA-Z]/g, (char) =>
          String.fromCharCode((char.charCodeAt(0) + 13 - (char.toLowerCase() < "n" ? 0 : 26)) & 0xff),
        )
        break
      case "reverse":
        result = encryptionInput.split("").reverse().join("")
        break
      default:
        result = encryptionInput
    }

    const endTime = performance.now()
    setEncryptionTime(endTime - startTime)
    setEncryptionOutput(result)
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
          <Lock className="mr-2 h-6 w-6 text-primary" /> Cryptographic Techniques
        </h1>
        <div className="ml-auto flex gap-2">
          <Link href="/password-demo">
            <Button variant="outline" className="flex items-center">
              <Users className="mr-2 h-4 w-4" /> Password Demo
            </Button>
          </Link>
          <Link href="/cryptography/quiz">
            <Button variant="outline" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" /> Take Assessment Quiz
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Caesar Cipher</CardTitle>
            <CardDescription>
              Experiment with one of the simplest and most widely known encryption techniques.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="plaintext">Plaintext</Label>
                <Input
                  id="plaintext"
                  value={plaintext}
                  onChange={(e) => setPlaintext(e.target.value)}
                  placeholder="Enter text to encrypt"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="shift">Shift Value: {shift}</Label>
                </div>
                <Slider
                  id="shift"
                  min={1}
                  max={25}
                  step={1}
                  value={[shift]}
                  onValueChange={(value) => setShift(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ciphertext">Ciphertext</Label>
                <div className="relative">
                  <Input id="ciphertext" value={ciphertext} readOnly className="pr-10" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => {
                      navigator.clipboard.writeText(ciphertext)
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-copy"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </div>

              <div className="pt-2">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>How it works</AlertTitle>
                  <AlertDescription>
                    The Caesar cipher shifts each letter in the plaintext by a fixed number of positions down the
                    alphabet. With a shift of 3, 'A' becomes 'D', 'B' becomes 'E', and so on.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password Strength Analyzer</CardTitle>
            <CardDescription>
              Test the strength of your passwords and learn how to create more secure ones.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a password to analyze"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Strength</Label>
                  <span className="text-sm">
                    {passwordStrength < 40 ? "Weak" : passwordStrength < 80 ? "Medium" : "Strong"}
                  </span>
                </div>
                <Progress
                  value={passwordStrength}
                  className="h-2"
                  style={{
                    backgroundColor:
                      passwordStrength < 40
                        ? "rgb(239, 68, 68)"
                        : passwordStrength < 80
                          ? "rgb(234, 179, 8)"
                          : "rgb(34, 197, 94)",
                  }}
                />
                <p className="text-sm text-muted-foreground">{passwordFeedback}</p>
              </div>

              <div className="pt-2">
                <Alert>
                  <Key className="h-4 w-4" />
                  <AlertTitle>Password Security Tips</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Use at least 12 characters</li>
                      <li>Mix uppercase and lowercase letters</li>
                      <li>Include numbers and special characters</li>
                      <li>Avoid common words and patterns</li>
                      <li>Don't reuse passwords across different sites</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Encryption Method Comparison</CardTitle>
            <CardDescription>
              Compare different encryption methods and understand their characteristics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="encryption-input">Input Text</Label>
                  <Input
                    id="encryption-input"
                    value={encryptionInput}
                    onChange={(e) => setEncryptionInput(e.target.value)}
                    placeholder="Enter text to encrypt"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="encryption-method">Encryption Method</Label>
                  <Select value={encryptionMethod} onValueChange={setEncryptionMethod}>
                    <SelectTrigger id="encryption-method">
                      <SelectValue placeholder="Select encryption method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="base64">Base64 Encoding</SelectItem>
                      <SelectItem value="rot13">ROT13 Cipher</SelectItem>
                      <SelectItem value="reverse">Reverse Text</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleEncrypt} className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" /> Encrypt
                </Button>

                <div className="space-y-2">
                  <Label htmlFor="encryption-output">Output</Label>
                  <div className="relative">
                    <Input id="encryption-output" value={encryptionOutput} readOnly className="pr-10" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => {
                        navigator.clipboard.writeText(encryptionOutput)
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-copy"
                      >
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Processing time: {encryptionTime.toFixed(2)}ms</p>
                </div>
              </div>

              <div>
                <Tabs defaultValue="base64">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="base64">Base64</TabsTrigger>
                    <TabsTrigger value="rot13">ROT13</TabsTrigger>
                    <TabsTrigger value="reverse">Reverse</TabsTrigger>
                  </TabsList>
                  <TabsContent value="base64" className="p-4 border rounded-md mt-4">
                    <h3 className="text-lg font-medium mb-2">Base64 Encoding</h3>
                    <p className="mb-4">
                      Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format
                      by translating it into a radix-64 representation.
                    </p>
                    <h4 className="font-medium mb-2">Characteristics:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Not encryption, but encoding</li>
                      <li>Commonly used for transmitting binary data over text-based protocols</li>
                      <li>Increases data size by approximately 33%</li>
                      <li>Uses A-Z, a-z, 0-9, +, / characters</li>
                    </ul>
                    <h4 className="font-medium mt-4 mb-2">Use Cases:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Email attachments (MIME)</li>
                      <li>Storing complex data in XML or JSON</li>
                      <li>Data URLs in web applications</li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="rot13" className="p-4 border rounded-md mt-4">
                    <h3 className="text-lg font-medium mb-2">ROT13 Cipher</h3>
                    <p className="mb-4">
                      ROT13 (rotate by 13 places) is a simple letter substitution cipher that replaces a letter with the
                      13th letter after it in the alphabet.
                    </p>
                    <h4 className="font-medium mb-2">Characteristics:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Special case of the Caesar cipher</li>
                      <li>Self-inverse: applying ROT13 twice returns the original text</li>
                      <li>Only affects alphabetic characters</li>
                      <li>Provides no real security, used mainly for obscuring text</li>
                    </ul>
                    <h4 className="font-medium mt-4 mb-2">Use Cases:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Hiding spoilers in online forums</li>
                      <li>Obscuring answers to puzzles</li>
                      <li>Educational purposes to demonstrate simple ciphers</li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="reverse" className="p-4 border rounded-md mt-4">
                    <h3 className="text-lg font-medium mb-2">Reverse Text</h3>
                    <p className="mb-4">
                      Reversing text is a simple transformation that writes the characters in reverse order.
                    </p>
                    <h4 className="font-medium mb-2">Characteristics:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Not a true encryption method</li>
                      <li>Very easy to decode by simply reversing again</li>
                      <li>Preserves character frequency distribution</li>
                      <li>No additional characters or size increase</li>
                    </ul>
                    <h4 className="font-medium mt-4 mb-2">Use Cases:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Simple puzzles and games</li>
                      <li>Educational demonstrations</li>
                      <li>Basic text obfuscation</li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
