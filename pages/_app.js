import styles from "../styles/globals.css";
import Layout from '../components/layout/Layout';
import { ApolloClient, InMemoryCache } from "@apollo/client";


export const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
