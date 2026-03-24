const { generateChat } = require('./hfInference');

class AIService {
  async generateResumeContent(section, userInput) {
    try {
      const prompt = this._getPromptForSection(section, userInput);
      return await generateChat(this._getSystemPrompt(), prompt, { max_new_tokens: 1024 });
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate content');
    }
  }

  async improveContent(content, section) {
    try {
      const userMessage = `Please improve the following ${section} content to make it more professional and impactful:\n\n${content}`;
      const system =
        'You are an expert resume writer. Improve the given content to be more professional, impactful, and ATS-friendly. Focus on using strong action verbs and quantifiable achievements.';
      return await generateChat(system, userMessage, { max_new_tokens: 1024 });
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to improve content');
    }
  }

  async getCareerAdvice(question) {
    try {
      const system =
        'You are a career development expert. Provide professional, actionable advice about career development, job searching, and professional growth.';
      return await generateChat(system, question, { max_new_tokens: 1024 });
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to get career advice');
    }
  }

  _getSystemPrompt() {
    return `You are an expert resume writer and career advisor. Your task is to help users create compelling, professional resume content. 
    Follow these guidelines:
    1. Use strong action verbs
    2. Include quantifiable achievements
    3. Keep content concise and impactful
    4. Focus on relevant skills and experiences
    5. Use industry-specific terminology appropriately
    6. Ensure ATS-friendly formatting
    7. Maintain professional tone
    8. Avoid clichés and generic statements`;
  }

  _getPromptForSection(section, userInput) {
    const sectionPrompts = {
      summary: `Write a compelling professional summary based on the following information:\n${userInput}`,
      experience: `Write professional experience bullet points based on the following job details:\n${userInput}`,
      skills: `List relevant skills and competencies based on the following information:\n${userInput}`,
      education: `Format education details professionally based on the following information:\n${userInput}`,
      projects: `Write impactful project descriptions based on the following information:\n${userInput}`
    };

    return sectionPrompts[section] || `Write professional ${section} content based on:\n${userInput}`;
  }
}

module.exports = new AIService();
