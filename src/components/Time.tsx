// Function to format the date in a readable way
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);

  // Convert to local date format (you can adjust the locale and options as needed)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

// Function to get time ago format
export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000); // Years
  if (interval >= 1)
    return interval + (interval === 1 ? " year ago" : " years ago");

  interval = Math.floor(seconds / 2592000); // Months
  if (interval >= 1)
    return interval + (interval === 1 ? " month ago" : " months ago");

  interval = Math.floor(seconds / 86400); // Days
  if (interval >= 1)
    return interval + (interval === 1 ? " day ago" : " days ago");

  interval = Math.floor(seconds / 3600); // Hours
  if (interval >= 1)
    return interval + (interval === 1 ? " hour ago" : " hours ago");

  interval = Math.floor(seconds / 60); // Minutes
  if (interval >= 1)
    return interval + (interval === 1 ? " minute ago" : " minutes ago");

  return Math.floor(seconds) + (seconds === 1 ? " second ago" : " seconds ago");
}

// // Example usage
// const dateStr = "2024-10-01T04:22:23.470Z";

// console.log("Formatted Date:", formatDate(dateStr)); // Normal date format
// console.log("Time Ago:", timeAgo(dateStr)); // Time ago format
