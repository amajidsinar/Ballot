const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Ballot", function () {
    it("Should return the new greeting", async function() {
        const Ballot = await ethers.getContractFactory("Ballot")
        const ballot = await Ballot.deploy()
        await ballot.deployed()
        const ballotAddress = ballot.address
        // console.log(ballotAddress)

        const accounts = await ethers.getSigners()
        for (const account of accounts) {
            console.log(account.address);
        }



    });
    
});
