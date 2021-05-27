const Web3 = require('web3')

const MyProxyAdmin = artifacts.require("MyProxyAdmin")
const MyProxy = artifacts.require("MyProxy")
const Token_v1 = artifacts.require("Token_v1")
const Token_v2 = artifacts.require("Token_v2")

module.exports = async (deployer) => {
  // deploy token V.1 (Logic V.1)
  await deployer.deploy(Token_v1)
  const _logic = await Token_v1.deployed()

  // deploy ProxyAdmin
  await deployer.deploy(MyProxyAdmin)
  const _admin = await MyProxyAdmin.deployed()

  // deploy Proxy with ProxyAdmin and Logic V.1
  const [_func] = _logic.abi.filter(item => item.name === 'initialize')
  const _data = web3.eth.abi.encodeFunctionCall(_func, ['MyTokenV1', 'MTK', 42])
  // ???
  await deployer.deploy(MyProxy, _logic.address, _admin.address, _data)
  // как правильно передать _data, чтобы вызвалась функуция initialize('MyTokenV1', 'MTK', 42)
  // для контракта token V.1 (Logic V.1)
  // ???

  // deploy token V.2
  await deployer.deploy(Token_v2)
};
