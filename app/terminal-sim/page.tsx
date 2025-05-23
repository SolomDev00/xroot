"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Terminal, Play, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TerminalCube } from "@/components/terminal-cube";

interface TerminalLine {
  type: "command" | "output" | "error" | "system";
  content: string;
  timestamp?: Date;
}

const commands = {
  help: {
    description: "Show available commands",
    output: [
      "Available commands:",
      "  help          - Show this help message",
      "  ls            - List directory contents",
      "  pwd           - Print working directory",
      "  whoami        - Display current user",
      "  date          - Show current date and time",
      "  clear         - Clear the terminal",
      "  cat <file>    - Display file contents",
      "  nmap          - Network scanning simulation",
      "  hashcat       - Password cracking simulation",
      "  wireshark     - Network analysis simulation",
      "  cube          - Display 3D security cube",
      "  security      - Run security assessment",
      "  exit          - Exit terminal",
    ],
  },
  ls: {
    description: "List directory contents",
    output: [
      "total 8",
      "drwxr-xr-x  2 user user 4096 Jan 15 10:30 documents",
      "drwxr-xr-x  2 user user 4096 Jan 15 10:30 logs",
      "-rw-r--r--  1 user user  156 Jan 15 10:25 passwords.txt",
      "-rw-r--r--  1 user user  892 Jan 15 10:20 network_scan.log",
      "-rwxr-xr-x  1 user user 2048 Jan 15 10:15 security_tool",
      "-rw-r--r--  1 user user  445 Jan 15 10:10 system_info.txt",
    ],
  },
  pwd: {
    description: "Print working directory",
    output: ["/home/cybersec/workspace"],
  },
  whoami: {
    description: "Display current user",
    output: ["cybersec"],
  },
  date: {
    description: "Show current date and time",
    output: [new Date().toString()],
  },
  "cat passwords.txt": {
    description: "Display password file contents",
    output: [
      "# Common weak passwords found in breach:",
      "123456",
      "password",
      "admin",
      "qwerty",
      "letmein",
      "welcome",
      "monkey",
      "dragon",
      "",
      "WARNING: These passwords were cracked in under 1 second!",
    ],
  },
  "cat system_info.txt": {
    description: "Display system information",
    output: [
      "System Security Assessment Report",
      "================================",
      "OS: Ubuntu 20.04 LTS",
      "Kernel: 5.4.0-74-generic",
      "Architecture: x86_64",
      "Last Security Update: 2 days ago",
      "",
      "Security Status: NEEDS ATTENTION",
      "- Firewall: ENABLED",
      "- Antivirus: OUTDATED",
      "- SSH: ENABLED (Port 22)",
      "- Open Ports: 22, 80, 443, 3306",
    ],
  },
  nmap: {
    description: "Network scanning simulation",
    output: [
      "Starting Nmap scan simulation...",
      "",
      "Nmap scan report for target.local (192.168.1.100)",
      "Host is up (0.0012s latency).",
      "",
      "PORT     STATE SERVICE",
      "22/tcp   open  ssh",
      "80/tcp   open  http",
      "443/tcp  open  https",
      "3306/tcp open  mysql",
      "",
      "Nmap done: 1 IP address (1 host up) scanned in 2.45 seconds",
    ],
  },
  hashcat: {
    description: "Password cracking simulation",
    output: [
      "hashcat (v6.2.5) starting...",
      "",
      "Attempting to crack MD5 hashes...",
      "",
      "5d41402abc4b2a76b9719d911017c592:hello",
      "098f6bcd4621d373cade4e832627b4f6:test",
      "e99a18c428cb38d5f260853678922e03:abc123",
      "",
      "Session..........: hashcat",
      "Status...........: Cracked",
      "Hash.Mode........: 0 (MD5)",
      "Time.Started.....: Mon Jan 15 10:30:00 2024",
      "Speed.#1.........:   234.5 MH/s",
      "",
      "Cracked 3/3 hashes in 0.02 seconds",
    ],
  },
  wireshark: {
    description: "Network analysis simulation",
    output: [
      "Wireshark network capture simulation",
      "====================================",
      "",
      "Capturing on interface eth0...",
      "",
      "Time     Source          Destination     Protocol Info",
      "0.000000 192.168.1.10    192.168.1.1     TCP      [SYN] Seq=0",
      "0.001234 192.168.1.1     192.168.1.10    TCP      [SYN, ACK] Seq=0 Ack=1",
      "0.001456 192.168.1.10    192.168.1.1     TCP      [ACK] Seq=1 Ack=1",
      "0.002000 192.168.1.10    192.168.1.1     HTTP     GET / HTTP/1.1",
      "0.005678 192.168.1.1     192.168.1.10    HTTP     HTTP/1.1 200 OK",
      "",
      "Suspicious activity detected:",
      "- Multiple failed SSH attempts from 192.168.1.50",
      "- Unusual DNS queries to suspicious domains",
      "- Large data transfer to external IP",
    ],
  },
  security: {
    description: "Run security assessment",
    output: [
      "CyberSec Security Assessment Tool v2.1",
      "======================================",
      "",
      "Running comprehensive security scan...",
      "",
      "[✓] Checking system vulnerabilities...",
      "[✓] Analyzing network configuration...",
      "[✓] Reviewing user permissions...",
      "[!] Scanning for malware...",
      "[✓] Validating security policies...",
      "",
      "SECURITY ASSESSMENT RESULTS:",
      "============================",
      "",
      "Overall Security Score: 7.2/10",
      "",
      "CRITICAL ISSUES (1):",
      "- Outdated antivirus definitions",
      "",
      "WARNINGS (3):",
      "- SSH running on default port",
      "- MySQL accessible from network",
      "- Weak password policy detected",
      "",
      "RECOMMENDATIONS:",
      "1. Update antivirus definitions immediately",
      "2. Change SSH to non-standard port",
      "3. Implement stronger password requirements",
      "4. Enable two-factor authentication",
      "5. Regular security training for users",
    ],
  },
};

