import { Title } from "solid-start";
import { Append } from "~/components/Append";
import { Query } from "~/components/Query";

export default function Home() {
  return (
    <main>
      <Title>Hello DadGPT v0.0.1</Title>
      <h1>DadGPT</h1>
      <Query />
      <Append />
    </main>
  );
}
