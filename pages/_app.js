import GlobalStyles from "../components/GlobalStyles";

const MyApp = ({ Component, pageProps }) => {
  return (
    <GlobalStyles>
      <Component {...pageProps} /> 
    </GlobalStyles>
  );
}

export default MyApp;