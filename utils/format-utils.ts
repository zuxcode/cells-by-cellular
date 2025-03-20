import { format, isValid } from "date-fns";

// Utility functions
const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  
  const formatDate = (date: Date) =>
    isValid(date) ? format(date, "haaa, EEE, MMM dd") : "Invalid date";

  export { formatCurrency, formatDate };