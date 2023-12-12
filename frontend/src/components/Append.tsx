import { createSignal, createResource } from "solid-js";

export function Append() {
  let refText: HTMLInputElement | undefined;

  const [text, setText] = createSignal<string>();

  const [response] = createResource(text, async (text: string) =>
    await fetch(`https://dadgpt-dbfrvs4mzq-zf.a.run.app/append`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    })
  );

  const handleClick = (e: Event) => {
    e.preventDefault();
    console.log(refText?.value)
    setText(refText?.value || "");
  };

  return (
    <form onSubmit={handleClick}>
      <input ref={refText} type="text" />
      <button type="submit">Add</button>
      <div>{response.loading ? "Loading..." : ""}</div>
    </form>
  );
}
