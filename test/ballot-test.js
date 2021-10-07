const { expect } = require("chai");
const { ethers, waffle} = require("hardhat");


async function calculateBalance(provider, address) {
    var balance = await provider.getBalance(address)
    var balance = ethers.utils.formatEther(balance)
    return balance
}

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

    it("should have correct initial balance", async() => {
        const aliceBalance = await calculateBalance(this.provider, this.alice.address)
        expect(aliceBalance).to.not.equal('10000.0')

        const bobBalance = await calculateBalance(this.provider, this.bob.address)
        expect(bobBalance).to.equal('10000.0')

        const carolBalance = await calculateBalance(this.provider, this.carol.address)
        expect(carolBalance).to.equal('10000.0')
    })

    it("enter ballot with 2 users", async() => {
        const validAmount = ethers.utils.parseEther('0.5')
        const invalidAmount = ethers.utils.parseEther('0.01')

        await expect(this.ballot.connect(this.bob).enterBallot({value: invalidAmount})).to.be.revertedWith(
            'BALLOT: Not enough ether in account')
        var ballotBalance = await calculateBalance(this.provider, this.ballot.address)
        expect(ballotBalance).to.equal('0.0')

        await expect(this.ballot.connect(this.carol).enterBallot({value: invalidAmount})).to.be.revertedWith(
            'BALLOT: Not enough ether in account')        
        var ballotBalance = await calculateBalance(this.provider, this.ballot.address)
        expect(ballotBalance).to.equal('0.0')
        
        await this.ballot.connect(this.bob).enterBallot({value: validAmount})
        var ballotBalance = await calculateBalance(this.provider, this.ballot.address)
        expect(ballotBalance).to.equal('0.5')

        await this.ballot.connect(this.carol).enterBallot({value: validAmount})
        var ballotBalance = await calculateBalance(this.provider, this.ballot.address)
        expect(ballotBalance).to.equal('1.0')
        })
    
    
    it("calculate at stake", async() => {
        const validAmount = ethers.utils.parseEther('0.5')
        
        await this.ballot.connect(this.bob).enterBallot({value: validAmount})
        await this.ballot.connect(this.carol).enterBallot({value: validAmount})

        var atStake = await this.ballot.getAtStake()
        var atStake = ethers.utils.formatEther(atStake)

        var ballotBalance = await calculateBalance(this.provider, this.ballot.address)

        expect(atStake).to.equal(ballotBalance)
    })

    // it("pick winner", async() => {
    //     const validAmount = ethers.utils.parseEther('0.5')
        
    //     await this.ballot.connect(this.bob).enterBallot({value: validAmount})
    //     await this.ballot.connect(this.carol).enterBallot({value: validAmount})

    //     await this.ballot.connect(this.alice)
        
    // })


})
