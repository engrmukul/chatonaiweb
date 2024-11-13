// const baseURL = "http://185.164.111.200:3001/";
const baseURL = "http://localhost:3001/";

export const endpoints = {
  // Auth
  signUp: `api/auth/signup`,
  signin: `api/auth/signin`,

  //Prompt
  createPrompt: `api/prompt`,
  deletePrompt: (promtId: string) => `api/prompt/${promtId}`,
  getAllPrompts: `api/prompt?pageSize=0&pageNumber=1`,
  getAllPromptsById: (promtId: string) => `api/prompt/${promtId}`,
  promptsWithCategory: `api/prompt/grouped-by-category`,
  createFavoritePrompt: `api/favorite-prompts/`,
  getAllFavoritePrompt: `api/favorite-prompts/`,
  removeFavoritePromptById: (promtId: string) =>
    `api/favorite-prompts/${promtId}`,

  // AI
  createAI: `api/ai`,

  // all tags
  getAllTags: `api/prompt-tag?isActive=true&pageSize=0&pageNumber=1`,

  fileUpload: `api/file-upload`,
};
