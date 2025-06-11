---
applyTo: '**'
---

# Clean console.logs messages

## Goal

Improve all `console.log` outputs to be more `user-friendly`, `professional`, and `visually clear`.

## Guidelines:

### Formatting:

1. ✅ Keep emojis, but keep them minimal and meaningful.
2. 🎨 Use color for interactive elements like questions (e.g., cyan, green, or yellow). depend on the meaning of the question.
3. Format yes/no questions like:

   ```md
   Do you agree to all the terms?
   [Y] Yes [N] No
   ```

4. Show a `loading...` or `processing...` state for actions that require waiting.
5. Use `clean, simple English`. All logs should be (`short`, `friendly`, `easy to read`).

### Constraints:

- Do not modify any logic or functional code.
- Only modify console.log statements for better UX.

### Optional (if needed):

- Add a success message (✔️) after actions complete (if need).
- Use consistent indentation and symbols for log clarity.
