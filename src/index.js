import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { configureChains, createClient, WagmiConfig } from "wagmi";
// import { polygonMumbai } from "@wagmi/core/chains";
// import { publicProvider } from "wagmi/providers/public";
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";

// const { chains, provider, webSocketProvider } = configureChains(
//   [polygonMumbai],
//   [publicProvider()]
// );

// const client = createClient({
//   autoConnect: false,
//   provider,
//   webSocketProvider,
//   connectors: [new MetaMaskConnector({ chains: [polygonMumbai] })],
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
