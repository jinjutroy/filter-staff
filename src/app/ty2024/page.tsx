import React from "react";

import { Metadata } from "next";
import constantTy2024 from "./constant";
import favicon from "./favicon_io/favicon.ico";
import PageClient from "./page.client";

export const metadata: Metadata = {
  title: constantTy2024.title,
  description: constantTy2024.description,
  icons: {
    icon: favicon.src,
  },
};

const App: React.FC = () => {
  return <PageClient />;
};

export default App;
