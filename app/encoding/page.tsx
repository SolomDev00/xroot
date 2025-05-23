"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Code, Copy, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function EncodingPage() {
  // ASCII/Unicode Converter
  const [charInput, setCharInput] = useState("Hello")
  const [charDetails, setCharDetails] = useState<
    Array<{ char: string; decimal: number; hex: string; binary: string; unicode: string }>
  >([])

  // Base64 Converter
  const [base64Input, setBase64Input] = useState("Hello World")
  const [base64Mode, setBase64Mode] = useState<"encode" | "decode">("encode")
  const [base64Output, setBase64Output] = useState("")

  // Number System Converter
  const [numberInput, setNumberInput] = useState("42")
  const [inputBase, setInputBase] = useState("10")
  const [outputBase, setOutputBase] = useState("2")
  const [numberOutput, setNumberOutput] = useState("")

  // ASCII/Unicode Logic
  useEffect(() => {
    const details = charInput.split("").map((char) => {
      const codePoint = char.codePointAt(0) || 0
      return {
        char,
        decimal: codePoint,
        hex: `0x${codePoint.toString(16).toUpperCase().padStart(2, "0")}`,
        binary: codePoint.toString(2).padStart(8, "0"),
        unicode: `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`,
      }
    })
    setCharDetails(details)
  }, [charInput])

  // Base64 Logic
  useEffect(() => {
    try {
      if (base64Mode === "encode") {
        setBase64Output(btoa(base64Input))
      } else {
        setBase64Output(atob(base64Input))
      }
    } catch (e) {
      setBase64Output("Invalid input for selected mode")
    }
  }, [base64Input, base64Mode])

  // Number System Logic
  useEffect(() => {
    try {
      // Parse the input as a number in the specified base
      const decimal = Number.parseInt(numberInput, Number.parseInt(inputBase))

      // Check if the result is a valid number
      if (isNaN(decimal)) {
        setNumberOutput("Invalid input")
        return
      }

      // Convert to the output base
      const result = decimal.toString(Number.parseInt(outputBase))
      setNumberOutput(result.toUpperCase())
    } catch (e) {
      setNumberOutput("Error in conversion")
    }
  }, [numberInput, inputBase, outputBase])

  return (
    <div className="container py-8">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold flex items-center">
          <Code className="mr-2 h-6 w-6 text-primary" /> Data Encoding Standards
        </h1>
        <Link href="/encoding/quiz" className="ml-auto">
          <Button variant="outline" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" /> Take Assessment Quiz
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>ASCII & Unicode Explorer</CardTitle>
            <CardDescription>Explore how characters are represented in different encoding standards.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="char-input">Input Text</Label>
                <Input
                  id="char-input"
                  value={charInput}
                  onChange={(e) => setCharInput(e.target.value)}
                  placeholder="Enter text to analyze"
                  maxLength={20}
                />
                <p className="text-sm text-muted-foreground">
                  Enter up to 20 characters to see their ASCII/Unicode representations.
                </p>
              </div>

              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Character</TableHead>
                      <TableHead>Decimal (ASCII/Unicode)</TableHead>
                      <TableHead>Hexadecimal</TableHead>
                      <TableHead>Binary</TableHead>
                      <TableHead>Unicode Point</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {charDetails.map((detail, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{detail.char}</TableCell>
                        <TableCell>{detail.decimal}</TableCell>
                        <TableCell>{detail.hex}</TableCell>
                        <TableCell className="font-mono text-xs">{detail.binary}</TableCell>
                        <TableCell>{detail.unicode}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">ASCII</h3>
                  <p className="text-sm text-muted-foreground">
                    ASCII (American Standard Code for Information Interchange) is a character encoding standard that
                    uses 7 bits to represent 128 different characters, including uppercase and lowercase letters,
                    digits, punctuation marks, and control characters.
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
                    <li>7-bit encoding (0-127)</li>
                    <li>Limited to English characters</li>
                    <li>Basis for many other encodings</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Unicode</h3>
                  <p className="text-sm text-muted-foreground">
                    Unicode is a character encoding standard that aims to represent all characters from all writing
                    systems. It uses code points to represent characters and can be implemented using different
                    encodings like UTF-8, UTF-16, and UTF-32.
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
                    <li>Supports over 140,000 characters</li>
                    <li>Compatible with ASCII (first 128 characters)</li>
                    <li>UTF-8 is the most common implementation</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Base64 Converter</CardTitle>
            <CardDescription>Convert between plain text and Base64 encoding.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="base64-mode">Mode</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={base64Mode === "encode" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setBase64Mode("encode")}
                    >
                      Encode
                    </Button>
                    <Button
                      variant={base64Mode === "decode" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setBase64Mode("decode")}
                    >
                      Decode
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="base64-input">Input</Label>
                <Textarea
                  id="base64-input"
                  value={base64Input}
                  onChange={(e) => setBase64Input(e.target.value)}
                  placeholder={base64Mode === "encode" ? "Enter text to encode" : "Enter Base64 to decode"}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="base64-output">Output</Label>
                  <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(base64Output)}>
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                <Textarea id="base64-output" value={base64Output} readOnly rows={4} className="bg-muted" />
              </div>

              <div className="pt-2">
                <h3 className="text-lg font-medium mb-2">About Base64</h3>
                <p className="text-sm text-muted-foreground">
                  Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's
                  commonly used when binary data needs to be transmitted over media that are designed to handle text.
                </p>
                <h4 className="font-medium mt-4 mb-1">Common Uses:</h4>
                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                  <li>Email attachments (MIME)</li>
                  <li>Data URLs in HTML and CSS</li>
                  <li>Storing binary data in JSON</li>
                  <li>Basic authentication headers</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Number System Converter</CardTitle>
            <CardDescription>Convert numbers between different number systems.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="number-input">Input Number</Label>
                <Input
                  id="number-input"
                  value={numberInput}
                  onChange={(e) => setNumberInput(e.target.value)}
                  placeholder="Enter a number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="input-base">Input Base</Label>
                  <Select value={inputBase} onValueChange={setInputBase}>
                    <SelectTrigger id="input-base">
                      <SelectValue placeholder="Select base" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">Binary (2)</SelectItem>
                      <SelectItem value="8">Octal (8)</SelectItem>
                      <SelectItem value="10">Decimal (10)</SelectItem>
                      <SelectItem value="16">Hexadecimal (16)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="output-base">Output Base</Label>
                  <Select value={outputBase} onValueChange={setOutputBase}>
                    <SelectTrigger id="output-base">
                      <SelectValue placeholder="Select base" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">Binary (2)</SelectItem>
                      <SelectItem value="8">Octal (8)</SelectItem>
                      <SelectItem value="10">Decimal (10)</SelectItem>
                      <SelectItem value="16">Hexadecimal (16)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="number-output">Result</Label>
                  <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(numberOutput)}>
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                <Input id="number-output" value={numberOutput} readOnly className="bg-muted font-mono" />
              </div>

              <Tabs defaultValue="binary">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="binary">Binary</TabsTrigger>
                  <TabsTrigger value="octal">Octal</TabsTrigger>
                  <TabsTrigger value="decimal">Decimal</TabsTrigger>
                  <TabsTrigger value="hex">Hex</TabsTrigger>
                </TabsList>
                <TabsContent value="binary" className="p-4 border rounded-md mt-4">
                  <h3 className="font-medium mb-2">Binary (Base 2)</h3>
                  <p className="text-sm text-muted-foreground">
                    Binary is a base-2 number system that uses only two digits: 0 and 1. Each digit position represents
                    a power of 2.
                  </p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Example: 1011</p>
                    <p className="text-xs text-muted-foreground">
                      1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11 in decimal
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="octal" className="p-4 border rounded-md mt-4">
                  <h3 className="font-medium mb-2">Octal (Base 8)</h3>
                  <p className="text-sm text-muted-foreground">
                    Octal is a base-8 number system that uses digits 0-7. Each digit position represents a power of 8.
                  </p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Example: 17</p>
                    <p className="text-xs text-muted-foreground">1×8¹ + 7×8⁰ = 8 + 7 = 15 in decimal</p>
                  </div>
                </TabsContent>
                <TabsContent value="decimal" className="p-4 border rounded-md mt-4">
                  <h3 className="font-medium mb-2">Decimal (Base 10)</h3>
                  <p className="text-sm text-muted-foreground">
                    Decimal is the standard base-10 number system that uses digits 0-9. Each digit position represents a
                    power of 10.
                  </p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Example: 42</p>
                    <p className="text-xs text-muted-foreground">4×10¹ + 2×10⁰ = 40 + 2 = 42</p>
                  </div>
                </TabsContent>
                <TabsContent value="hex" className="p-4 border rounded-md mt-4">
                  <h3 className="font-medium mb-2">Hexadecimal (Base 16)</h3>
                  <p className="text-sm text-muted-foreground">
                    Hexadecimal is a base-16 number system that uses digits 0-9 and letters A-F. Each digit position
                    represents a power of 16.
                  </p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Example: 2A</p>
                    <p className="text-xs text-muted-foreground">2×16¹ + 10×16⁰ = 32 + 10 = 42 in decimal</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
