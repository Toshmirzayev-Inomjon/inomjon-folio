const disposableDomains = new Set([
  "10minutemail.com",
  "guerrillamail.com",
  "mailinator.com",
  "tempmail.com",
  "trashmail.com",
  "yopmail.com"
]);

export function assertRealisticEmail(email: string) {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain || disposableDomains.has(domain)) {
    throw new Error("Disposable or suspicious email addresses are not allowed.");
  }
}
