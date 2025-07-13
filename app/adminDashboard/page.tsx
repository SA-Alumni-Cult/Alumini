"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, Calendar, Briefcase, MapPin, TrendingUp } from "lucide-react"
import Link from "next/link"
import Upload from "@/components/upload"
import { extractCSV } from "@/lib/utils"

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
]



export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const email = localStorage.getItem("userEmail")
    if (email) {
      setUserEmail(email)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="flex h-16 items-center px-6">
          <SidebarTrigger />
          <div className="ml-4">
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
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
          <p className="text-blue-100">Stay connected with your alumni network and discover new opportunities.</p>
        </div>
        {/* Download the csv template */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Download CSV Template</CardTitle>
              <CardDescription>Use this template to format your data correctly.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <Link href="/path/to/csv-template.csv" download>
                  Download Template
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upload CSV File</CardTitle>
            </CardHeader>
            <CardContent>
              <Upload
          onCsvUpload={(data) => {
            console.log("CSV Data:", data)
            const file = data instanceof ArrayBuffer ? new File([data], "uploaded.csv", { type: "text/csv" }) : data
            if (file instanceof File) {
              extractCSV(file).then((csv) => console.log("Extracted CSV:", csv))
            } else {
              console.log("Data is not a File object:", typeof data)
            }
          }}
          onCsvRemove={() => console.log("CSV Removed")}
          setUploadedCsvName={(name) => console.log("Uploaded CSV Name:", name)}
              />
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Alumni */}
          <Card>
            <CardHeader>
              <CardTitle>Recently Joined Alumni</CardTitle>
              <CardDescription>New members who joined the network this month</CardDescription>
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
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/profile/${alumni.id}`}>View</Link>
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                View All Alumni
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
