import dbConnect from "@/lib/DbConnect";
import Alumni, { ILogin } from "@/models/Login";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Building, User, GraduationCap, Briefcase, Calendar } from "lucide-react";

export default async function StudentPage({ params }: { params: Promise<{ id: string }> }) {
  // Await params as required by Next.js 15
  const resolvedParams = await params;
  console.log("🔍 Received params:", resolvedParams);
  console.log("🆔 Student ID:", resolvedParams.id);
  
  // Check if the ID is a valid MongoDB ObjectId format (24 character hex string)
  const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(resolvedParams.id);
  
  if (!isValidObjectId) {
    console.log("❌ Invalid ObjectId format:", resolvedParams.id);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Invalid Student ID</CardTitle>
            <CardDescription>
              The provided ID "{resolvedParams.id}" is not a valid student identifier.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
  
  await dbConnect();
  console.log("✅ Database connected successfully");
  
  try {
    console.log("🔎 Searching for student with ID:", resolvedParams.id);
    const student = await Alumni.findById(resolvedParams.id).lean() as ILogin | null;
    console.log("📊 Query result:", student ? "Student found" : "Student not found");
    console.log("📋 Student data:", student);

    if (!student) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-red-600">Student Not Found</CardTitle>
              <CardDescription>
                The student with ID {resolvedParams.id} could not be found.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      );
    }

    return (
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
              <p className="text-gray-600">{student.course} • {student.department}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm">
            Batch of {student.yearOfPassingOut}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{student.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{student.contactNo}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{student.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Year of Passing</p>
                  <p className="font-medium">{student.yearOfPassingOut}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap className="h-4 w-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Course & Department</p>
                  <p className="font-medium">{student.course}</p>
                  <p className="text-sm text-gray-600">{student.department}</p>
                </div>
              </div>
              {student.highestDegree && (
                <div className="flex items-start gap-3">
                  <GraduationCap className="h-4 w-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Highest Degree</p>
                    <p className="font-medium">{student.highestDegree.specify}</p>
                    <p className="text-sm text-gray-600">Year: {student.highestDegree.year}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Professional Information */}
          {(student.occupation || student.placeOfWork || student.designation) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {student.occupation && (
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Occupation</p>
                      <p className="font-medium">{student.occupation}</p>
                    </div>
                  </div>
                )}
                {student.placeOfWork && (
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Place of Work</p>
                      <p className="font-medium">{student.placeOfWork}</p>
                    </div>
                  </div>
                )}
                {student.designation && (
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Designation</p>
                      <p className="font-medium">{student.designation}</p>
                    </div>
                  </div>
                )}
                {student.officialAddress && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Official Address</p>
                      <p className="font-medium">{student.officialAddress}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Higher Education */}
          {student.higherEducation && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Higher Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <GraduationCap className="h-4 w-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Course</p>
                    <p className="font-medium">{student.higherEducation.course}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building className="h-4 w-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Institution</p>
                    <p className="font-medium">{student.higherEducation.institution}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Year of Passing</p>
                    <p className="font-medium">{student.higherEducation.yearOfPassing}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Additional Information */}
        {(student.areaOfExpertise || student.contactsOfBatchmates) && (
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {student.areaOfExpertise && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Area of Expertise</p>
                    <p className="font-medium">{student.areaOfExpertise}</p>
                  </div>
                )}
                {student.contactsOfBatchmates && (
                  <div>
                    <Separator className="my-4" />
                    <p className="text-sm text-gray-500 mb-2">Batchmate Contacts</p>
                    <p className="font-medium">{student.contactsOfBatchmates}</p>
                  </div>
                )}
                {student.willingToContact !== undefined && (
                  <div>
                    <Separator className="my-4" />
                    <p className="text-sm text-gray-500 mb-2">Willing to be Contacted</p>
                    <Badge variant={student.willingToContact ? "default" : "secondary"}>
                      {student.willingToContact ? "Yes" : "No"}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("❌ Error fetching student:", error);
    console.error("🆔 Failed for ID:", resolvedParams.id);
    console.error("📝 Error details:", {
      name: (error as any)?.name,
      message: (error as any)?.message,
      stack: (error as any)?.stack
    });
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>
              An error occurred while fetching student information.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
}
