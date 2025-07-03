"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Users } from "lucide-react"
import Link from "next/link"

// Mock alumni data
const allAlumni = [
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
  {
    id: 4,
    name: "David Kim",
    graduationYear: "2017",
    major: "Engineering",
    company: "Tesla",
    location: "Palo Alto, CA",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Lisa Wang",
    graduationYear: "2021",
    major: "Data Science",
    company: "Netflix",
    location: "Los Angeles, CA",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "James Wilson",
    graduationYear: "2016",
    major: "Finance",
    company: "Goldman Sachs",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function AlumniDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredAlumni, setFilteredAlumni] = useState(allAlumni)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredAlumni(allAlumni)
    } else {
      const filtered = allAlumni.filter(
        (alumni) =>
          alumni.name.toLowerCase().includes(query.toLowerCase()) ||
          alumni.major.toLowerCase().includes(query.toLowerCase()) ||
          alumni.company.toLowerCase().includes(query.toLowerCase()) ||
          alumni.location.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredAlumni(filtered)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="flex h-16 items-center px-6">
          <SidebarTrigger />
          <div className="ml-4">
            <h1 className="text-2xl font-semibold">Alumni Directory</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search alumni..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>{filteredAlumni.length} alumni found</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((alumni) => (
            <Card key={alumni.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
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
                    <CardTitle className="text-lg truncate">{alumni.name}</CardTitle>
                    <p className="text-sm text-gray-600">Class of {alumni.graduationYear}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <Badge variant="secondary" className="text-xs">
                    {alumni.major}
                  </Badge>
                  <p className="text-sm font-medium text-gray-900">{alumni.company}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    {alumni.location}
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <Link href={`/dashboard/profile/${alumni.id}`}>View Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alumni found</h3>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
