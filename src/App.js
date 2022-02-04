import React, { useEffect, useState } from 'react';
import './App.css';
import CandyMachine from './CandyMachine';


const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    // specific to phantom, wait till page fully loaded before checking doe sol object
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          // console.log('Phantom wallet found!');

          // check if auth-ed connection with wallet
          const response = await solana.connect({ onlyIfTrusted: true });
          // console.log(
          //   'Connected with Public Key:',
          //   response.publicKey.toString()
          // );

          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      // console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🥦 BROCC Drop</p>
          <p className="sub-text">For BROCCs by BROCCs</p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && <CandyMachine walletAddress={window.solana} />}
        </div>
      </div>
    </div>
  );
};

export default App;
