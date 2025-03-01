import { Separator } from "@/components/ui/separator";
import { InteractiveHeader } from "./components/interactive-header";
import { DataTable } from "./components/table-data";
import { ColumnSchema, tableColumns } from "./components/column";

export const dummyData: ColumnSchema[] = [
  {
    name: {
      first: "Emma",
      last: "Johnson",
      email: "emma.johnson@example.com",
      profilePicURL: "https://ui-avatars.com/api/?name=EJ&background=random",
    },
    department: "Engineering",
    access: ["Admin", "Developer"],
    lastActive: new Date("2024-03-15T14:30:00"),
    dateAdded: new Date("2022-06-01"),
  },
  {
    name: {
      first: "Liam",
      last: "Smith",
      email: "liam.smith@example.com",
      profilePicURL: "https://ui-avatars.com/api/?name=LS&background=random",
    },
    department: "Marketing",
    access: ["Editor"],
    lastActive: new Date("2024-03-14T09:15:00"),
    dateAdded: new Date("2023-02-15"),
  },
  {
    name: {
      first: "Olivia",
      last: "Brown",
      email: "olivia.brown@example.com",
      profilePicURL: "https://ui-avatars.com/api/?name=OB&background=random",
    },
    department: "Human Resources",
    access: ["HR Manager", "Recruiter"],
    lastActive: new Date("2024-03-13T16:45:00"),
    dateAdded: new Date("2021-11-30"),
  },
  {
    name: {
      first: "Noah",
      last: "Davis",
      email: "noah.davis@example.com",
      profilePicURL: "https://ui-avatars.com/api/?name=ND&background=random",
    },
    department: "Sales",
    access: ["Sales Lead", "CRM Access"],
    lastActive: new Date("2024-03-12T11:20:00"),
    dateAdded: new Date("2023-07-22"),
  },
  {
    name: {
      first: "Ava",
      last: "Wilson",
      email: "ava.wilson@example.com",
      profilePicURL: "https://ui-avatars.com/api/?name=AW&background=random",
    },
    department: "Support",
    access: ["Customer Support", "Knowledge Base"],
    lastActive: new Date("2024-03-11T08:00:00"),
    dateAdded: new Date("2022-09-10"),
  },
  {
    name: {
      first: "William",
      last: "Taylor",
      email: "william.taylor@example.com",
      profilePicURL: "https://ui-avatars.com/api/?name=WT&background=random",
    },
    department: "Engineering",
    access: ["Developer", "QA"],
    lastActive: new Date("2024-03-10T17:30:00"),
    dateAdded: new Date("2023-04-05"),
  },
  {
    name: {
      first: "Sophia",
      last: "Anderson",
      email: "sophia.anderson@example.com",
      profilePicURL: "https://ui-avatars.com/api/?name=SA&background=random",
    },
    department: "Marketing",
    access: ["Content Creator", "Accountant", "Analytics"],
    lastActive: new Date("2024-03-09T13:10:00"),
    dateAdded: new Date("2022-12-01"),
  },
  {
    name: {
      first: "James",
      last: "Thomas",
      email: "james.thomas@example.com",
      profilePicURL: "https://ui-avatars.com/api/?name=JT&background=random",
    },
    department: "Finance",
    access: ["Accountant", "Auditor"],
    lastActive: new Date("2024-03-08T10:45:00"),
    dateAdded: new Date("2023-08-19"),
  },
  {
    name: {
      first: "Isabella",
      last: "Jackson",
      email: "isabella.jackson@example.com",
      profilePicURL: "https://ui-avatars.com/api/?name=IJ&background=random",
    },
    department: "Engineering",
    access: ["DevOps", "Architect"],
    lastActive: new Date("2024-03-07T15:20:00"),
    dateAdded: new Date("2021-05-15"),
  },
  {
    name: {
      first: "Benjamin",
      last: "White",
      email: "benjamin.white@example.com",
      profilePicURL: "https://ui-avatars.com/api/?name=BW&background=random",
    },
    department: "Product",
    access: ["Product Manager", "Roadmap"],
    lastActive: new Date("2024-03-06T12:00:00"),
    dateAdded: new Date("2023-10-01"),
  },
];

function StaffManagement() {
  return (
    <div className="space-y-3">
      <div>
        <h5 className="text-neutral-600 font-bold text-2xl">
          Staff Management
        </h5>
        <span className="text-xs text-[#303030] font-normal">
          Manage your team members and their account permission here
        </span>
      </div>
      <Separator />
      <InteractiveHeader />
      <Separator />
      <DataTable data={dummyData} columns={tableColumns} />
    </div>
  );
}

export { StaffManagement };
