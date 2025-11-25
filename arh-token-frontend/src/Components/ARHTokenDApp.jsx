import React, { useState } from 'react';
import { Wallet, Send, TrendingUp, Users, Copy, Check, AlertCircle } from 'lucide-react';

// This is a demonstration UI. In production, you'd use wagmi hooks and real blockchain data
const ARHTokenDApp = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('0');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const [txStatus, setTxStatus] = useState('');

  // Mock data - in production, this comes from your smart contract
  const tokenData = {
    name: 'ARH Token',
    symbol: 'ARH',
    totalSupply: '700,000',
    liquidityPool: '210,000',
    circulation: '490,000',
    contractAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  };

  const connectWallet = () => {
    // In production: use createAppKit and wagmi hooks
    setIsConnected(true);
    setWalletAddress('0x1234...5678');
    setBalance('1,250.50');
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setBalance('0');
  };

  const handleTransfer = () => {
    if (!recipient || !amount) {
      setTxStatus('error');
      return;
    }
    // In production: use wagmi's useWriteContract hook
    setTxStatus('pending');
    setTimeout(() => {
      setTxStatus('success');
      setRecipient('');
      setAmount('');
      setTimeout(() => setTxStatus(''), 3000);
    }, 2000);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(tokenData.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ARH</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ARH Token</h1>
                <p className="text-sm text-gray-500">ERC-20 Token Platform</p>
              </div>
            </div>
            
            {!isConnected ? (
              <button
                onClick={connectWallet}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
              >
                <Wallet size={20} />
                <span className="font-semibold">Connect Wallet</span>
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <p className="text-xs text-gray-500">Your Balance</p>
                  <p className="text-lg font-bold text-gray-900">{balance} ARH</p>
                </div>
                <div className="bg-green-100 px-4 py-2 rounded-lg">
                  <p className="text-xs text-green-700">Connected</p>
                  <p className="text-sm font-mono text-green-900">{walletAddress}</p>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-sm">Total Supply</p>
              <TrendingUp className="text-blue-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{tokenData.totalSupply}</p>
            <p className="text-xs text-gray-400 mt-1">ARH Tokens</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-sm">Liquidity Pool</p>
              <Users className="text-purple-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{tokenData.liquidityPool}</p>
            <p className="text-xs text-green-600 mt-1">30% Allocated</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-sm">Circulating</p>
              <Send className="text-green-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{tokenData.circulation}</p>
            <p className="text-xs text-gray-400 mt-1">70% in Circulation</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
            <p className="text-white/80 text-sm mb-2">Your Holdings</p>
            <p className="text-3xl font-bold">{isConnected ? balance : '0.00'}</p>
            <p className="text-xs text-white/70 mt-1">ARH Tokens</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transfer Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-6">
                <Send className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold text-gray-900">Transfer Tokens</h2>
              </div>

              {!isConnected ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Wallet className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600 mb-4">Connect your wallet to transfer tokens</p>
                  <button
                    onClick={connectWallet}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Connect Wallet
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipient Address
                    </label>
                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="0x..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (ARH)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Available: {balance} ARH
                    </p>
                  </div>

                  <button
                    onClick={handleTransfer}
                    disabled={txStatus === 'pending'}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {txStatus === 'pending' ? 'Processing...' : 'Send Tokens'}
                  </button>

                  {txStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2 text-green-800">
                      <Check size={20} />
                      <span>Transaction successful!</span>
                    </div>
                  )}

                  {txStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2 text-red-800">
                      <AlertCircle size={20} />
                      <span>Please fill in all fields</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Token Info Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Token Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold text-gray-900">{tokenData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Symbol:</span>
                  <span className="font-semibold text-gray-900">{tokenData.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Decimals:</span>
                  <span className="font-semibold text-gray-900">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Network:</span>
                  <span className="font-semibold text-gray-900">Ethereum</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-md p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Contract Address</h3>
              <div className="bg-black/30 rounded-lg p-3 mb-3">
                <p className="font-mono text-sm break-all">{tokenData.contractAddress}</p>
              </div>
              <button
                onClick={copyAddress}
                className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="text-blue-600 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">Important</p>
                  <p className="text-xs text-blue-700">
                    Always verify the contract address before making any transactions. Never share your private keys.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ARHTokenDApp;