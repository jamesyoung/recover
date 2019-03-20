const Recover = artifacts.require("./Recover.sol");

module.exports = function(deployer, accounts) {
    deployer.deploy(Recover);
};