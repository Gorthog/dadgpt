import { createSignal, createResource } from "solid-js";
import TextField from "@suid/material/TextField";
import Button from "@suid/material/Button"
import styles from "./Append.module.css"
import { getTextareaValue } from "~/common/utils";

export function Append() {
  let refText: HTMLDivElement | undefined;

  const [text, setText] = createSignal<string>();
  const [disabled, setDisabled] = createSignal<boolean>(true);
  const [message, setMessage] = createSignal<string>("");

  const [response] = createResource(text, async (text: string) => {
    await fetch(`https://dadgpt-dbfrvs4mzq-zf.a.run.app/append`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });
    setDisabled(true);
    setMessage("Added!");
  }
  );

  const handleClick = (e: Event) => {
    e.preventDefault();
    setText(getTextareaValue(refText, "#append-textarea"));
  };

  return (
    <form onSubmit={handleClick}>
      <div class={styles.container}>
        <TextField class={styles.appendInput}
          id="append-textarea"
          ref={refText}
          multiline
          maxRows={5}
          onChange={(e) => { setDisabled(!e.target.value) }}
        />
        <Button class={styles.appendButton} variant="contained" type="submit" disabled={disabled()}>Add</Button>
        <div class={styles.appendResult}>{response.loading ? "Loading..." : message()}</div>
      </div>
    </form>
  );
}
