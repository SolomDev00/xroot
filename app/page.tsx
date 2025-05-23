"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Lock,
  Code,
  ChevronDown,
  Users,
  Terminal,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldModel } from "@/components/shield-model";
import { ParticleField } from "@/components/particle-field";
import { TerminalCube } from "@/components/terminal-cube";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isHeroInView, setIsHeroInView] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setIsHeroInView(rect.bottom > 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/95">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold sm:inline-block">xRoot</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/system-protection"
                className="transition-colors hover:text-primary"
              >
                System Protection
              </Link>
              <Link
                href="/cryptography"
                className="transition-colors hover:text-primary"
              >
                Cryptography
              </Link>
              <Link
                href="/encoding"
                className="transition-colors hover:text-primary"
              >
                Data Encoding
              </Link>
              <Link
                href="/social-engineering"
                className="transition-colors hover:text-primary"
              >
                Social Engineering
              </Link>
              <Link
                href="/terminal-sim"
                className="transition-colors hover:text-primary"
              >
                Terminal Sim
              </Link>
            </nav>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Sign In
            </Button>
            <Button size="sm" className="hidden md:flex">
              Get Started
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <section
          ref={heroRef}
          className="relative w-full py-16 md:py-28 lg:py-36 overflow-hidden container"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb), 0.15), transparent 70%)",
          }}
        >
          <div className="absolute inset-0 z-0">
            <ParticleField />
          </div>

          <div
            className="absolute inset-0 z-0 opacity-30"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col items-start space-y-6 text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-2"
                >
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    Master Cybersecurity <br />
                    Through Interaction
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Explore hands-on modules to understand system protection,
                    cryptographic techniques, and data encoding standards
                    through interactive simulations.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link href="/system-protection">
                    <Button size="lg" className="group">
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    Watch Demo
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center space-x-4 text-sm text-muted-foreground"
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden"
                      >
                        <div className="h-full w-full bg-primary/20 flex items-center justify-center text-xs font-medium">
                          {i}
                        </div>
                      </div>
                    ))}
                  </div>
                  <span>Join 2,000+ cybersecurity students</span>
                </motion.div>
              </div>

              <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-primary/10 animate-pulse"
                    style={{ animationDuration: "4s" }}
                  ></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-primary/5 animate-pulse"
                    style={{ animationDuration: "3s" }}
                  ></div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative z-10 w-full h-full"
                >
                  <ShieldModel isRotating={isHeroInView} />
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
              <span className="text-sm text-muted-foreground mb-2">
                Scroll to explore
              </span>
              <ChevronDown className="h-6 w-6 text-muted-foreground animate-bounce" />
            </motion.div>
          </div>
        </section>

        <section className="container space-y-12 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center"
          >
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              Interactive Learning
            </div>
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Learning Modules
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Dive into our interactive modules designed to provide hands-on
              experience with key cybersecurity concepts.
            </p>
          </motion.div>

          <div className="mx-auto grid justify-center gap-8 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:grid-cols-3">
            <ModuleCard
              icon={<Shield className="h-12 w-12" />}
              title="System Protection"
              description="Explore access control, firewalls, and intrusion detection through interactive simulations."
              details="Learn how to configure security systems and understand defense mechanisms through hands-on exercises."
              link="/system-protection"
              index={0}
            />

            <ModuleCard
              icon={<Lock className="h-12 w-12" />}
              title="Cryptographic Techniques"
              description="Experiment with encryption methods, password security, and cryptographic attacks."
              details="Apply different encryption algorithms and understand their strengths and vulnerabilities."
              link="/cryptography"
              index={1}
            />

            <ModuleCard
              icon={<Code className="h-12 w-12" />}
              title="Data Encoding Standards"
              description="Convert between different encoding formats and understand how data is represented."
              details="Visualize and manipulate data using ASCII, Unicode, Base64, and other encoding standards."
              link="/encoding"
              index={2}
            />

            <ModuleCard
              icon={<Users className="h-12 w-12" />}
              title="Social Engineering"
              description="Learn to identify and defend against social engineering attacks in realistic scenarios."
              details="Practice recognizing manipulation techniques and responding appropriately to social engineering attempts."
              link="/social-engineering"
              index={3}
            />

            <ModuleCard
              icon={<Terminal className="h-12 w-12" />}
              title="Terminal Simulation"
              description="Master cybersecurity tools through interactive terminal commands and 3D visualizations."
              details="Gain hands-on experience with penetration testing tools and security assessment commands."
              link="/terminal-sim"
              index={4}
            />
          </div>
        </section>

        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-primary/5"></div>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-[58rem] text-center mb-12"
            >
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                Why Choose xRoot?
              </h2>
              <p className="text-muted-foreground sm:text-lg">
                Our platform offers unique advantages for cybersecurity
                education
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                title="Interactive Learning"
                description="Hands-on simulations and exercises that reinforce theoretical concepts through practical application."
                index={0}
              />
              <FeatureCard
                title="Real-world Scenarios"
                description="Practice with simulated attacks and security configurations that mirror actual cybersecurity challenges."
                index={1}
              />
              <FeatureCard
                title="Comprehensive Coverage"
                description="From basic concepts to advanced techniques, our modules cover the full spectrum of cybersecurity knowledge."
                index={2}
              />
            </div>
          </div>
        </section>

        <section className="container py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-[58rem] text-center mb-12"
          >
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-muted-foreground sm:text-lg mb-8">
              Begin your cybersecurity journey with our interactive modules and
              advanced terminal simulation
            </p>

            <div className="mb-8">
              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Terminal className="h-5 w-5 text-primary" />
                    Interactive Terminal Experience
                  </CardTitle>
                  <CardDescription>
                    Explore cybersecurity with our 3D-enhanced terminal
                    simulation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 w-full mb-4">
                    <TerminalCube />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Experience multi-layered security concepts through
                    interactive 3D visualization and real terminal commands.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/terminal-sim" className="w-full">
                    <Button className="w-full">
                      Launch Terminal Simulation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/system-protection">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                View Curriculum
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t py-8 md:py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-4 md:max-w-xs">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold">xRoot</span>
              </div>
              <p className="text-sm text-muted-foreground">
                An interactive platform for learning cybersecurity concepts
                through hands-on simulations and exercises.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h4 className="font-medium">Modules</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/system-protection"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      System Protection
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cryptography"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Cryptography
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/encoding"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Data Encoding
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/social-engineering"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Social Engineering
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terminal-sim"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Terminal Simulation
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Community
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 xRoot. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2H2v10h10V2zM22 2h-10v10h10V2zM12 12H2v10h10V12zM22 12h-10v10h10V12z"></path>
                </svg>
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface ModuleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
  link: string;
  index: number;
}

function ModuleCard({
  icon,
  title,
  description,
  details,
  link,
  index,
}: ModuleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 border-primary/10 hover:border-primary/30 h-full">
        <CardHeader className="p-6">
          <div className="mb-2 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <p className="text-muted-foreground line-clamp-3">{details}</p>
        </CardContent>
        <CardFooter className="p-6 pt-auto">
          <Link href={link} className="w-full">
            <Button className="w-full group">
              Explore Module
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="bg-background/80 backdrop-blur-sm rounded-lg p-6 border border-primary/10"
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
        <span className="font-bold">{index + 1}</span>
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