export default function TerminalSimPage() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", content: "CyberSec Terminal Simulator v1.0" },
    { type: "system", content: "Type 'help' for available commands" },
    { type: "system", content: "" },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showCube, setShowCube] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addLine = (type: TerminalLine["type"], content: string) => {
    setLines((prev) => [...prev, { type, content, timestamp: new Date() }]);
  };

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();

    addLine("command", `$ ${command}`);

    if (trimmedCommand === "") {
      return;
    }

    if (trimmedCommand === "clear") {
      setLines([]);
      return;
    }

    if (trimmedCommand === "exit") {
      addLine("system", "Terminal session ended.");
      return;
    }

    if (trimmedCommand === "cube") {
      setShowCube(true);
      addLine("output", "Displaying 3D Security Cube...");
      addLine(
        "output",
        "The cube represents the multi-layered approach to cybersecurity:"
      );
      addLine("output", "- Physical Security (Red face)");
      addLine("output", "- Network Security (Green face)");
      addLine("output", "- Application Security (Blue face)");
      addLine("output", "- Data Security (Yellow face)");
      addLine("output", "- Identity Security (Magenta face)");
      addLine("output", "- Operational Security (Cyan face)");
      return;
    }

    // Check if command exists
    const cmd = commands[trimmedCommand as keyof typeof commands];
    if (cmd) {
      cmd.output.forEach((line) => {
        setTimeout(() => addLine("output", line), Math.random() * 100);
      });
    } else {
      addLine("error", `Command not found: ${trimmedCommand}`);
      addLine("output", "Type 'help' for available commands");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      setCommandHistory((prev) => [...prev, currentInput]);
      executeCommand(currentInput);
      setCurrentInput("");
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const clearTerminal = () => {
    setLines([
      { type: "system", content: "CyberSec Terminal Simulator v1.0" },
      { type: "system", content: "Type 'help' for available commands" },
      { type: "system", content: "" },
    ]);
    setShowCube(false);
  };

  const runDemo = () => {
    const demoCommands = [
      "whoami",
      "pwd",
      "ls",
      "cat system_info.txt",
      "nmap",
      "security",
    ];
    let delay = 0;

    demoCommands.forEach((cmd, index) => {
      setTimeout(() => {
        executeCommand(cmd);
      }, delay);
      delay += 2000;
    });
  };

  return (
    <div className="container py-8">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold flex items-center">
          <Terminal className="mr-2 h-6 w-6 text-primary" /> Terminal Simulation
        </h1>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" onClick={runDemo}>
            <Play className="mr-2 h-4 w-4" /> Run Demo
          </Button>
          <Button variant="outline" onClick={clearTerminal}>
            <RotateCcw className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                CyberSec Terminal
              </CardTitle>
              <CardDescription>
                Interactive terminal for cybersecurity tools and commands
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <div
                ref={terminalRef}
                className="flex-1 bg-black text-green-400 font-mono text-sm p-4 overflow-y-auto"
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((line, index) => (
                  <div
                    key={index}
                    className={`mb-1 ${
                      line.type === "command"
                        ? "text-white"
                        : line.type === "error"
                        ? "text-red-400"
                        : line.type === "system"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {line.content}
                  </div>
                ))}
                <form onSubmit={handleSubmit} className="flex items-center">
                  <span className="text-white mr-2">$</span>
                  <Input
                    ref={inputRef}
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none! text-green-400 font-mono focus-visible:ring-0 focus-visible:border-none focus-visible:outline-none focus:ring-0 focus:outline-none p-0"
                    placeholder="Type a command..."
                    autoComplete="off"
                    style={{
                      borderColor: "transparent",
                    }}
                  />
                </form>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {showCube && (
            <Card>
              <CardHeader>
                <CardTitle>3D Security Cube</CardTitle>
                <CardDescription>
                  Multi-layered cybersecurity visualization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <TerminalCube />
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Available Commands</CardTitle>
              <CardDescription>
                Common cybersecurity tools and utilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <code className="bg-muted px-2 py-1 rounded">help</code>
                  <code className="bg-muted px-2 py-1 rounded">ls</code>
                  <code className="bg-muted px-2 py-1 rounded">pwd</code>
                  <code className="bg-muted px-2 py-1 rounded">whoami</code>
                  <code className="bg-muted px-2 py-1 rounded">date</code>
                  <code className="bg-muted px-2 py-1 rounded">clear</code>
                  <code className="bg-muted px-2 py-1 rounded">nmap</code>
                  <code className="bg-muted px-2 py-1 rounded">hashcat</code>
                  <code className="bg-muted px-2 py-1 rounded">wireshark</code>
                  <code className="bg-muted px-2 py-1 rounded">security</code>
                  <code className="bg-muted px-2 py-1 rounded">cube</code>
                  <code className="bg-muted px-2 py-1 rounded">
                    cat &lt;file&gt;
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Objectives</CardTitle>
              <CardDescription>
                What you'll learn from this simulation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Command line interface basics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Network scanning with Nmap</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Password cracking techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Network traffic analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Security assessment tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>System information gathering</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
