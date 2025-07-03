"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { MapPin, Briefcase, GraduationCap, Mail, Phone, Globe, MessageCircle, UserPlus } from "lucide-react"

// Mock alumni data
const alumniData = {
  1: {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 987-6543",
    graduationYear: "2018",
    major: "Computer Science",
    degree: "Bachelor of Science",
    currentCompany: "Google",
    currentPosition: "Senior Software Engineer",
    location: "San Francisco, CA",
    bio: "Passionate about building scalable web applications and mentoring the next generation of developers. Currently working on machine learning infrastructure at Google.",
    website: "https://sarahjohnson.dev",
    skills: ["JavaScript", "Python", "React", "Machine Learning", "Kubernetes", "Go"],
    avatar: "/placeholder.svg?height=120&width=120",
    experience: [
      {
        company: "Google",
        position: "Senior Software Engineer",
        duration: "2021 - Present",
        description: "Leading ML infrastructure projects and mentoring junior engineers.",
      },
      {
        company: "Microsoft",
        position: "Software Engineer",
        duration: "2019 - 2021",
        description: "Developed cloud-based solutions for enterprise clients.",
      },
      {
        company: "Startup Inc.",
        position: "Junior Developer",
        duration: "2018 - 2019",
        description: "Full-stack development for early-stage startup.",
      },
    ],
  },
  2: {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 456-7890",
    graduationYear: "2019",
    major: "Business Administration",
    degree: "Master of Business Administration",
    currentCompany: "McKinsey & Company",
    currentPosition: "Senior Consultant",
    location: "New York, NY",
    bio: "Strategic consultant with expertise in digital transformation and operational excellence. Helping Fortune 500 companies navigate complex business challenges.",
    website: "https://michaelchen.consulting",
    skills: ["Strategy", "Digital Transformation", "Data Analytics", "Project Management", "Leadership"],
    avatar: "/placeholder.svg?height=120&width=120",
    experience: [
      {
        company: "McKinsey & Company",
        position: "Senior Consultant",
        duration: "2021 - Present",
        description: "Leading digital transformation initiatives for Fortune 500 clients.",
      },
      {
        company: "McKinsey & Company",
        position: "Consultant",
        duration: "2019 - 2021",
        description: "Supported strategy development and implementation projects.",
      },
    ],
  },
  3: {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1 (555) 321-0987",
    graduationYear: "2020",
    major: "Marketing",
    degree: "Bachelor of Arts",
    currentCompany: "Meta",
    currentPosition: "Product Marketing Manager",
    location: "Austin, TX",
    bio: "Creative marketing professional with a passion for building brands and driving user engagement. Currently focused on AR/VR product marketing at Meta.",
    website: "https://emilyrodriguez.marketing",
    skills: ["Product Marketing", "Brand Strategy", "Content Creation", "Analytics", "Social Media"],
    avatar: "/placeholder.svg?height=120&width=120",
    experience: [
      {
        company: "Meta",
        position: "Product Marketing Manager",
        duration: "2022 - Present",
        description: "Leading marketing strategy for AR/VR products and experiences.",
      },
      {
        company: "Meta",
        position: "Marketing Specialist",
        duration: "2020 - 2022",
        description: "Developed and executed marketing campaigns for consumer products.",
      },
    ],
  },
}

export default function AlumniProfile() {
  const params = useParams()
  const [profile, setProfile] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const id = params.id as string
    const alumniProfile = alumniData[Number.parseInt(id)]
    if (alumniProfile) {
      setProfile(alumniProfile)
    }
  }, [params.id])

  const handleConnect = () => {
    setIsConnected(!isConnected)
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Profile Not Found</h2>
          <p className="text-gray-600 mt-2">The alumni profile you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="flex h-16 items-center px-6">
          <SidebarTrigger />
          <div className="ml-4">
            <h1 className="text-2xl font-semibold">Alumni Profile</h1>
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
                </div>
                <div className="flex flex-col space-y-2">
                  <Button onClick={handleConnect} variant={isConnected ? "outline" : "default"}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    {isConnected ? "Connected" : "Connect"}
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
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
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="font-medium text-gray-900">{profile.degree}</h4>
                  <p className="text-gray-600">Major: {profile.major}</p>
                  <p className="text-sm text-gray-500">Class of {profile.graduationYear}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex items-start space-x-3">
                    <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{exp.position}</h4>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.duration}</p>
                      <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                    </div>
                  </div>
                  {index < profile.experience.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

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
