import { Title } from "solid-start";
import Counter from "~/components/Counter";
import { Query } from "~/components/Query";

export default function Home() {
  return (
    <main>
      <Title>Hello DadGPT</Title>
      <h1>DadGPT</h1>
      <Query />
    </main>
  );
}
