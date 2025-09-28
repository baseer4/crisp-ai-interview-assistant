function parseResume(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  // try first line as name
  const name = lines.length > 0 ? lines[0] : null;

  // regex for email
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);

  // regex for phone (basic international + local 10-digit)
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\d{10}/);

  return {
    name,
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
  };
}

// Example usage:
const resumeText = `
SUPER MAN
SOMEWHERE, USA | 1230001230| super.man@gmail.com I https•//www linkedin corn/in`;

console.log(parseResume(resumeText));
