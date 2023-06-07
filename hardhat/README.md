# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

Commands for background process:

```shell
nohup npx hardhat node > hardhat.log 2>&1 &
ps aux | grep "hardhat node"
tail -f /proc/<PID>/fd/1 
tail -f /hardhat/node.log
kill -9 <PID>
```
