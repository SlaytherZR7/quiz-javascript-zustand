export const getAllQuestions = async () => {
  const response = await fetch('https://localhost:3000/data.json');
  const data = await response.json();
  return data;
};
