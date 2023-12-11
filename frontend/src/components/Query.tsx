import { createSignal, createResource } from "solid-js";

export function Query() {
  let refQuery: HTMLInputElement | undefined;

  const [query, setQuery] = createSignal<string>();

  const [response] = createResource(query, async (q) =>
    (await (await fetch(`https://dadgpt-dbfrvs4mzq-zf.a.run.app?query=${q}`)).json()).data
  );


  const handleClick = (e: Event) => {
    e.preventDefault();
    console.log(refQuery?.value)
    setQuery(refQuery?.value || "");
  };

  return (
    <form onSubmit={handleClick}>
      <input ref={refQuery} type="text" />
      <button type="submit">Search</button>
      <div>{response.loading ? "Loading..." : response()}</div>
    </form>
  );
}
