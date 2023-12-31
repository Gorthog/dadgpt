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
      <div style="display: flex; justify-content: center; width: 100%; flex-direction: column; align-items: center;">
        <input ref={refQuery} type="text" style="width: 600px; height: 35px; padding: 3px 10px; font-size: 16px; border-radius: 20px; margin-bottom: 10px;" />
        <button type="submit" style="width: 120px; height: 36px; font-size: 14px;">Search</button>
        <div>{response.loading ? "Loading..." : response()}</div>
      </div>
    </form>
  );
}
