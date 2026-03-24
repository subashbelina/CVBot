const { generateText } = require('./hfInference');

// Generate content for a section
exports.generateContent = async (section, content, chatHistory = []) => {
  try {
    const sectionPrompts = {
      general: `You are an AI resume and career assistant. Help with resumes, job applications, cover letters, interviews, and career advice.

User message:
${content}

Previous conversation:
${chatHistory.length ? chatHistory.map((msg) => `${msg.role}: ${msg.content}`).join('\n') : '(start of conversation)'}

Give a clear, professional, helpful reply. Keep answers concise unless the user asks for detail.`,

      experience: `Generate professional experience bullet points for a resume based on the following input:
      ${content}
      
      Previous context from chat:
      ${chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
      
      Requirements:
      - Use strong action verbs at the start of each bullet point
      - Quantify achievements with specific numbers and metrics
      - Focus on impact and results rather than just responsibilities
      - Keep each bullet point concise and impactful
      - Ensure ATS-friendly language
      - Format as a list of bullet points`,

      skills: `Generate a comprehensive list of skills for a resume based on the following input:
      ${content}
      
      Previous context from chat:
      ${chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
      
      Requirements:
      - Include both technical and soft skills
      - Group skills by category (e.g., Technical, Soft Skills, Tools)
      - Use industry-standard terminology
      - Focus on relevant and in-demand skills
      - Format as a categorized list`,

      education: `Format education details professionally for a resume based on the following input:
      ${content}
      
      Previous context from chat:
      ${chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
      
      Requirements:
      - Include degree, institution, dates, and relevant achievements
      - Highlight academic honors, relevant coursework, or projects
      - Keep descriptions concise and impactful
      - Format in reverse chronological order`,

      projects: `Write impactful project descriptions for a resume based on the following input:
      ${content}
      
      Previous context from chat:
      ${chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
      
      Requirements:
      - Start with a clear project title and role
      - Use action verbs and quantify results
      - Highlight technical challenges and solutions
      - Include technologies and tools used
      - Focus on business impact and outcomes
      - Format as a list of bullet points`
    };

    const prompt = sectionPrompts[section] || `Generate content for the ${section} section of a resume based on the following input:
    ${content}
    
    Previous context from chat:
    ${chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
    
    The content should be professional, concise, and highlight achievements.`;

    const text = await generateText(prompt);
    return text.trim();
  } catch (error) {
    throw new Error(`Error generating content: ${error.message}`);
  }
};

// Improve existing content
exports.improveContent = async (section, content, chatHistory = []) => {
  try {
    const improvementPrompts = {
      experience: `Improve the following experience bullet points for a resume:
      ${content}
      
      Previous context from chat:
      ${chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
      
      Requirements:
      - Strengthen action verbs
      - Add specific metrics and numbers
      - Focus on achievements and impact
      - Make language more dynamic and engaging
      - Ensure ATS optimization
      - Keep bullet points concise and impactful`,

      skills: `Enhance the following skills section for a resume:
      ${content}
      
      Previous context from chat:
      ${chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
      
      Requirements:
      - Add relevant industry-specific skills
      - Improve categorization and organization
      - Use more precise and technical terminology
      - Include both hard and soft skills
      - Prioritize most relevant skills`,

      education: `Enhance the following education section for a resume:
      ${content}
      
      Previous context from chat:
      ${chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
      
      Requirements:
      - Add relevant academic achievements
      - Include notable coursework or projects
      - Highlight leadership roles or activities
      - Make descriptions more impactful
      - Maintain professional formatting`,

      projects: `Improve the following project descriptions for a resume:
      ${content}
      
      Previous context from chat:
      ${chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
      
      Requirements:
      - Strengthen impact statements
      - Add specific metrics and results
      - Highlight technical challenges and solutions
      - Include business value and outcomes
      - Make descriptions more engaging`
    };

    const prompt = improvementPrompts[section] || `Improve the following content for the ${section} section of a resume:
    ${content}
    
    Previous context from chat:
    ${chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
    
    Make it more impactful, professional, and achievement-focused. Use action verbs and quantify results where possible.`;

    const text = await generateText(prompt);
    return text.trim();
  } catch (error) {
    throw new Error(`Error improving content: ${error.message}`);
  }
};

