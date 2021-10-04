const { expect } = require("chai");
const { providers } = require("ethers");
const { ethers, waffle } = require("hardhat");


describe("Ballot", function () {
    it("Check ballot basic functionality", async function() {
        beforeEach(async function() {
            const Ballot = await ethers.getContractFactory("Ballot")
            const ballot = await Ballot.deploy()
            await ballot.deployed()
            
            const provider = waffle.provider
            const accounts = await ethers.getSigners()
        })
        it("check manager status", async function(){
            var balanceManager = await provider.getBalance(accounts[0].address)
            var balanceManager = ethers.utils.formatEther(balanceManager)
            console.log(typeof(balanceManager))
            // expect(balanceManager) 
        })
        

        var balanceUser0 = await provider.getBalance(accounts[1].address)
        var balanceUser0 = ethers.utils.formatEther(balanceUser0) 
        
           
        
        // var balance


        console.log(balanceManager)

    });
    
});
