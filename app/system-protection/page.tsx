"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Shield, AlertTriangle, CheckCircle2, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"

export default function SystemProtectionPage() {
  const [firewallEnabled, setFirewallEnabled] = useState(false)
  const [idsEnabled, setIdsEnabled] = useState(false)
  const [accessControlLevel, setAccessControlLevel] = useState(1)
  const [securityScore, setSecurityScore] = useState(0)
  const [attacks, setAttacks] = useState<string[]>([])
  const [attackInProgress, setAttackInProgress] = useState(false)

  const updateSecurityScore = () => {
    let score = 0
    if (firewallEnabled) score += 30
    if (idsEnabled) score += 30
    score += accessControlLevel * 10
    setSecurityScore(score)
  }

  const simulateAttack = () => {
    setAttackInProgress(true)
    setAttacks([])

    setTimeout(() => {
      const newAttacks = []

      if (!firewallEnabled) {
        newAttacks.push("Port scanning detected")
      }

      if (accessControlLevel < 3) {
        newAttacks.push("Unauthorized access attempt")
      }

      if (!idsEnabled) {
        newAttacks.push("Suspicious network activity")
      }

      setAttacks(newAttacks)
      setAttackInProgress(false)
    }, 2000)
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
          <Shield className="mr-2 h-6 w-6 text-primary" /> System Protection Module
        </h1>
        <Link href="/system-protection/quiz" className="ml-auto">
          <Button variant="outline" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" /> Take Assessment Quiz
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Interactive Security Configuration</CardTitle>
            <CardDescription>
              Configure your system's security settings and observe how they affect your overall security posture.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="firewall" className="text-base">
                      Firewall Protection
                    </Label>
                    <Switch
                      id="firewall"
                      checked={firewallEnabled}
                      onCheckedChange={(checked) => {
                        setFirewallEnabled(checked)
                        updateSecurityScore()
                      }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Firewalls monitor and filter incoming and outgoing network traffic based on predetermined security
                    rules.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ids" className="text-base">
                      Intrusion Detection System
                    </Label>
                    <Switch
                      id="ids"
                      checked={idsEnabled}
                      onCheckedChange={(checked) => {
                        setIdsEnabled(checked)
                        updateSecurityScore()
                      }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    IDS monitors network traffic for suspicious activity and policy violations.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="access-control" className="text-base">
                    Access Control Level
                  </Label>
                  <Slider
                    id="access-control"
                    min={1}
                    max={4}
                    step={1}
                    value={[accessControlLevel]}
                    onValueChange={(value) => {
                      setAccessControlLevel(value[0])
                      updateSecurityScore()
                    }}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Basic</span>
                    <span>Standard</span>
                    <span>Enhanced</span>
                    <span>Maximum</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Access control determines who can access resources in a system.
                  </p>
                </div>

                <Button onClick={simulateAttack} disabled={attackInProgress}>
                  {attackInProgress ? "Simulating..." : "Simulate Attack"}
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Security Score</h3>
                  <Progress value={securityScore} className="h-4" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {securityScore < 30 && "Your system is highly vulnerable to attacks."}
                    {securityScore >= 30 &&
                      securityScore < 60 &&
                      "Your system has basic protection but remains vulnerable."}
                    {securityScore >= 60 &&
                      securityScore < 90 &&
                      "Your system has good protection against common threats."}
                    {securityScore >= 90 && "Your system has excellent protection against most threats."}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Attack Simulation Results</h3>
                  {attackInProgress ? (
                    <div className="flex items-center justify-center h-32 border rounded-md">
                      <div className="text-center">
                        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                        <p>Simulating attack...</p>
                      </div>
                    </div>
                  ) : attacks.length > 0 ? (
                    <div className="border rounded-md p-4 bg-red-50 dark:bg-red-950/20">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                        <h4 className="font-medium text-red-500">Vulnerabilities Detected</h4>
                      </div>
                      <ul className="space-y-1 text-sm">
                        {attacks.map((attack, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{attack}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : securityScore > 0 ? (
                    <div className="border rounded-md p-4 bg-green-50 dark:bg-green-950/20">
                      <div className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                        <h4 className="font-medium text-green-500">Run an attack simulation to test your defenses</h4>
                      </div>
                    </div>
                  ) : (
                    <div className="border rounded-md p-4">
                      <p className="text-sm text-muted-foreground">
                        Configure your security settings and run a simulation.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Security Concepts</CardTitle>
            <CardDescription>Learn about different system protection methods and best practices.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="firewall">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="firewall">Firewall</TabsTrigger>
                <TabsTrigger value="ids">Intrusion Detection</TabsTrigger>
                <TabsTrigger value="access">Access Control</TabsTrigger>
              </TabsList>
              <TabsContent value="firewall" className="p-4 border rounded-md mt-4">
                <h3 className="text-lg font-medium mb-2">Firewall Protection</h3>
                <p className="mb-4">
                  A firewall is a network security device that monitors and filters incoming and outgoing network
                  traffic based on an organization's previously established security policies.
                </p>
                <h4 className="font-medium mb-2">Types of Firewalls:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Packet-filtering firewalls</li>
                  <li>Stateful inspection firewalls</li>
                  <li>Proxy firewalls</li>
                  <li>Next-generation firewalls (NGFW)</li>
                </ul>
                <h4 className="font-medium mt-4 mb-2">Best Practices:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Implement the principle of least privilege</li>
                  <li>Regularly update firewall rules</li>
                  <li>Monitor firewall logs</li>
                  <li>Use multiple layers of protection</li>
                </ul>
              </TabsContent>
              <TabsContent value="ids" className="p-4 border rounded-md mt-4">
                <h3 className="text-lg font-medium mb-2">Intrusion Detection Systems</h3>
                <p className="mb-4">
                  An intrusion detection system (IDS) is a device or software application that monitors a network or
                  systems for malicious activity or policy violations.
                </p>
                <h4 className="font-medium mb-2">Types of IDS:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Network Intrusion Detection Systems (NIDS)</li>
                  <li>Host-based Intrusion Detection Systems (HIDS)</li>
                  <li>Signature-based IDS</li>
                  <li>Anomaly-based IDS</li>
                </ul>
                <h4 className="font-medium mt-4 mb-2">Detection Methods:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Pattern matching</li>
                  <li>Statistical anomaly detection</li>
                  <li>Protocol analysis</li>
                  <li>Heuristic-based detection</li>
                </ul>
              </TabsContent>
              <TabsContent value="access" className="p-4 border rounded-md mt-4">
                <h3 className="text-lg font-medium mb-2">Access Control</h3>
                <p className="mb-4">
                  Access control is a security technique that regulates who or what can view or use resources in a
                  computing environment.
                </p>
                <h4 className="font-medium mb-2">Access Control Models:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Discretionary Access Control (DAC)</li>
                  <li>Mandatory Access Control (MAC)</li>
                  <li>Role-Based Access Control (RBAC)</li>
                  <li>Attribute-Based Access Control (ABAC)</li>
                </ul>
                <h4 className="font-medium mt-4 mb-2">Implementation Strategies:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Principle of least privilege</li>
                  <li>Separation of duties</li>
                  <li>Multi-factor authentication</li>
                  <li>Regular access reviews</li>
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
