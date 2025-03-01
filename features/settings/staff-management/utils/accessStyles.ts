type AccessStyle = {
  bg: string;
  text: string;
};

const ACCESS_STYLES: Record<string, AccessStyle> = {
  Admin: {
    bg: "bg-red-100",
    text: "text-red-800",
  },
  Developer: {
    bg: "bg-blue-100",
    text: "text-blue-800",
  },
  Editor: {
    bg: "bg-purple-100",
    text: "text-purple-800",
  },
  "HR Manager": {
    bg: "bg-green-100",
    text: "text-green-800",
  },
  Recruiter: {
    bg: "bg-teal-100",
    text: "text-teal-800",
  },
  "Sales Lead": {
    bg: "bg-orange-100",
    text: "text-orange-800",
  },
  "Customer Support": {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
  },
  QA: {
    bg: "bg-indigo-100",
    text: "text-indigo-800",
  },
  Analyst: {
    bg: "bg-pink-100",
    text: "text-pink-800",
  },
  Default: {
    bg: "bg-gray-100",
    text: "text-gray-800",
  },
};

export const getAccessStyle = (access: string): AccessStyle => {
  return ACCESS_STYLES[access] || ACCESS_STYLES.Default;
};
