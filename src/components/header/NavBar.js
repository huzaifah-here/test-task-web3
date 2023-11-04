import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.css";
import img from "../../images/logo.png";
import Web3 from "web3";
import { useState } from "react";
function BasicExample() {
  const [popup, setPopup] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [cart, setCart] = useState(false);
  const [menu, setMenu] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [storedWalletAddress, setStoredWalletAddress] = useState("");
  const LOCAL_STORAGE_KEY = "walletAddress";

  const saveWalletAddress = (address) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, address);
    setStoredWalletAddress(address);
  };
  const clearWalletData = () => {
    // Clear any locally stored wallet-related data (e.g., user's address)
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    setAccounts([]);
  };

  const disconnectFromMetaMask = async () => {
    console.log("Disconnecting from MetaMask"); // Add this line

    if (window.ethereum) {
      clearWalletData();
    }
  };

  async function connectToMetaMask() {
    if (window.ethereum) {
      // Connect to MetaMask
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3);
        setIsWalletConnected(true);

        // Retrieve user accounts
        const fetchedAccounts = await web3.eth.getAccounts();
        setAccounts(fetchedAccounts);

        if (fetchedAccounts.length > 0) {
          saveWalletAddress(fetchedAccounts[0]);
        }

        // Add event listener for account changes
        window.ethereum.on("accountsChanged", (newAccounts) => {
          if (newAccounts.length === 0) {
            // No accounts, user disconnected
            setIsWalletConnected(false);
            setStoredWalletAddress(""); // Clear stored address
          } else {
            // New accounts detected, user reconnected
            setAccounts(newAccounts);
            setIsWalletConnected(true);
            saveWalletAddress(newAccounts[0]);
          }
        });
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      setIsWalletConnected(false);
      console.error("MetaMask is not installed or not detected.");
    }
  }
  const handlePopup = () => {
    connectToMetaMask();
  };
  return (
    <Navbar expand="lg" style={{ background: "#0B0819" }}>
      <Container>
        <Navbar.Brand href="#home">
          {" "}
          <img src={img} className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Services</Nav.Link>
            <Nav.Link href="#home">Works</Nav.Link>
            <Nav.Link href="#link">Team</Nav.Link>
          </Nav>
          <div className="main-button">
            {web3 && accounts.length > 0 ? (
              <button
                className="navbar-section"
                onClick={disconnectFromMetaMask}
              >
                {String(accounts).substring(0, 9)}...
              </button>
            ) : (
              <button className="navbar-section" onClick={handlePopup}>
                Connect wallet
              </button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
