# Resume Setup Guide

## How to Add Your Resume

### Step 1: Place Your Resume PDF
1. **Locate your resume PDF** - You have one provided in the attachments
2. **Place it in the `public` folder** at: `c:\portfolio\public\resume.pdf`
   - Your resume should be named exactly: `resume.pdf`
   - The public folder is automatically served by Vite

### Step 2: Verify it's Working
- The resume button in the Hero section now links to `/resume.pdf`
- When users click the "⬇ Resume" button, it will download or open your resume
- Test it by clicking the Resume button on http://localhost:3000/

### File Structure
```
c:\portfolio\
├── public/
│   └── resume.pdf        ← Place your resume here
├── src/
│   ├── LakshmiSrujanaPortfolio.jsx
│   ├── main.jsx
│   └── index.css
└── index.html
```

## Quick Steps to Add Resume

### Option 1: Direct File Copy
1. Navigate to: `C:\portfolio\public\`
2. Copy your `resume.pdf` file here
3. Refresh the browser at http://localhost:3000/
4. Click the Resume button to test

### Option 2: Using Terminal
```powershell
# Copy your resume to public folder (adjust path as needed)
Copy-Item -Path "path\to\your\resume.pdf" -Destination "c:\portfolio\public\resume.pdf"
```

## Resume Currently Shows
The button now links to the correct path. Just add your PDF file and it will work automatically!

## Notes
- File must be named exactly: `resume.pdf`
- Place it in the `public` folder (not `src`)
- Vite automatically serves files from the public folder at the root path `/`
- The resume button is in the Hero section (top of the page)