// Generate suggestions
exports.generateSuggestions = async (section, content) => {
  try {
    const suggestionPrompts = {
      experience: `Based on the following experience bullet points:
      ${content}
      
      Generate 3-5 specific suggestions for improvement:
      - Focus on strengthening action verbs
      - Add missing metrics and quantifiable results
      - Improve impact statements
      - Enhance ATS optimization
      - Make bullet points more concise and impactful`,

      skills: `Based on the following skills section:
      ${content}
      
      Generate 3-5 specific suggestions for improvement:
      - Add missing relevant skills
      - Improve categorization
      - Enhance technical terminology
      - Balance hard and soft skills
      - Prioritize most valuable skills`,

      education: `Based on the following education section:
      ${content}
      
      Generate 3-5 specific suggestions for improvement:
      - Add relevant academic achievements
      - Include notable coursework
      - Highlight leadership roles
      - Enhance descriptions
      - Improve formatting`,

      projects: `Based on the following project descriptions:
      ${content}
      
      Generate 3-5 specific suggestions for improvement:
      - Add specific metrics and results
      - Highlight technical challenges
      - Include business impact
      - Enhance descriptions
      - Make content more engaging`
    };

    const prompt = suggestionPrompts[section] || `Based on the following content for the ${section} section:
    ${content}
    
    Generate 3-5 specific suggestions for improvement or alternative ways to phrase the content.`;

    const text = await generateText(prompt);
    const suggestions = text
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.replace(/^\d+\.\s*/, '').trim());

    return suggestions;
  } catch (error) {
    throw new Error(`Error generating suggestions: ${error.message}`);
  }
};

// Generate professional summary
exports.generateSummary = async (experience, skills) => {
  try {
    const prompt = `Create a compelling professional summary for a resume based on the following experience and skills:
    Experience: ${JSON.stringify(experience)}
    Skills: ${JSON.stringify(skills)}
    
    Requirements:
    - Keep it concise (2-3 sentences)
    - Highlight key strengths and unique value proposition
    - Include relevant industry experience
    - Mention key technical skills and expertise
    - Focus on career objectives and impact
    - Use professional and engaging language
    - Ensure ATS optimization`;

    const text = await generateText(prompt);
    return text.trim();
  } catch (error) {
    throw new Error(`Error generating summary: ${error.message}`);
  }
};

// Enhance job descriptions
exports.enhanceJobDescription = async (jobDescription) => {
  try {
    const prompt = `Enhance the following job description to be more impactful and professional:
    ${jobDescription}
    
    Requirements:
    - Use strong action verbs
    - Quantify responsibilities and achievements
    - Focus on impact and results
    - Include specific metrics
    - Make language more dynamic
    - Ensure ATS optimization
    - Keep descriptions concise and clear`;

    const text = await generateText(prompt);
    return text.trim();
  } catch (error) {
    throw new Error(`Error enhancing job description: ${error.message}`);
  }
};

// Generate skills suggestions
exports.suggestSkills = async (jobTitle, industry) => {
  try {
    const prompt = `Suggest relevant skills for a ${jobTitle} position in the ${industry} industry.
    
    Requirements:
    - Include both technical and soft skills
    - Group skills by category (Technical, Soft Skills, Tools)
    - Focus on industry-specific requirements
    - Include emerging technologies and trends
    - Prioritize most in-demand skills
    - Use industry-standard terminology
    - Format as a categorized list`;

    const text = await generateText(prompt);
    return text.trim();
  } catch (error) {
    throw new Error(`Error suggesting skills: ${error.message}`);
  }
};
