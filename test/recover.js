const Recover = artifacts.require(`./Recover.sol`)

contract('Recover', function(accounts){
    describe("verify signature", async function(){
      it("should verify", async function(){
        recover = await Recover.deployed()
        const msg = 'This is the message to be signed'
        let signature = await web3.eth.sign(msg, accounts[0])
        console.log('signature', signature)

        signature = signature.substr(2);
        const r = '0x' + signature.slice(0, 64)
        const s = '0x' + signature.slice(64, 128)
        const raw_v = '0x' + signature.slice(128, 130)
        var v = web3.utils.toDecimal(raw_v)
        if(v != 27 || v != 28) {
          v += 27
        }
        
        
        console.log(`r  : ${r}`)
        console.log(`s  : ${s}`)
        console.log(`v  : ${v}`)
        
        const fixed_msg = `\x19Ethereum Signed Message:\n${msg.length}${msg}`
        const fixed_msg_sha = web3.utils.soliditySha3(fixed_msg)
        const resp = await recover.recover.call(fixed_msg_sha, v, r, s)
        console.log()
        console.log('resp       ', resp)
        console.log('accounts[0]', accounts[0])
        assert.equal(resp, accounts[0])
      })
    })
})