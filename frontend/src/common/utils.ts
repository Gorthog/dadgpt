export const getTextareaValue = (textarea: HTMLDivElement | undefined, id: string) => {
  // ref and inputRef to TextField didn't work. this is a workaround
  return (textarea?.querySelector(id) as HTMLTextAreaElement).value || "";
}
