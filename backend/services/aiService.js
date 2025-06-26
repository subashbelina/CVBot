const OpenAI = require('openai');

class AIService {
  constructor() {
    this.openai = new OpenAI({
      baseURL: "https://api.cohere.ai/v1",
      apiKey: process.env.COHERE_API_KEY,
    });
  }

  async generateResumeContent(section, userInput) {
    try {
      const prompt = this._getPromptForSection(section, userInput);
      
      const completion = await this.openai.chat.completions.create({
        model: "command-a-03-2025",
        messages: [
          {
            role: "system",
            content: this._getSystemPrompt()
          },
          {
            role: "user",
            content: prompt
          }
        ],
        stream: false
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate content');
    }
  }

  async improveContent(content, section) {
    try {
      const prompt = `Please improve the following ${section} content to make it more professional and impactful:\n\n${content}`;
      
      const completion = await this.openai.chat.completions.create({
        model: "command-a-03-2025",
        messages: [
          {
            role: "system",
            content: "You are an expert resume writer. Improve the given content to be more professional, impactful, and ATS-friendly. Focus on using strong action verbs and quantifiable achievements."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        stream: false
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to improve content');
    }
  }

  async getCareerAdvice(question) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "command-a-03-2025",
        messages: [
          {
            role: "system",
            content: "You are a career development expert. Provide professional, actionable advice about career development, job searching, and professional growth."
          },
          {
            role: "user",
            content: question
          }
        ],
        stream: false
      });

      return completion.choices[0].message.content;
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