(async function () {
  const providerButton = document.getElementById("connect");
  const mintButton = document.getElementById("mint");
  const status = document.getElementById("status");
  const supplyDiv = document.getElementById("supply");

  // Paste your deployed contract address here after deploying with Remix/Hardhat
  const CONTRACT_ADDRESS = "0xYourDeployedContractAddress";
  let signer, contract;

  providerButton.onclick = async () => {
    if (!window.ethereum) {
      status.innerText = "No wallet found. Install MetaMask.";
      return;
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();

    const abi = await fetch("../abi/SimpleNFT.json").then(r => r.json());
    contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    status.innerText = "Wallet connected.";
    await refreshSupply();
  };

  mintButton.onclick = async () => {
    if (!contract) {
      status.innerText = "Connect wallet first.";
      return;
    }
    status.innerText = "Minting...";
    const tx = await contract.mint();
    await tx.wait();
    status.innerText = "Minted! Tx: " + tx.hash;
    await refreshSupply();
  };

  async function refreshSupply() {
    try {
      const totalSupply = await contract.totalSupply();
      supplyDiv.innerText = "Total Supply: " + totalSupply.toString();
    } catch (e) {
      // ignore until contract is set
    }
  }
})();
