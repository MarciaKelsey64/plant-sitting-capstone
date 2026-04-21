# plant-sitting-capstone
My plant-sitting marketplace capstone project

## Recent Fixes: Responsive Search Bar
The search component was previously breaking on mobile devices (width < 600px) due to a rigid flex-row layout. 

**Changes:**
- **Layout:** Switched to a column layout for mobile to ensure the Search button remains visible and accessible.
- **Interactivity:** Fixed an issue where the date-picker wouldn't trigger when clicking the icon in Safari and Firefox. 
- **Code Quality:** Organized styles to be "M&A-ready," ensuring clean handoffs with high maintainability.


## Lab Reflections 

Which variables provided the most value?
The --space-md and --primary-green variables provided the most value. By replacing the "magic number" (20px) throughout the CSS with a single variable, I ensured that future spacing adjustments across the entire site—like card padding and section margins—can be managed from one line in the :root. Using a variable for the brand color ensures consistency across buttons and links, preventing slight "off-brand" hex code variations.

Where did reuse improve clarity vs. hurt readability?
Improved Clarity: Implementing the .card component significantly improved clarity in the HTML. Instead of having long strings of inline styles or repeated properties across Sarah, Mike, and Linda’s reviews, the code is now clean and follows the DRY (Don't Repeat Yourself) principle.

Hurt Readability: In the footer, trying to apply the general .btn-primary class to a button inside a flexbox container initially hurt readability. The interaction between the global button styles and the specific flexbox layout (align-items) required adding extra specific rules, which made that section of the CSS slightly more complex than the original, simpler code.

Did the AI suggest anything you strongly disagreed with?
I initially disagreed with the move to refactor the footer layout while I was still trying to fix the Reviewer Cards. The AI suggested adding complex flexbox properties to the signup group while I was dealing with a "CSS earthquake" (missing brackets). I felt it was better to stabilize the core layout first and get the components working before trying to perfect the alignment of the footer button.

How would this refactor help a team of 5 developers?
This refactor creates a "Single Source of Truth." For a team of five:

Consistency: Every developer will use the same --primary-green, ensuring no one accidentally uses a different shade.

Efficiency: When a new page needs a "Review" section, a developer can just use the .card class instead of writing new CSS from scratch.

Onboarding: New developers can look at the :root at the top of the file and immediately understand the design system of the site without hunting through 200 lines of code