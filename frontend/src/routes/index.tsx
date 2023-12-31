import { Title } from "solid-start";
import { Append } from "~/components/Append";
import { Query } from "~/components/Query";

export default function Home() {
  return (
    <main>
      <Title>DadGPT</Title>
      <h1>DadGPT</h1>
      <Query />
      <Append />
    </main>
  );
}
