let web3;
let contract;
const resultDiv = document.getElementById("result");
const connectBtn = document.getElementById("connectBtn");

// ✅ Replace with your deployed contract address
const contractAddress = "0xf69871d0A6e217E4459585c6c5c8BBdd1Ed41b86";

// ✅ Paste your ABI here (only the abi array)
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "name", "type": "string" },
      { "indexed": false, "internalType": "address", "name": "owner", "type": "address" }
    ],
    "name": "ItemAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "stage", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "details", "type": "string" },
      { "indexed": false, "internalType": "address", "name": "updatedBy", "type": "address" }
    ],
    "name": "StageUpdated",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_id", "type": "uint256" },
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "string", "name": "_farmDetails", "type": "string" }
    ],
    "name": "addItem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }],
    "name": "getItem",
    "outputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" },
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "farm", "type": "string" },
      { "internalType": "string", "name": "transport", "type": "string" },
      { "internalType": "string", "name": "warehouse", "type": "string" },
      { "internalType": "string", "name": "retail", "type": "string" },
      { "internalType": "address", "name": "owner", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_id", "type": "uint256" },
      { "internalType": "string", "name": "_details", "type": "string" }
    ],
    "name": "updateTransport",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_id", "type": "uint256" },
      { "internalType": "string", "name": "_details", "type": "string" }
    ],
    "name": "updateWarehouse",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_id", "type": "uint256" },
      { "internalType": "string", "name": "_details", "type": "string" }
    ],
    "name": "updateRetail",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// ✅ Connect MetaMask
async function connectMetaMask() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);

      const accounts = await web3.eth.getAccounts();
      resultDiv.innerText = "✅ Connected: " + accounts[0];

      contract = new web3.eth.Contract(contractABI, contractAddress);
      console.log("✅ Smart contract loaded:", contract);
    } catch (error) {
      console.error("❌ MetaMask connection error:", error);
      alert("MetaMask connection failed.");
    }
  } else {
    alert("Please install MetaMask!");
  }
}

connectBtn.addEventListener("click", connectMetaMask);

// ✅ Add Product
document.getElementById("addProductBtn").addEventListener("click", async () => {
  const id = document.getElementById("productId").value;
  const name = document.getElementById("productName").value;
  const farm = document.getElementById("farmDetails").value;

  if (!id || !name || !farm) {
    alert("⚠️ Please fill in all fields!");
    return;
  }

  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.addItem(id, name, farm).send({ from: accounts[0] });
    alert("✅ Product added successfully!");
  } catch (err) {
    console.error("❌ Error adding product:", err);
    alert("❌ Failed to add product. Check console for details.");
  }
});

// ✅ Update Transport
document.getElementById("updateTransportBtn").addEventListener("click", async () => {
  const id = document.getElementById("transId").value;
  const details = document.getElementById("transDetails").value;
  if (!id || !details) return alert("⚠️ Enter both ID and details!");

  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.updateTransport(id, details).send({ from: accounts[0] });
    alert("🚚 Transport stage updated!");
  } catch (err) {
    console.error(err);
    alert("❌ Error updating transport stage.");
  }
});

// ✅ Update Warehouse
document.getElementById("updateWarehouseBtn").addEventListener("click", async () => {
  const id = document.getElementById("wareId").value;
  const details = document.getElementById("wareDetails").value;
  if (!id || !details) return alert("⚠️ Enter both ID and details!");

  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.updateWarehouse(id, details).send({ from: accounts[0] });
    alert("🏭 Warehouse stage updated!");
  } catch (err) {
    console.error(err);
    alert("❌ Error updating warehouse stage.");
  }
});

// ✅ Update Retail
document.getElementById("updateRetailBtn").addEventListener("click", async () => {
  const id = document.getElementById("retailId").value;
  const details = document.getElementById("retailDetails").value;
  if (!id || !details) return alert("⚠️ Enter both ID and details!");

  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.updateRetail(id, details).send({ from: accounts[0] });
    alert("🛒 Retail stage updated!");
  } catch (err) {
    console.error(err);
    alert("❌ Error updating retail stage.");
  }
});

// ✅ View Product
document.getElementById("viewBtn").addEventListener("click", async () => {
  const id = document.getElementById("viewId").value;
  if (!id) return alert("⚠️ Enter product ID!");

  try {
    const data = await contract.methods.getItem(id).call();
    document.getElementById("viewResult").innerText = `
📦 ID: ${data.id}
🧺 Name: ${data.name}
🌾 Farm: ${data.farm}
🚚 Transport: ${data.transport}
🏭 Warehouse: ${data.warehouse}
🛒 Retail: ${data.retail}
👤 Owner: ${data.owner}
    `;
  } catch (err) {
    console.error(err);
    alert("❌ Product not found or error fetching data.");
  }
});
