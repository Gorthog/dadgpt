// @refresh reload
import { Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import NavBar from "./components/NavBar";
import styles from "./root.module.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title class={styles.caption}>DadGPT</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body class={styles.body}>
        <h1 class={styles.caption}>DadGPT</h1>
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <NavBar />
        <Scripts />
      </Body>
    </Html>
  );
}
