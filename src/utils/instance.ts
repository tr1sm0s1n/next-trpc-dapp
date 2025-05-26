import { ethers } from 'ethers'
import Cert from '../../ignition/deployments/chain-31337/artifacts/CertModule#Cert.json'
import details from '../../ignition/deployments/chain-31337/deployed_addresses.json'

export const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545')

export const getInstance = async () => {
  const signer = await provider.getSigner()
  return new ethers.Contract(details['CertModule#Cert'], Cert.abi, signer)
}
