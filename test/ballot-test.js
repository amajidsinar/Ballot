const { expect } = require("chai");
const { ethers, waffle} = require("hardhat");

describe("Ballot", () => {
    before(async () => {
        this.Ballot = await ethers.getContractFactory("Ballot")
        this.signers = await ethers.getSigners()
        this.alice = this.signers[0]
        this.bob = this.signers[1]
        this.carol = this.signers[2]
        this.provider = waffle.provider
    })

    beforeEach(async () => {
        this.ballot = await this.Ballot.deploy()
        await this.ballot.deployed()
    })

    it("should have correct balance", async() => {
        var aliceBalance = await this.provider.getBalance(this.alice.address)
        var aliceBalance = ethers.utils.formatEther(aliceBalance)
        expect(aliceBalance).to.not.equal('10000.0')

        var bobBalance = await this.provider.getBalance(this.bob.address)
        var bobBalance = ethers.utils.formatEther(bobBalance)
        expect(bobBalance).to.equal('10000.0')

        var carolBalance = await this.provider.getBalance(this.carol.address)
        var carolBalance = ethers.utils.formatEther(carolBalance)
        expect(carolBalance).to.equal('10000.0')
        
    })

    it("enter ballot", async() => {
        const validAmount = ethers.utils.parseEther('0.5')
        const invalidAmount = ethers.utils.parseEther('0.01')
        
        await this.ballot.connect(this.bob).enterBallot({value: validAmount})
        await this.ballot.connect(this.carol).enterBallot({value: validAmount})
        
        await expect(this.ballot.connect(this.bob).enterBallot({value: invalidAmount})).to.be.revertedWith(
            'BALLOT: Not enough ether in account')
        await expect(this.ballot.connect(this.carol).enterBallot({value: invalidAmount})).to.be.revertedWith(
            'BALLOT: Not enough ether in account')
        
        })
    })
