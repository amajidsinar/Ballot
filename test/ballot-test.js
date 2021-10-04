const { expect } = require("chai");
const { providers } = require("ethers");
const { ethers, waffle } = require("hardhat");


describe("Ballot", async() => {
    it("Check ballot basic functionality", async() => {
        const Ballot = await ethers.getContractFactory("Ballot")
        const ballot = await Ballot.deploy()
        await ballot.deployed()

        const provider = waffle.provider
        const accounts = await ethers.getSigners()

        var balanceManager = await provider.getBalance(accounts[0].address)
        var balanceManager = ethers.utils.formatEther(balanceManager)

        var balanceUser0 = await provider.getBalance(accounts[1].address)
        var balanceUser0 = ethers.utils.formatEther(balanceUser0)
        expect(balanceUser0).to.equal('10000.0')
        expect(balanceManager).to.not.equal('10000.0')
        })
    });
    

