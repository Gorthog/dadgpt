import { createSignal } from "solid-js";

export function Query() {
  const [query, setQuery] = createSignal("");
  const [response, setResponse] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);

  const handleClick = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch(`https://dadgpt-dbfrvs4mzq-zf.a.run.app?query=${query()}`);
    const data = await res.json();
    setResponse(data.data);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleClick}>
      <input type="text" value={query()} onInput={(e) => setQuery(e.currentTarget.value)} />
      <button type="submit">Search</button>
      <div>{isLoading() ? "Loading..." : response()}</div>
    </form>
  );
}
