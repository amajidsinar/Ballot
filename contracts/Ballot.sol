pragma solidity ^0.8.0;

contract Ballot{
    address[] public players;
    mapping(address=>uint256) public balances;
    address public manager;

    constructor () {
        manager = msg.sender;
    }

    function enterBallot() public payable{
        require(msg.value > 0.01 ether);
        balances[msg.sender] += msg.value;
        players.push(msg.sender);
    }
    function random() private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }
    
    function pickWinner() public view returns(address){
        uint random_number = random() % players.length;
        return players[random_number];
    }
    function distributeReward(address payable winner) public {
        uint rewardAmount = address(this).balance;
        winner.transfer(rewardAmount);
    }
        
    function resetBallot() public{
        players = new address[](0);
    }
    
    function getAtStake() public view returns(uint256){
        return address(this).balance;
    }
    
} 
    
