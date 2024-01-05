import { createSignal, createResource } from "solid-js";
import styles from "./Query.module.css"

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
      <div class={styles.container}>
        <input class={styles.searchInput} ref={refQuery} type="text" style="" />
        <button class={styles.searchButton} type="submit">Search</button>
        <div class={styles.searchResult} >{response.loading ? "Loading..." : response()}</div>
      </div>
    </form>
  );
}
