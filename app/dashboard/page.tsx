"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Users,
  Calendar,
  Briefcase,
  MapPin,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

// Mock data for alumni
const recentAlumni = [
  {
    id: 1,
    name: "Sarah Johnson",
    graduationYear: "2018",
    major: "Computer Science",
    company: "Google",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Michael Chen",
    graduationYear: "2019",
    major: "Business Administration",
    company: "McKinsey & Company",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    graduationYear: "2020",
    major: "Marketing",
    company: "Meta",
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Annual Alumni Gala",
    date: "March 15, 2024",
    location: "Grand Ballroom",
    attendees: 250,
  },
  {
    id: 2,
    title: "Tech Career Panel",
    date: "March 22, 2024",
    location: "Virtual Event",
    attendees: 150,
  },
  {
    id: 3,
    title: "Regional Meetup - Bay Area",
    date: "April 5, 2024",
    location: "San Francisco, CA",
    attendees: 75,
  },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="flex h-16 items-center px-6">
          <SidebarTrigger />
          <div className="ml-4">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search alumni..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
          <p className="text-blue-100">
            Stay connected with your alumni network and discover new
            opportunities.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Alumni
              </CardTitle>
              <Users className="h-4 w-4 " />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10,247</div>
              <p className="text-xs ">+12% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid  lg:grid-cols-1 gap-6">
          {/* Recent Alumni */}
          <Card>
            <CardHeader>
              <CardTitle>Recently Joined Alumni</CardTitle>
              <CardDescription>
                New members who joined the network this month
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAlumni.map((alumni) => (
                <div key={alumni.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={alumni.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {alumni.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/dashboard/profile/${alumni.id}`}
                      className="text-sm font-medium text-gray-900 hover:text-blue-600"
                    >
                      {alumni.name}
                    </Link>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>
                        {alumni.major} '{alumni.graduationYear}
                      </span>
                      <span>•</span>
                      <span>{alumni.company}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {alumni.location}
                    </div>
                  </div>
                  <Button className="border-1 border-black " size="sm" asChild>
                    <Link href={`/dashboard/profile/${alumni.id}`}>View</Link>
                  </Button>
                </div>
              ))}
              <Button className="w-full border-1 border-black">
                View All Alumni
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
