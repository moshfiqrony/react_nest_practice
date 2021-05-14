import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ClientApp from "./MainApp";


export const App = () => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ClientApp />
    </QueryClientProvider>
  );
};

export default App;
