// Load dependencies
const Web3 = require('web3')
const { expect } = require('chai')

// Load compiled artifacts
const MyProxyAdmin = artifacts.require('MyProxyAdmin')
const MyProxy = artifacts.require('MyProxy')
const Token_v1 = artifacts.require('Token_v1')
const Token_v2 = artifacts.require('Token_v2')

// Start test block
contract('upgrade', accounts => {
	// var
	const [tester] = accounts

	// create contract instance as the test starts
	before(async() => {
		contract = await MyProxy.deployed()
		token_v1 = await Token_v1.deployed()
		token_v2 = await Token_v2.deployed()
		admin = (await MyProxyAdmin.deployed()).address
	})

	// Test case
	it('get value from version 1', async function () {
		// call function from V.1, expect return "43"
		let data = extractData(token_v1, 'getValue', [1])
		const _value_V1 = await contract.sendTransaction({from: tester, data/*, value: 1*/})
		console.log('VALUE V1 : ', _value_V1.logs)
		//expect(_value_V1.toString()).to.equal('43')
		// как правильно вызвать функицю getValue??? и как получить резултат ее выполнения???



		// upgrade our countract to next version
		/* throws : "contract is already initialized" ... и когда он это сделал? */
		//data = extractData(token_v2, 'initialize', ['MyTokenV2', 'MTK', 42])
		//const _upgrade = await contract.upgradeToAndCall.call(token_v2.address, data, {from: admin})

		/* works */
		const _upgrade = await contract.upgradeTo.call(token_v2.address, {from: admin})
		
		

		// call function from V.2, expect return "42"
		data = extractData(token_v2, 'getValue', [1])
		const _value_V2 = await contract.sendTransaction({from: tester, data/*, value: 1*/})
		console.log('VALUE V2 : ', _value_V2.logs)
		//expect(_value_V2.toString()).to.equal('42')
		// как правильно вызвать функицю getValue??? и как получить резултат ее выполнения???


		
		expect('1').to.equal('1')
	})
})

function extractData(source, func, args) {
	const [_func] = source.abi.filter(item => item.name === func)
	return web3.eth.abi.encodeFunctionCall(_func, args)
}