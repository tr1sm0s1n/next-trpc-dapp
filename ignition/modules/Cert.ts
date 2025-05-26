import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const CertModule = buildModule('CertModule', (m) => {
  const cert = m.contract('Cert')

  return { cert }
})

export default CertModule
