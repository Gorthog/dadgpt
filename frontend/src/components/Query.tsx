import { createSignal } from "solid-js";

export function Query() {
  const [query, setQuery] = createSignal("");
  const [response, setResponse] = createSignal("");

  const handleClick = async () => {
    const response = await fetch(`https://dadgpt-dbfrvs4mzq-zf.a.run.app?query=${query()}`);
    const data = await response.json();
    setResponse(data.data);
    console.log(data);
  };

  return (
    <>
      <input type="text" value={query()} onInput={(e) => setQuery(e.target.value)} />
      <button onClick={handleClick}>Search</button>
      <div>{response()}</div>
    </>
  );
}
