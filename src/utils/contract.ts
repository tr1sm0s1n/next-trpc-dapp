import { createClient, getContract, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { hardhat } from 'viem/chains'
import Cert from '../../ignition/deployments/chain-31337/artifacts/CertModule#Cert.json'
import details from '../../ignition/deployments/chain-31337/deployed_addresses.json'

export const client = createClient({
  chain: hardhat,
  account: privateKeyToAccount(
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  ),
  transport: http(),
})

export const contract = getContract({
  address: details['CertModule#Cert'] as `0x${string}`,
  abi: Cert.abi,
  client: client,
})
