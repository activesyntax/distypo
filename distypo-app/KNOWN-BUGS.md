# Known Bugs

## Overlapping Corrections

When corrections overlap, it is not always possible to resolve every issue.

**Root cause:** A user-edited correction may invalidate the match context of a
subsequent correction, leaving it unable to apply cleanly.

**Example:**

| #   | Rule                      | Original                       | Corrected                      |
| --- | ------------------------- | ------------------------------ | ------------------------------ |
| 1   | Capital after punctuation | `sentence end.   new sentence` | `sentence end.   New sentence` |
| 2   | Multiple whitespaces      | `sentence end.   new sentence` | `sentence end. new sentence`   |

If the user manually edits correction #1 and also removes the extra spaces, correction
# 2 can no longer find its expected match — its original context no longer exists in
the document.

---

## Session Not Persisted

The document state is not stored between page loads.

If the browser is refreshed, the current session is lost and the user must restart
the correction process from the beginning.
