"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, Users, Calendar, Award } from "lucide-react";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cheese = "cheese"; // Placeholder for cheese variable, not used in this example
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in real app, this would validate credentials
    if (email && password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                AlumniConnect
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                Connect with Your
                <span className="text-blue-600"> Alumni Network</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                Stay connected with your college community. Discover
                opportunities, share experiences, and build lasting professional
                relationships.
              </p>

              {/* Features */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="ml-2 text-sm text-gray-600">
                    10,000+ Alumni
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="ml-2 text-sm text-gray-600">
                    Regular Events
                  </span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="ml-2 text-sm text-gray-600">
                    Career Support
                  </span>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <div className="lg:justify-self-end">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>
                    Sign in to access your alumni network
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@college.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>
                  </form>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Request Access
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-gray-600">Active Alumni</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">25</div>
              <div className="text-gray-600">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
