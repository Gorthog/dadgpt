import { createSignal, createResource } from "solid-js";
import TextField from "@suid/material/TextField";
import Button from "@suid/material/Button"
import styles from "./Query.module.css"

export function Query() {
  let refQuery: HTMLDivElement | undefined;

  const [query, setQuery] = createSignal<string>();

  const [response] = createResource(query, async (q) =>
    (await (await fetch(`https://dadgpt-dbfrvs4mzq-zf.a.run.app?query=${q}`)).json()).data
  );

  const handleClick = (e: Event) => {
    e.preventDefault();
    setQuery((refQuery?.querySelector('#search-textarea') as HTMLTextAreaElement).value || "");
  };

  return (
    <form onSubmit={handleClick}>
      <div class={styles.container}>
        <TextField class={styles.searchInput}
          id="search-textarea"
          ref={refQuery}
          multiline
          maxRows={5}
        />
        <Button class={styles.searchButton} variant="contained" type="submit">Search</Button>
        <div class={styles.searchResult} >{response.loading ? "Loading..." : response()}</div>
      </div>
    </form>
  );
}
