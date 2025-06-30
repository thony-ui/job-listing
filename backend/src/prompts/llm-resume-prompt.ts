const formatLLMResumePrompt = (
  resume: string,
  jobDescription: string
): string => {
  return `You are an expert resume writer and career strategist with 15+ years of experience helping candidates land their dream jobs. Your task is to strategically optimize the provided resume to align with the specific job description while maintaining authenticity and accuracy.

## CRITICAL INSTRUCTIONS:
- PRESERVE all factual information (dates, company names, job titles, education, certifications)
- DO NOT fabricate experience, skills, or achievements
- ONLY enhance existing content to better highlight relevant aspects
- MAINTAIN one-page format by prioritizing most relevant content
- Focus on reframing and emphasizing existing strengths
- OUTPUT ONLY THE OPTIMIZED RESUME - NO EXPLANATIONS, NOTES, OR ADDITIONAL TEXT

## STANDARD RESUME TEMPLATE STRUCTURE:
Follow this exact format and order:

1. **Header Section**
   - Full Name (large, bold)
   - Professional Title/Target Role
   - Phone | Email | LinkedIn | Location

2. **Professional Summary** (2-3 lines max)
   - Concise overview highlighting years of experience and key strengths
   - Include 1-2 quantified achievements relevant to target role

3. **Core Skills** (bullet points or comma-separated)
   - 8-12 most relevant technical and soft skills
   - Use exact terminology from job description

4. **Professional Experience** (reverse chronological)
   - Job Title | Company Name | Location | Dates
   - 2-4 bullet points per role (prioritize recent/relevant roles)
   - Start each bullet with action verbs
   - Include quantified achievements where possible

5. **Education**
   - Degree | Institution | Graduation Year
   - Relevant coursework/projects if space allows

6. **Certifications** (if applicable)
   - Certification Name | Issuing Organization | Date

## ONE-PAGE OPTIMIZATION RULES:
- Prioritize last 10-15 years of experience
- Focus on roles most relevant to target position
- Combine similar skills to save space
- Use concise, impactful language
- Remove less relevant positions if space is tight
- Keep margins reasonable (0.5-0.75 inches)
- Use consistent, professional formatting

## ANALYSIS FRAMEWORK:

### STEP 1: Extract and Analyze Key Components
Identify and extract these sections from the resume:
- Contact Information
- Professional Summary/Objective
- Work Experience (roles, responsibilities, achievements)
- Skills (technical, soft skills, tools, technologies)
- Education
- Certifications
- Projects
- Additional sections (volunteer work, languages, etc.)

### STEP 2: Job Requirements Analysis
From the job description, identify:
- Required technical skills and technologies
- Preferred qualifications
- Key responsibilities and duties
- Company culture and values
- Industry-specific terminology
- Required soft skills and competencies

### STEP 3: Strategic Optimization
For each resume section, apply these enhancements:

**Professional Summary:**
- Rewrite to emphasize skills and experience most relevant to the target role
- Include 1-2 key achievements that align with job requirements
- Use industry-specific keywords from the job description

**Work Experience:**
- Reorder bullet points to prioritize most relevant responsibilities
- Quantify achievements where possible (if original data exists)
- Rephrase descriptions using keywords from job posting
- Highlight transferable skills that match job requirements
- Focus on last 10-15 years, prioritize most relevant roles

**Skills Section:**
- Select 8-12 most relevant skills for the target role
- Group related technologies/tools together
- Use exact terminology from job description when applicable
- Organize by relevance to job requirements

**Education & Certifications:**
- Emphasize relevant coursework, projects, or certifications
- Include only if space allows and adds value

## OUTPUT REQUIREMENTS:
- Return ONLY the optimized resume in markdown format
- Follow the standard template structure exactly
- Ensure content fits on one page when printed
- Do NOT include any explanations, summaries, or commentary
- Do NOT mention what changes were made
- Do NOT include phrases like "Here's the optimized resume" or similar
- Start directly with the resume content

---

**ORIGINAL RESUME:**
${resume}

**TARGET JOB DESCRIPTION:**
${jobDescription}

---

Begin the optimized resume now:`;
};

const formatAdvancedLLMResumePrompt = (
  resume: string,
  jobDescription: string,
  options: {
    targetRole?: string;
    industry?: string;
    experienceLevel?: "entry" | "mid" | "senior" | "executive";
    focusAreas?: string[];
  } = {}
): string => {
  const { targetRole, industry, experienceLevel, focusAreas } = options;

  return `You are an expert resume writer specializing in ${
    industry || "technology"
  } industry with deep knowledge of ${
    experienceLevel || "mid-level"
  } career positioning.

## CONTEXT:
- Target Role: ${targetRole || "Position from job description"}
- Industry: ${industry || "Technology"}
- Experience Level: ${experienceLevel || "Mid-level"}
- Focus Areas: ${
    focusAreas?.join(", ") || "Skills and experience from job description"
  }

## ENHANCED OPTIMIZATION STRATEGY:

### For ${experienceLevel || "Mid-level"} Professionals:
${
  experienceLevel === "entry"
    ? "- Emphasize education, projects, internships, and transferable skills\n- Highlight potential and eagerness to learn\n- Focus on relevant coursework and personal projects"
    : experienceLevel === "senior"
    ? "- Emphasize leadership experience and strategic impact\n- Highlight team management and mentoring\n- Focus on business outcomes and organizational influence"
    : experienceLevel === "executive"
    ? "- Emphasize vision, strategy, and organizational transformation\n- Highlight P&L responsibility and stakeholder management\n- Focus on market impact and industry leadership"
    : "- Balance technical expertise with growing leadership responsibilities\n- Highlight project ownership and cross-functional collaboration\n- Focus on measurable impact and career progression"
}

### Industry-Specific Optimization (${industry || "Technology"}):
- Use ${industry || "technology"}-specific terminology and frameworks
- Highlight relevant ${industry || "technology"} trends and methodologies
- Emphasize ${industry || "technology"} compliance and best practices

${resume}

**JOB DESCRIPTION:**
${jobDescription}

**DELIVER:** An optimized resume that positions the candidate as the ideal fit for this ${
    targetRole || "role"
  } while maintaining complete authenticity.`;
};

export { formatLLMResumePrompt, formatAdvancedLLMResumePrompt };
