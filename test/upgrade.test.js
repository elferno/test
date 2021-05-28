// Load dependencies
const Web3 = require('web3')
const { expect } = require('chai')

// Load compiled artifacts
const MyProxyAdmin = artifacts.require('MyProxyAdmin')
const MyProxy = artifacts.require('MyProxy')
const Token_v1 = artifacts.require('Token_v1')
const Token_v2 = artifacts.require('Token_v2')

// Start test block
contract('upgrade', ([user]) => {
	// var
	let token_v1,
		token_v2,
		proxy,
		proxy_admin

	// create contract instance as the test starts
	beforeEach(async() => {
		proxy_admin = await MyProxyAdmin.new()
		token_v1 = await Token_v1.new()

		//admin = adminProxy.address
		const data = compileData(token_v1, 'initialize',  ['MyToken', 'MTK', 42])
		proxy = await MyProxy.new(token_v1.address, proxy_admin.address, data)
	})

	// Test case
	it('get value from version 1', async function () {
		// call function from V.1, expect return "42"
		let token = await Token_v1.at(proxy.address)
		expect((await token.getValue({from: user})).toString()).to.equal('42')


		// deploy next version of token
		token_v2 = await Token_v2.new()
		

		// upgrade our countract to next version
		//const data = compileData(token_v2, 'initialize', ['MyTokenV2', 'MTK', 42])
		//await proxy_admin.upgradeAndCall(proxy.address, token_v2.address, data)
		await proxy_admin.upgrade(proxy.address, token_v2.address)
		
		
		// call function from V.2, expect return "43"
		token = await Token_v2.at(proxy.address)
		expect((await token.getValue(1, {from: user})).toString()).to.equal('43')
	})
})

function compileData(source, func, args) {
	const [_func] = source.abi.filter(item => item.name === func)
	return web3.eth.abi.encodeFunctionCall(_func, args)
}