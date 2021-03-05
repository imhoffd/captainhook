export const checkHook = (contents: string): boolean => {
  const header = contents.split('\n')[1];
  return header.includes('captainhook file');
};
