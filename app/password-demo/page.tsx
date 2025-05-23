"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Shield, AlertTriangle, Eye, EyeOff, Copy, RefreshCw, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface PersonalData {
  fullName: string
  familyMembers: string[]
  siblings: number
  pets: Array<{ name: string; type: string }>
  dateOfBirth: string
  favoritePlayer: string
  favoriteSubject: string
  travelDestination: string
}

interface PasswordOptions {
  length: number
  includeNumbers: boolean
  includeSymbols: boolean
  includeUppercase: boolean
  includeLowercase: boolean
  avoidSimilar: boolean
}

export default function PasswordDemoPage() {
  const [personalData, setPersonalData] = useState<PersonalData>({
    fullName: "",
    familyMembers: [""],
    siblings: 0,
    pets: [{ name: "", type: "" }],
    dateOfBirth: "",
    favoritePlayer: "",
    favoriteSubject: "",
    travelDestination: "",
  })

  const [passwordOptions, setPasswordOptions] = useState<PasswordOptions>({
    length: 12,
    includeNumbers: true,
    includeSymbols: true,
    includeUppercase: true,
    includeLowercase: true,
    avoidSimilar: false,
  })

  const [generatedPasswords, setGeneratedPasswords] = useState<
    Array<{ password: string; strength: number; method: string; vulnerability: string }>
  >([])
  const [showPasswords, setShowPasswords] = useState(false)
  const [currentTab, setCurrentTab] = useState("form")

  const addFamilyMember = () => {
    setPersonalData({
      ...personalData,
      familyMembers: [...personalData.familyMembers, ""],
    })
  }

  const updateFamilyMember = (index: number, value: string) => {
    const updated = [...personalData.familyMembers]
    updated[index] = value
    setPersonalData({ ...personalData, familyMembers: updated })
  }

  const removeFamilyMember = (index: number) => {
    const updated = personalData.familyMembers.filter((_, i) => i !== index)
    setPersonalData({ ...personalData, familyMembers: updated })
  }

  const addPet = () => {
    setPersonalData({
      ...personalData,
      pets: [...personalData.pets, { name: "", type: "" }],
    })
  }

  const updatePet = (index: number, field: "name" | "type", value: string) => {
    const updated = [...personalData.pets]
    updated[index][field] = value
    setPersonalData({ ...personalData, pets: updated })
  }

  const removePet = (index: number) => {
    const updated = personalData.pets.filter((_, i) => i !== index)
    setPersonalData({ ...personalData, pets: updated })
  }

  const generatePersonalPasswords = () => {
    const passwords = []
    const { fullName, familyMembers, pets, dateOfBirth, favoritePlayer, favoriteSubject, travelDestination } =
      personalData

    // Extract useful data
    const firstName = fullName.split(" ")[0]
    const lastName = fullName.split(" ").slice(-1)[0]
    const birthYear = dateOfBirth ? new Date(dateOfBirth).getFullYear().toString() : ""
    const birthMonth = dateOfBirth ? (new Date(dateOfBirth).getMonth() + 1).toString().padStart(2, "0") : ""
    const petNames = pets.filter((p) => p.name).map((p) => p.name)
    const familyNames = familyMembers.filter((m) => m.trim())

    // Method 1: Name + Birth Year + Symbol
    if (firstName && birthYear) {
      const base = firstName + birthYear
      const password = addComplexity(base, passwordOptions)
      passwords.push({
        password,
        strength: calculateStrength(password),
        method: "First Name + Birth Year",
        vulnerability: "Birth year is often public information, first name is easily guessable",
      })
    }

    // Method 2: Pet Name + Travel Destination
    if (petNames.length > 0 && travelDestination) {
      const base = petNames[0] + travelDestination.replace(/\s/g, "")
      const password = addComplexity(base, passwordOptions)
      passwords.push({
        password,
        strength: calculateStrength(password),
        method: "Pet Name + Travel Destination",
        vulnerability: "Pet names and travel plans are often shared on social media",
      })
    }

    // Method 3: Favorite Subject + Player + Numbers
    if (favoriteSubject && favoritePlayer) {
      const base = favoriteSubject.replace(/\s/g, "") + favoritePlayer.replace(/\s/g, "")
      const password = addComplexity(base, passwordOptions)
      passwords.push({
        password,
        strength: calculateStrength(password),
        method: "Favorite Subject + Player",
        vulnerability: "Interests and favorites are often discussed publicly",
      })
    }

    // Method 4: Family Member + Birth Month + Pet
    if (familyNames.length > 0 && birthMonth && petNames.length > 0) {
      const base = familyNames[0].replace(/\s/g, "") + birthMonth + petNames[0]
      const password = addComplexity(base, passwordOptions)
      passwords.push({
        password,
        strength: calculateStrength(password),
        method: "Family Member + Birth Month + Pet",
        vulnerability: "Family information is often available through social networks",
      })
    }

    // Method 5: Initials + Full Birth Date
    if (fullName && dateOfBirth) {
      const initials = fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
      const dateStr = dateOfBirth.replace(/-/g, "")
      const base = initials + dateStr
      const password = addComplexity(base, passwordOptions)
      passwords.push({
        password,
        strength: calculateStrength(password),
        method: "Initials + Full Birth Date",
        vulnerability: "Birth dates are often public, initials are easily deduced",
      })
    }

    setGeneratedPasswords(passwords)
    setCurrentTab("results")
  }

  const addComplexity = (base: string, options: PasswordOptions): string => {
    let password = base

    if (options.includeUppercase) {
      password = password.charAt(0).toUpperCase() + password.slice(1)
    }

    if (options.includeLowercase) {
      password = password.toLowerCase()
      if (options.includeUppercase) {
        password = password.charAt(0).toUpperCase() + password.slice(1)
      }
    }

    if (options.includeNumbers) {
      password += Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, "0")
    }

    if (options.includeSymbols) {
      const symbols = "!@#$%^&*"
      password += symbols[Math.floor(Math.random() * symbols.length)]
    }

    // Adjust length
    if (password.length < options.length) {
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
      while (password.length < options.length) {
        password += chars[Math.floor(Math.random() * chars.length)]
      }
    } else if (password.length > options.length) {
      password = password.substring(0, options.length)
    }

    return password
  }

  const calculateStrength = (password: string): number => {
    let strength = 0
    if (password.length >= 8) strength += 20
    if (password.length >= 12) strength += 10
    if (/[a-z]/.test(password)) strength += 10
    if (/[A-Z]/.test(password)) strength += 10
    if (/[0-9]/.test(password)) strength += 10
    if (/[^A-Za-z0-9]/.test(password)) strength += 15
    if (password.length >= 16) strength += 10

    // Reduce strength for personal info patterns
    strength = Math.max(0, strength - 25) // Personal info penalty

    return Math.min(100, strength)
  }

  const generateSecurePassword = (): string => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
    let password = ""
    for (let i = 0; i < passwordOptions.length; i++) {
      password += chars[Math.floor(Math.random() * chars.length)]
    }
    return password
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="container py-8">
      <div className="flex items-center mb-8">
        <Link href="/cryptography">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cryptography
          </Button>
        </Link>
        <h1 className="text-3xl font-bold flex items-center">
          <Shield className="mr-2 h-6 w-6 text-primary" /> Password Security Demonstration
        </h1>
      </div>

      <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
        <AlertTriangle className="h-4 w-4 text-red-500" />
        <AlertTitle className="text-red-700 dark:text-red-400">Educational Warning</AlertTitle>
        <AlertDescription className="text-red-600 dark:text-red-300">
          This demonstration shows why using personal information for passwords is dangerous. The passwords generated
          here are intentionally weak and should never be used in real applications.
        </AlertDescription>
      </Alert>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="form">Personal Data</TabsTrigger>
          <TabsTrigger value="options">Password Options</TabsTrigger>
          <TabsTrigger value="results">Generated Passwords</TabsTrigger>
          <TabsTrigger value="secure">Secure Alternative</TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information Collection</CardTitle>
              <CardDescription>
                Fill out this form to see how personal information can be used to create passwords (and why this is a
                bad idea).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={personalData.fullName}
                    onChange={(e) => setPersonalData({ ...personalData, fullName: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={personalData.dateOfBirth}
                    onChange={(e) => setPersonalData({ ...personalData, dateOfBirth: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Family Members</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addFamilyMember}>
                    Add Member
                  </Button>
                </div>
                {personalData.familyMembers.map((member, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={member}
                      onChange={(e) => updateFamilyMember(index, e.target.value)}
                      placeholder="Family member name"
                    />
                    {personalData.familyMembers.length > 1 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removeFamilyMember(index)}>
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="siblings">Number of Siblings</Label>
                <Select
                  value={personalData.siblings.toString()}
                  onValueChange={(value) => setPersonalData({ ...personalData, siblings: Number.parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of siblings" />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Pets</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addPet}>
                    Add Pet
                  </Button>
                </div>
                {personalData.pets.map((pet, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={pet.name}
                      onChange={(e) => updatePet(index, "name", e.target.value)}
                      placeholder="Pet name"
                    />
                    <Select value={pet.type} onValueChange={(value) => updatePet(index, "type", value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="bird">Bird</SelectItem>
                        <SelectItem value="fish">Fish</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {personalData.pets.length > 1 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removePet(index)}>
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="favoritePlayer">Favorite Sports Player/Celebrity</Label>
                  <Input
                    id="favoritePlayer"
                    value={personalData.favoritePlayer}
                    onChange={(e) => setPersonalData({ ...personalData, favoritePlayer: e.target.value })}
                    placeholder="Michael Jordan"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="favoriteSubject">Favorite Subject/Hobby</Label>
                  <Input
                    id="favoriteSubject"
                    value={personalData.favoriteSubject}
                    onChange={(e) => setPersonalData({ ...personalData, favoriteSubject: e.target.value })}
                    placeholder="Mathematics"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelDestination">Dream Travel Destination</Label>
                <Input
                  id="travelDestination"
                  value={personalData.travelDestination}
                  onChange={(e) => setPersonalData({ ...personalData, travelDestination: e.target.value })}
                  placeholder="Paris"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="options" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password Generation Options</CardTitle>
              <CardDescription>
                Customize how the passwords will be generated from your personal information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Password Length: {passwordOptions.length}</Label>
                  <Slider
                    value={[passwordOptions.length]}
                    onValueChange={(value) => setPasswordOptions({ ...passwordOptions, length: value[0] })}
                    min={8}
                    max={32}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>8 characters</span>
                    <span>32 characters</span>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeNumbers">Include Numbers</Label>
                    <Switch
                      id="includeNumbers"
                      checked={passwordOptions.includeNumbers}
                      onCheckedChange={(checked) => setPasswordOptions({ ...passwordOptions, includeNumbers: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeSymbols">Include Symbols</Label>
                    <Switch
                      id="includeSymbols"
                      checked={passwordOptions.includeSymbols}
                      onCheckedChange={(checked) => setPasswordOptions({ ...passwordOptions, includeSymbols: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeUppercase">Include Uppercase</Label>
                    <Switch
                      id="includeUppercase"
                      checked={passwordOptions.includeUppercase}
                      onCheckedChange={(checked) =>
                        setPasswordOptions({ ...passwordOptions, includeUppercase: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeLowercase">Include Lowercase</Label>
                    <Switch
                      id="includeLowercase"
                      checked={passwordOptions.includeLowercase}
                      onCheckedChange={(checked) =>
                        setPasswordOptions({ ...passwordOptions, includeLowercase: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Button onClick={generatePersonalPasswords} className="w-full" size="lg">
                Generate Passwords from Personal Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Generated Passwords (Insecure)
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowPasswords(!showPasswords)}>
                    {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showPasswords ? "Hide" : "Show"}
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                These passwords demonstrate why personal information should never be used for password generation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedPasswords.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No passwords generated yet. Fill out the form and generate passwords first.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {generatedPasswords.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{item.method}</Badge>
                          <Badge
                            variant={item.strength < 30 ? "destructive" : item.strength < 60 ? "secondary" : "default"}
                          >
                            Strength: {item.strength}%
                          </Badge>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(item.password)}
                          disabled={!showPasswords}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="font-mono text-lg bg-muted p-2 rounded">
                        {showPasswords ? item.password : "•".repeat(item.password.length)}
                      </div>

                      <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <AlertDescription className="text-amber-700 dark:text-amber-300">
                          <strong>Vulnerability:</strong> {item.vulnerability}
                        </AlertDescription>
                      </Alert>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="secure" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Secure Password Generation</CardTitle>
              <CardDescription>
                This is how passwords should actually be generated - completely random and unpredictable.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
                <Info className="h-4 w-4 text-green-500" />
                <AlertTitle className="text-green-700 dark:text-green-400">Best Practice</AlertTitle>
                <AlertDescription className="text-green-600 dark:text-green-300">
                  Secure passwords should be completely random and not based on any personal information that could be
                  guessed or discovered.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Truly Random Password</h3>
                  <Button onClick={() => {}} className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Generate New
                  </Button>
                </div>

                <div className="font-mono text-lg bg-muted p-4 rounded border-2 border-green-200 dark:border-green-800">
                  {generateSecurePassword()}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2 text-green-600 dark:text-green-400">✓ Secure Password Practices</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Use a password manager</li>
                      <li>Generate completely random passwords</li>
                      <li>Use unique passwords for each account</li>
                      <li>Enable two-factor authentication</li>
                      <li>Use passphrases for memorable passwords</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 text-red-600 dark:text-red-400">✗ Avoid These Practices</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Using personal information</li>
                      <li>Reusing passwords across sites</li>
                      <li>Using dictionary words</li>
                      <li>Using predictable patterns</li>
                      <li>Sharing passwords with others</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-300">Recommended Tools</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Use reputable password managers like Bitwarden, 1Password, or LastPass to generate and store secure
                    passwords. These tools create truly random passwords and help you use unique passwords for every
                    account.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
