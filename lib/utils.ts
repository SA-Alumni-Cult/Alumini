import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import csv from "csvtojson";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractCSV(file: File): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      if (!event.target?.result) {
        reject(new Error("Failed to read file"));
        return;
      }

      try {
        const csvData = event.target.result as string;
        const jsonArray = await csv().fromString(csvData);

        // ✅ Map CSV data to the desired structure
        const mappedData = jsonArray.map((row, index) => ({
          index: index + 1,
          name: row["Name"],
          yearOfPassingOut: row["Year of passing"],
          course: row["Course"],
          department: row["Department"],
          address: row["Address of Residence"],
          email: row["E-mail Id"],
          contactNo: row["Contact number"],
          occupation: row["Occupation"],
          placeOfWork: row["Place of work"],
          designation: row["Position( Designation)"],
          officialAddress: row["Official address"],
          higherEducation: {
            course: row["Higher education if any: A) Course"],
            institution: row["Higher education if any: B) Institution"],
            year: row["Higher education if any: C) Year of passing"],
          },
          highestDegree: {
            specify: row["Highest degree A) Specify"],
            year: row["Highest degree B) year"],
          },
          areaOfExpertise: row["Area of expertise"],
          friendsContact:
            row["Any contact of your classmates/ batchmates/friends"],
          allowContact:
            row[
              "Are you willing us to contact you for any area of your expertise"
            ],
        }));

        // ✅ Send mapped data to backend
        const res = await fetch("/api/upload-from-file", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: mappedData }),
        });

        const result = await res.json();
        if (res.ok) {
          resolve(JSON.stringify({ data: mappedData }));
        } else {
          reject(new Error(result.error || "Failed to upload data"));
        }
      } catch (err: any) {
        reject(new Error(err.message || "Something went wrong"));
      }
    };

    // Altered code ends here

    reader.onerror = () => reject(new Error("Error reading file"));
    reader.readAsText(file);
  });
}
