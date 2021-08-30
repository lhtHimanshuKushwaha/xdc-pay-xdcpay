//load modules
const explorerLinks = require('../helpers/get-explorer-links')
const faucetLinks = require('../helpers/get-faucet-links')
const RPCEndpoints = require('../helpers/get-rpc-endpoints')
const netProps = require('../helpers/get-net-properties')

const chai = require('chai')
const assert = chai.assert

describe('xdc-net-props', () => {
	let claimPrefix = 'should return correct explorer link for'
	describe('gets explorer links', () => {
		describe ('getExplorerAccountLinkFor()', () => {
			it(`${claimPrefix} Sokol XinFin Network`, () => {
				assert.equal(explorerLinks.getExplorerAccountLinkFor('0x95426f2bc716022fcf1def006dbc4bb81f5b5164', 77), 'https://blockscout.com/poa/sokol/address/0x95426f2bc716022fcf1def006dbc4bb81f5b5164')
			})
			it(`${claimPrefix} Core XinFin Network`, () => {
				assert.equal(explorerLinks.getExplorerAccountLinkFor('0x15c40c6de9f2299680a4522d8635c9b394eded09', 99), 'https://blockscout.com/poa/core/address/0x15c40c6de9f2299680a4522d8635c9b394eded09')
			})
			it(`${claimPrefix} Dai Chain`, () => {
				assert.equal(explorerLinks.getExplorerAccountLinkFor('0x15c40c6de9f2299680a4522d8635c9b394eded09', 100), 'https://blockscout.com/poa/dai/address/0x15c40c6de9f2299680a4522d8635c9b394eded09')
			})
			it(`${claimPrefix} Mainnet`, () => {
				assert.equal(explorerLinks.getExplorerAccountLinkFor('0x70FDd102DDB03Dc55B1719E76DfeA784916621fd', 1), 'https://blockscout.com/eth/mainnet/address/0x70FDd102DDB03Dc55B1719E76DfeA784916621fd')
			})
			it(`${claimPrefix} Ropsten`, () => {
				assert.equal(explorerLinks.getExplorerAccountLinkFor('0x70FDd102DDB03Dc55B1719E76DfeA784916621fd', 3), 'https://blockscout.com/eth/ropsten/address/0x70FDd102DDB03Dc55B1719E76DfeA784916621fd')
			})
			it(`${claimPrefix} Rinkeby`, () => {
				assert.equal(explorerLinks.getExplorerAccountLinkFor('0x70FDd102DDB03Dc55B1719E76DfeA784916621fd', 4), 'https://blockscout.com/eth/rinkeby/address/0x70FDd102DDB03Dc55B1719E76DfeA784916621fd')
			})
			it(`${claimPrefix} Kovan`, () => {
				assert.equal(explorerLinks.getExplorerAccountLinkFor('0x70FDd102DDB03Dc55B1719E76DfeA784916621fd', 42), 'https://blockscout.com/eth/kovan/address/0x70FDd102DDB03Dc55B1719E76DfeA784916621fd')
			})
			it(`${claimPrefix} XDC Mainnet`, () => {
				assert.equal(explorerLinks.getExplorerAccountLinkFor('0x70FDd102DDB03Dc55B1719E76DfeA784916621fd', 30), 'https://blockscout.com/xdc/mainnet/address/0x70FDd102DDB03Dc55B1719E76DfeA784916621fd')
			})
			it(`${claimPrefix} Goerli Testnet`, () => {
				assert.equal(explorerLinks.getExplorerAccountLinkFor('0xd8fe15886d2dcbc5d7c06394beb417aadaf1eee0', 5), 'https://blockscout.com/eth/goerli/address/0xd8fe15886d2dcbc5d7c06394beb417aadaf1eee0')
			})
			it(`${claimPrefix} Ethereum Classic`, () => {
				assert.equal(explorerLinks.getExplorerAccountLinkFor('0xd8fe15886d2dcbc5d7c06394beb417aadaf1eee0', 61), 'https://blockscout.com/etc/mainnet/address/0xd8fe15886d2dcbc5d7c06394beb417aadaf1eee0')
			})
			it(`${claimPrefix} Ethereum Classic`, () => {
				assert.equal(explorerLinks.getExplorerAccountLinkFor('0xd8fe15886d2dcbc5d7c06394beb417aadaf1eee0', '61'), 'https://blockscout.com/etc/mainnet/address/0xd8fe15886d2dcbc5d7c06394beb417aadaf1eee0')
			})
		})

		describe ('getExplorerTxLinkFor()', () => {
			it(`${claimPrefix} Sokol XinFin Network`, () => {
				assert.equal(explorerLinks.getExplorerTxLinkFor('0x0af429e7a51e29ede74fe0748ffb6a141ffe41cfaaeadb4fca8b28c1914254c0', 77), 'https://blockscout.com/poa/sokol/tx/0x0af429e7a51e29ede74fe0748ffb6a141ffe41cfaaeadb4fca8b28c1914254c0')
			})
			it(`${claimPrefix} Core XinFin Network`, () => {
				assert.equal(explorerLinks.getExplorerTxLinkFor('0xb3b01bcc1a73477cd86de989cc207fa59f87ea601dea298772f4b1b3f6f1407e', 99), 'https://blockscout.com/poa/core/tx/0xb3b01bcc1a73477cd86de989cc207fa59f87ea601dea298772f4b1b3f6f1407e')
			})
			it(`${claimPrefix} Dai Chain`, () => {
				assert.equal(explorerLinks.getExplorerTxLinkFor('0xb3b01bcc1a73477cd86de989cc207fa59f87ea601dea298772f4b1b3f6f1407e', 100), 'https://blockscout.com/poa/dai/tx/0xb3b01bcc1a73477cd86de989cc207fa59f87ea601dea298772f4b1b3f6f1407e')
			})
			it(`${claimPrefix} Mainnet`, () => {
				assert.equal(explorerLinks.getExplorerTxLinkFor('0x892c825d1ec25b0a1a27aa5dff5b54fc4488a45029d0087fc40d3d733ded7305', 1), 'https://blockscout.com/eth/mainnet/tx/0x892c825d1ec25b0a1a27aa5dff5b54fc4488a45029d0087fc40d3d733ded7305')
			})
			it(`${claimPrefix} Ropsten`, () => {
				assert.equal(explorerLinks.getExplorerTxLinkFor('0x892c825d1ec25b0a1a27aa5dff5b54fc4488a45029d0087fc40d3d733ded7305', 3), 'https://blockscout.com/eth/ropsten/tx/0x892c825d1ec25b0a1a27aa5dff5b54fc4488a45029d0087fc40d3d733ded7305')
			})
			it(`${claimPrefix} Rinkeby`, () => {
				assert.equal(explorerLinks.getExplorerTxLinkFor('0x892c825d1ec25b0a1a27aa5dff5b54fc4488a45029d0087fc40d3d733ded7305', 4), 'https://blockscout.com/eth/rinkeby/tx/0x892c825d1ec25b0a1a27aa5dff5b54fc4488a45029d0087fc40d3d733ded7305')
			})
			it(`${claimPrefix} Kovan`, () => {
				assert.equal(explorerLinks.getExplorerTxLinkFor('0x892c825d1ec25b0a1a27aa5dff5b54fc4488a45029d0087fc40d3d733ded7305', 42), 'https://blockscout.com/eth/kovan/tx/0x892c825d1ec25b0a1a27aa5dff5b54fc4488a45029d0087fc40d3d733ded7305')
			})
			it(`${claimPrefix} XDC Mainnet`, () => {
				assert.equal(explorerLinks.getExplorerTxLinkFor('0x33a7511c7838f5be0ade40d732f0a51cd28c8a641de9079836170cbdac8e7d83', 30), 'https://blockscout.com/xdc/mainnet/tx/0x33a7511c7838f5be0ade40d732f0a51cd28c8a641de9079836170cbdac8e7d83')
			})
			it(`${claimPrefix} Goerli Testnet`, () => {
				assert.equal(explorerLinks.getExplorerTxLinkFor('0xb9599801c83e6aa20769e7dcdce0989c7380ba78cb587d3d7db11e1b30b17b54', 5), 'https://blockscout.com/eth/goerli/tx/0xb9599801c83e6aa20769e7dcdce0989c7380ba78cb587d3d7db11e1b30b17b54')
			})
			it(`${claimPrefix} Ethereum Classic`, () => {
				assert.equal(explorerLinks.getExplorerTxLinkFor('0x430c90335b32fdcd92e54991668023d58b72bce836e204a81c6d97506c7137e5', 61), 'https://blockscout.com/etc/mainnet/tx/0x430c90335b32fdcd92e54991668023d58b72bce836e204a81c6d97506c7137e5')
			})
		})

		describe ('getExplorerTokenLinkFor()', () => {
			it(`${claimPrefix} Sokol XinFin Network`, () => {
				assert.equal(explorerLinks.getExplorerTokenLinkFor('0xcf2AEDCfb4ff2c9020fb61c41226A4DfD77D12dE', '0x70FDd102DDB03Dc55B1719E76DfeA784916621fd', 77), 'https://blockscout.com/poa/sokol/tokens/0xcf2AEDCfb4ff2c9020fb61c41226A4DfD77D12dE')
			})
			it(`${claimPrefix} Core XinFin Network`, () => {
				assert.equal(explorerLinks.getExplorerTokenLinkFor('0xcf2AEDCfb4ff2c9020fb61c41226A4DfD77D12dE', '0x70FDd102DDB03Dc55B1719E76DfeA784916621fd', 99), 'https://blockscout.com/poa/core/tokens/0xcf2AEDCfb4ff2c9020fb61c41226A4DfD77D12dE')
			})
			it(`${claimPrefix} Dai Chain`, () => {
				assert.equal(explorerLinks.getExplorerTokenLinkFor('0xabe71e6a260c2eea3c30864dc50639100aa315f6', '0x70FDd102DDB03Dc55B1719E76DfeA784916621fd', 100), 'https://blockscout.com/poa/dai/tokens/0xabe71e6a260c2eea3c30864dc50639100aa315f6')
			})
			it(`${claimPrefix} Mainnet`, () => {
				assert.equal(explorerLinks.getExplorerTokenLinkFor('0x5a386eb0fcbfee3f0d759e263053c09162ff102d', '0x70FDd102DDB03Dc55B1719E76DfeA784916621fd', 1), 'https://blockscout.com/eth/mainnet/tokens/0x5a386eb0fcbfee3f0d759e263053c09162ff102d')
			})
			it(`${claimPrefix} Ropsten`, () => {
				assert.equal(explorerLinks.getExplorerTokenLinkFor('0xcf2AEDCfb4ff2c9020fb61c41226A4DfD77D12dE', '0x70FDd102DDB03Dc55B1719E76DfeA784916621fd', 3), 'https://blockscout.com/eth/ropsten/tokens/0xcf2AEDCfb4ff2c9020fb61c41226A4DfD77D12dE')
			})
			it(`${claimPrefix} Rinkeby`, () => {
				assert.equal(explorerLinks.getExplorerTokenLinkFor('0x4cc97adba4298d575ad22a42a976af4e2250b328', '0x70FDd102DDB03Dc55B1719E76DfeA784916621fd', 4), 'https://blockscout.com/eth/rinkeby/tokens/0x4cc97adba4298d575ad22a42a976af4e2250b328')
			})
			it(`${claimPrefix} Kovan`, () => {
				assert.equal(explorerLinks.getExplorerTokenLinkFor('0x50c9fd8e20792e2decc5e35a0c1d17a51555347b', '0x70FDd102DDB03Dc55B1719E76DfeA784916621fd', 42), 'https://blockscout.com/eth/kovan/tokens/0x50c9fd8e20792e2decc5e35a0c1d17a51555347b')
			})
			it(`${claimPrefix} XDC Mainnet`, () => {
				assert.equal(explorerLinks.getExplorerTokenLinkFor('0x16cb2604ce5951c8506fbf690d816be6d0aa00fb', '0x604056c0f88aed17ef975269aab1ae9d02840bb2', 30), 'https://blockscout.com/xdc/mainnet/tokens/0x16cb2604ce5951c8506fbf690d816be6d0aa00fb')
			})
			it(`${claimPrefix} Goerli testnet`, () => {
				assert.equal(explorerLinks.getExplorerTokenLinkFor('0x7af963cf6d228e564e2a0aa0ddbf06210b38615d', '0x604056c0f88aed17ef975269aab1ae9d02840bb2', 5), 'https://blockscout.com/eth/goerli/tokens/0x7af963cf6d228e564e2a0aa0ddbf06210b38615d')
			})
			it(`${claimPrefix} Ethereum Classic`, () => {
				assert.equal(explorerLinks.getExplorerTokenLinkFor('0x1ac1c8b874c7b889113a036ba443b082554be5d0', '0x604056c0f88aed17ef975269aab1ae9d02840bb2', 61), 'https://blockscout.com/etc/mainnet/tokens/0x1ac1c8b874c7b889113a036ba443b082554be5d0')
			})
		})
	})

	claimPrefix = 'should return correct faucet link for'
	describe('get faucet links', () => {
		it(`${claimPrefix} Sokol XinFin Network`, () => {
			const sokolFaucetLinks = faucetLinks.getFaucetLinks(77)
			assert.equal(sokolFaucetLinks.length, 1)
			if (sokolFaucetLinks.length > 0) {
				assert.equal(sokolFaucetLinks[0], 'https://faucet.poa.network/')
			}
		})
		it(`${claimPrefix} Ropsten Network`, () => {
			const ropstenFaucetLinks = faucetLinks.getFaucetLinks(3)
			assert.equal(ropstenFaucetLinks.length, 1)
			if (ropstenFaucetLinks.length > 0) {
				assert.equal(ropstenFaucetLinks[0], 'https://faucet.metamask.io/')
			}
		})
		it(`${claimPrefix} Rinkeby Network`, () => {
			const rinkebyFaucetLinks = faucetLinks.getFaucetLinks(4)
			assert.equal(rinkebyFaucetLinks.length, 1)
			if (rinkebyFaucetLinks.length > 0) {
				assert.equal(rinkebyFaucetLinks[0], 'https://faucet.rinkeby.io/')
			}
		})
		it(`${claimPrefix} Kovan Network`, () => {
			const kovanFaucetLinks = faucetLinks.getFaucetLinks(42)
			assert.equal(kovanFaucetLinks.length, 2)
			if (kovanFaucetLinks.length > 0) {
				assert.equal(kovanFaucetLinks[0], 'https://faucet.kovan.network/')
				assert.equal(kovanFaucetLinks[1], 'https://gitter.im/kovan-testnet/faucet/')
			}
		})
		it(`${claimPrefix} XDC Testnet`, () => {
			const XDCFaucetLinks = faucetLinks.getFaucetLinks(31)
			assert.equal(XDCFaucetLinks.length, 1)
			if (XDCFaucetLinks.length > 0) {
				assert.equal(XDCFaucetLinks[0], 'https://faucet.testnet.xdc.co/')
			}
		})
		it(`${claimPrefix} Goerli Network`, () => {
			const goerliFaucetLinks = faucetLinks.getFaucetLinks(5)
			assert.equal(goerliFaucetLinks.length, 1)
			if (goerliFaucetLinks.length > 0) {
				assert.equal(goerliFaucetLinks[0], 'https://goerli-faucet.slock.it/')
			}
		})
		it('should not return faucet link for production blockchains', () => {
			assert.equal(faucetLinks.getFaucetLinks(1).length, 0)
			assert.equal(faucetLinks.getFaucetLinks(99).length, 0)
			assert.equal(faucetLinks.getFaucetLinks(100).length, 0)
			assert.equal(faucetLinks.getFaucetLinks(30).length, 0)
		})
	})

	claimPrefix = 'should return correct RPC endpoint for'
	describe('get RPC endpoints', () => {
		it(`${claimPrefix} Sokol XinFin Network`, () => {
			const sokolRPCEndpoints = RPCEndpoints.getRPCEndpoints(77)
			assert.equal(sokolRPCEndpoints.length, 1)
			if (sokolRPCEndpoints.length > 0) {
				assert.equal(sokolRPCEndpoints[0], 'https://sokol.poa.network/')
			}
		})
		it(`${claimPrefix} Ropsten Network`, () => {
			const ropstenRPCEndpoints = RPCEndpoints.getRPCEndpoints(3)
			assert.equal(ropstenRPCEndpoints.length, 1)
			if (ropstenRPCEndpoints.length > 0) {
				assert.equal(ropstenRPCEndpoints[0], 'https://ropsten.infura.io/')
			}
		})
		it(`${claimPrefix} Rinkeby Network`, () => {
			const rinkebyRPCEndpoints = RPCEndpoints.getRPCEndpoints(4)
			assert.equal(rinkebyRPCEndpoints.length, 1)
			if (rinkebyRPCEndpoints.length > 0) {
				assert.equal(rinkebyRPCEndpoints[0], 'https://rinkeby.infura.io/')
			}
		})
		it(`${claimPrefix} Kovan Network`, () => {
			const kovanRPCEndpoints = RPCEndpoints.getRPCEndpoints(42)
			assert.equal(kovanRPCEndpoints.length, 1)
			if (kovanRPCEndpoints.length > 0) {
				assert.equal(kovanRPCEndpoints[0], 'https://kovan.infura.io/')
			}
		})
		it(`${claimPrefix} Mainnet`, () => {
			const MainnetRPCEndpoints = RPCEndpoints.getRPCEndpoints(1)
			assert.equal(MainnetRPCEndpoints.length, 1)
			if (MainnetRPCEndpoints.length > 0) {
				assert.equal(MainnetRPCEndpoints[0], 'https://mainnet.infura.io/')
			}
		})
		it(`${claimPrefix} Core XinFin Network`, () => {
			const POARPCEndpoints = RPCEndpoints.getRPCEndpoints(99)
			assert.equal(POARPCEndpoints.length, 1)
			if (POARPCEndpoints.length > 0) {
				assert.equal(POARPCEndpoints[0], 'https://core.poa.network/')
			}
		})
		it(`${claimPrefix} xDai chain`, () => {
			const xDaiRPCEndpoints = RPCEndpoints.getRPCEndpoints(100)
			assert.equal(xDaiRPCEndpoints.length, 1)
			if (xDaiRPCEndpoints.length > 0) {
				assert.equal(xDaiRPCEndpoints[0], 'https://dai.poa.network/')
			}
		})
		it(`${claimPrefix} XDC Mainnet`, () => {
			const XDCRPCEndpoints = RPCEndpoints.getRPCEndpoints(30)
			assert.equal(XDCRPCEndpoints.length, 1)
			if (XDCRPCEndpoints.length > 0) {
				assert.equal(XDCRPCEndpoints[0], 'https://public-node.xdc.co')
			}
		})
		it(`${claimPrefix} XDC TestNet`, () => {
			const XDCRPCEndpoints = RPCEndpoints.getRPCEndpoints(31)
			assert.equal(XDCRPCEndpoints.length, 1)
			if (XDCRPCEndpoints.length > 0) {
				assert.equal(XDCRPCEndpoints[0], 'https://public-node.testnet.xdc.co')
			}
		})
		it(`${claimPrefix} Goerli testnet`, () => {
			const GoerliRPCEndpoints = RPCEndpoints.getRPCEndpoints(5)
			assert.equal(GoerliRPCEndpoints.length, 1)
			if (GoerliRPCEndpoints.length > 0) {
				assert.equal(GoerliRPCEndpoints[0], 'https://goerli.blockscout.com/')
			}
		})
		it(`${claimPrefix} Ethereum Classic`, () => {
			const ETCRPCEndpoints = RPCEndpoints.getRPCEndpoints(61)
			assert.equal(ETCRPCEndpoints.length, 1)
			if (ETCRPCEndpoints.length > 0) {
				assert.equal(ETCRPCEndpoints[0], 'https://classic.blockscout.com/')
			}
		})
	})

	claimPrefix = 'should return correct display name for'
	describe('get network properties', () => {
		it(`${claimPrefix} Sokol XinFin Network`, () => {
			assert.equal(netProps.getNetworkDisplayName(77), 'Sokol Test Network')
		})
		it(`${claimPrefix} Core XinFin Network`, () => {
			assert.equal(netProps.getNetworkDisplayName(99), 'POA Core')
		})
		it(`${claimPrefix} DAI chain`, () => {
			assert.equal(netProps.getNetworkDisplayName(100), 'xDai Chain')
		})
		it(`${claimPrefix} Mainnet`, () => {
			assert.equal(netProps.getNetworkDisplayName(1), 'Main Ethereum Network')
		})
		it(`${claimPrefix} XDC Mainnet`, () => {
			assert.equal(netProps.getNetworkDisplayName(30), 'XDC Mainnet')
		})
		it(`${claimPrefix} Ropsten`, () => {
			assert.equal(netProps.getNetworkDisplayName(3), 'Ropsten Test Network')
		})
		it(`${claimPrefix} Rinkeby`, () => {
			assert.equal(netProps.getNetworkDisplayName(4), 'Rinkeby Test Network')
		})
		it(`${claimPrefix} Kovan`, () => {
			assert.equal(netProps.getNetworkDisplayName(42), 'Kovan Test Network')
		})
		it(`${claimPrefix} XDC Testnet`, () => {
			assert.equal(netProps.getNetworkDisplayName(31), 'XDC Testnet')
		})
		it(`${claimPrefix} Goerli Testnet`, () => {
			assert.equal(netProps.getNetworkDisplayName(5), 'Görli Test Network')
		})
		it(`${claimPrefix} Ethereum Classic`, () => {
			assert.equal(netProps.getNetworkDisplayName(61), 'Ethereum Classic')
		})
		it(`${claimPrefix} Sokol XinFin Network`, () => {
			assert.equal(netProps.getNetworkDisplayName('77'), 'Sokol Test Network')
		})

		claimPrefix = 'should return correct coin name for'
		it(`${claimPrefix} Sokol XinFin Network`, () => {
			assert.equal(netProps.getNetworkCoinName(77), 'POA')
		})
		it(`${claimPrefix} Core XinFin Network`, () => {
			assert.equal(netProps.getNetworkCoinName(99), 'POA')
		})
		it(`${claimPrefix} DAI chain`, () => {
			assert.equal(netProps.getNetworkCoinName(100), 'xDAI')
		})
		it(`${claimPrefix} Mainnet`, () => {
			assert.equal(netProps.getNetworkCoinName(1), 'ETH')
		})
		it(`${claimPrefix} XDC Mainnet`, () => {
			assert.equal(netProps.getNetworkCoinName(30), 'XDC')
		})
		it(`${claimPrefix} Ropsten`, () => {
			assert.equal(netProps.getNetworkCoinName(3), 'ETH')
		})
		it(`${claimPrefix} Rinkeby`, () => {
			assert.equal(netProps.getNetworkCoinName(4), 'ETH')
		})
		it(`${claimPrefix} Kovan`, () => {
			assert.equal(netProps.getNetworkCoinName(42), 'ETH')
		})
		it(`${claimPrefix} XDC Testnet`, () => {
			assert.equal(netProps.getNetworkCoinName(31), 'XDC')
		})
		it(`${claimPrefix} Goerli Testnet`, () => {
			assert.equal(netProps.getNetworkCoinName(5), 'GöETH')
		})
		it(`${claimPrefix} Ethereum Classic`, () => {
			assert.equal(netProps.getNetworkCoinName(61), 'ETC')
		})

		it('Sokol XinFin Network is a testnet', () => {
			assert.equal(netProps.isTestnet(77), true)
		})
		it('Core XinFin Network is not a testnet', () => {
			assert.equal(netProps.isTestnet(99), false)
		})
		it('DAI chain is not a testnet', () => {
			assert.equal(netProps.isTestnet(100), false)
		})
		it('Mainnet is not a testnet', () => {
			assert.equal(netProps.isTestnet(1), false)
		})
		it('XDC Mainnet is not a testnet', () => {
			assert.equal(netProps.isTestnet(30), false)
		})
		it('Ropsten is a testnet', () => {
			assert.equal(netProps.isTestnet(3), true)
		})
		it('Rinkeby is a testnet', () => {
			assert.equal(netProps.isTestnet(4), true)
		})
		it('Kovan is a testnet', () => {
			assert.equal(netProps.isTestnet(42), true)
		})
		it('XDC Testnet is a testnet', () => {
			assert.equal(netProps.isTestnet(31), true)
		})
		it('Goerli Testnet is a testnet', () => {
			assert.equal(netProps.isTestnet(5), true)
		})
		it('Ethereum Classic is not a testnet', () => {
			assert.equal(netProps.isTestnet(61), false)
		})
	})
})