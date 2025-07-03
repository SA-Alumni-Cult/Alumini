"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { MapPin, Briefcase, GraduationCap, Mail, Phone, Globe, Edit, Save, X } from "lucide-react"

export default function MyProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "",
    phone: "+1 (555) 123-4567",
    graduationYear: "2020",
    major: "Computer Science",
    degree: "Bachelor of Science",
    currentCompany: "Tech Solutions Inc.",
    currentPosition: "Senior Software Engineer",
    location: "Seattle, WA",
    bio: "Passionate software engineer with 4+ years of experience in full-stack development. Love working on innovative projects and mentoring junior developers.",
    website: "https://johndoe.dev",
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"],
    avatar: "/placeholder.svg?height=120&width=120",
  })

  useEffect(() => {
    const email = localStorage.getItem("userEmail")
    if (email) {
      setUserEmail(email)
      setProfile((prev) => ({ ...prev, email }))
    }
  }, [])

  const handleSave = () => {
    // In a real app, this would save to a database
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="flex h-16 items-center px-6">
          <SidebarTrigger />
          <div className="ml-4">
            <h1 className="text-2xl font-semibold">My Profile</h1>
          </div>
          <div className="ml-auto">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <div className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profile.bio}
                          onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                          rows={3}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                      <p className="text-gray-600 mt-1">
                        {profile.currentPosition} at {profile.currentCompany}
                      </p>
                      <p className="text-gray-600 mt-2">{profile.bio}</p>
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {profile.location}
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          Class of {profile.graduationYear}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profile.website}
                        onChange={(e) => setProfile((prev) => ({ ...prev, website: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-3 text-gray-400" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-3 text-gray-400" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-3 text-gray-400" />
                      <a href={profile.website} className="text-blue-600 hover:underline">
                        {profile.website}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-3 text-gray-400" />
                      <span>{profile.location}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Education & Career */}
            <Card>
              <CardHeader>
                <CardTitle>Education & Career</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <Label htmlFor="major">Major</Label>
                      <Input
                        id="major"
                        value={profile.major}
                        onChange={(e) => setProfile((prev) => ({ ...prev, major: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="degree">Degree</Label>
                      <Input
                        id="degree"
                        value={profile.degree}
                        onChange={(e) => setProfile((prev) => ({ ...prev, degree: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="graduationYear">Graduation Year</Label>
                      <Input
                        id="graduationYear"
                        value={profile.graduationYear}
                        onChange={(e) => setProfile((prev) => ({ ...prev, graduationYear: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="currentCompany">Current Company</Label>
                      <Input
                        id="currentCompany"
                        value={profile.currentCompany}
                        onChange={(e) => setProfile((prev) => ({ ...prev, currentCompany: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="currentPosition">Current Position</Label>
                      <Input
                        id="currentPosition"
                        value={profile.currentPosition}
                        onChange={(e) => setProfile((prev) => ({ ...prev, currentPosition: e.target.value }))}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h4 className="font-medium text-gray-900">Education</h4>
                      <p className="text-gray-600">
                        {profile.degree} in {profile.major}
                      </p>
                      <p className="text-sm text-gray-500">Class of {profile.graduationYear}</p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium text-gray-900">Current Position</h4>
                      <div className="flex items-center mt-1">
                        <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-gray-600">{profile.currentPosition}</span>
                      </div>
                      <p className="text-sm text-gray-500 ml-6">{profile.currentCompany}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
