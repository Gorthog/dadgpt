import { createSignal, createResource } from "solid-js";
import TextField from "@suid/material/TextField";
import Button from "@suid/material/Button"
import styles from "./Query.module.css"

export function Query() {
  let refQuery: HTMLDivElement | undefined;

  const [query, setQuery] = createSignal<string>();
  const [disabled, setDisabled] = createSignal<boolean>(true);

  const [response] = createResource(query, async (q) =>
    (await (await fetch(`https://dadgpt-dbfrvs4mzq-zf.a.run.app?query=${q}`)).json()).data
  );

  const getTextareaValue = (textarea: HTMLDivElement | undefined) => {
    // ref and inputRef to TextField didn't work. this is a workaround
    return (textarea?.querySelector('#search-textarea') as HTMLTextAreaElement).value || "";
  }

  const handleClick = (e: Event) => {
    e.preventDefault();
    setQuery(getTextareaValue(refQuery));
  };

  return (
    <form onSubmit={handleClick}>
      <div class={styles.container}>
        <TextField class={styles.searchInput}
          id="search-textarea"
          ref={refQuery}
          multiline
          maxRows={5}
          onChange={(e) => { setDisabled(!e.target.value) }}
        />
        <Button class={styles.searchButton} variant="contained" type="submit" disabled={disabled()}>Search</Button>
        <div class={styles.searchResult} >{response.loading ? "Loading..." : response()}</div>
      </div>
    </form>
  );
}
