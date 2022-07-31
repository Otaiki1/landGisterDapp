// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IToken.sol";

contract LandRegistration{

    Itoken iToken;
    // the struct below is the struct that contains all details of the land
    struct LandDetails{
        string state;
        string lga;
        string location;
        uint plotNumber;
        address currentOwner;
        uint priceSelling;
        bool isAvailable;
        address requester;
        ReqStatus reqStatus;
    }

    //This is like the meta data of the nft
    struct tokenData {
        string state;
        string lga;
        string location;
        uint plotNumber;
    }

    //This enum here shows the request status
    enum ReqStatus{
        Default,
        Pending,
        Reject,
        Approved
    }
    //shows the unique numbers attached to a current owner
    struct profiles{
        uint[] assetList;
    }

    event RegisterLand(address indexed _addr1, uint256 indexed _landId, uint256 indexed _priceSelling);
    event PurchaseLand(address indexed _buyer, address indexed _seller, uint256 indexed _landId);
    event Withdraw(address indexed _withdrawer, uint256 indexed _amount);


    // a mapping that links the unique number to the specific land property
    mapping(uint => LandDetails) Land;
    // the address of the person that deploys the contract
    address Deployer;
    //a mapping that maps accounts to ther balances
    mapping(address => uint256) private _balancesOf;
    // a mapping that maps each address to profiles(list of all lands the user has)
    mapping(address => profiles) profile ;
    //this constructor ensures that the deployer is the person who deployed the contract and is some sort of admin 
     constructor(address _account){
        Deployer = msg.sender;
        iToken = Itoken(_account);
    }


    function checkId(address _addr) public view returns(uint) {

            return iToken.checkId(_addr);
    }

    //Registration of land details
    function register(string memory _state,string memory _lga,
        string memory _location,
        uint _plotNumber, uint _priceSelling, bool _isAvailable) public returns(uint256){
            iToken.safeMint(msg.sender, _state, _lga, _location, _plotNumber) ;
            
            uint _lanId =  checkId(msg.sender);  
            Land[_lanId].state = _state;
            Land[_lanId].lga = _lga;
            Land[_lanId].location = _location;
            Land[_lanId].plotNumber = _plotNumber;
            Land[_lanId].currentOwner = msg.sender;
            Land[_lanId].priceSelling = _priceSelling;
            Land[_lanId].isAvailable = _isAvailable;


            profile[msg.sender].assetList.push(_lanId);
            
            emit RegisterLand(msg.sender, _lanId, _priceSelling);
            return _lanId;
            
        }
       

    // the owner function checks to show details of the land to the owner
    function owner(uint _lanId) public view returns(string memory,
    string memory,string memory, uint256, bool, address, ReqStatus){
        return (Land[_lanId].state,
                Land[_lanId].lga,
                Land[_lanId].location,
                Land[_lanId].plotNumber,
                Land[_lanId].isAvailable,
                Land[_lanId].requester,
                Land[_lanId].reqStatus);
    }
    // the buyer function checks to show details of the land to the buyer
    function buyer(uint _lanId) public view returns(string memory, string memory, string memory, uint256, address, uint, bool, address, ReqStatus){
        return (
                Land[_lanId].state,
                Land[_lanId].lga,
                Land[_lanId].location,
                Land[_lanId].plotNumber,
                Land[_lanId].currentOwner,
                Land[_lanId].priceSelling,
                Land[_lanId].isAvailable,
                Land[_lanId].requester,
                Land[_lanId].reqStatus);
    }

    //To push a request to the land owner
    function requestToLandOwner(uint _lanId) public{
        require(Land[_lanId].isAvailable, "This land is not available");
        require(Land[_lanId].currentOwner != msg.sender, "You cant request your own land");
        Land[_lanId].requester = msg.sender;
        Land[_lanId].isAvailable = false;
        Land[_lanId].reqStatus = ReqStatus.Pending;
    }

    // To view assets of a particular address
    function viewAssets() public view returns(uint [] memory){
        return profile[msg.sender].assetList;
    }

    // to view requests on a particular land
    function viewRequest(uint _lanId) public view returns(address){
        return Land[_lanId].requester;
    }
    //processing the request for either accepted or rejected
    function processRequest(uint _lanId, ReqStatus status) public {
        require(Land[_lanId].currentOwner == msg.sender, "You cannot process request cause you are not the owner of the asset");
        Land[_lanId].reqStatus = status;
        if(status == ReqStatus.Reject){
            Land[_lanId].requester = address(0);
            Land[_lanId].reqStatus = ReqStatus.Default;
        }
    }
    //availing Land for sale
    function makeAvailable(uint _lanId) public{
        require(Land[_lanId].currentOwner == msg.sender, "Only owner of property can make it available");
        Land[_lanId].isAvailable = true;
    }

    //buying the approved land
    function purchaseLand(uint _lanId) external payable{
        require(Land[_lanId].reqStatus == ReqStatus.Approved, "The Owner of the land hasnt approved the sales");
        require(msg.value >= Land[_lanId].priceSelling, "The price should be more tha or equal to the selling price");
        require(Land[_lanId].currentOwner != msg.sender, "The Owner of the land cant buyhisownland");
        
        address prevOwner = Land[_lanId].currentOwner;
        removeOwnership(Land[_lanId].currentOwner, _lanId);
        iToken.transferToken(Land[_lanId].currentOwner, msg.sender, _lanId);
        _balancesOf[msg.sender] = msg.value;
        Land[_lanId].currentOwner = msg.sender;
        Land[_lanId].isAvailable = false;
        Land[_lanId].requester = address(0);
        Land[_lanId].reqStatus = ReqStatus.Default;
        profile[msg.sender].assetList.push(_lanId);

        emit PurchaseLand(prevOwner, msg.sender, _lanId);
        
    }
    
    //removing the ownership of the seller of the land

    function removeOwnership(address _previousOwner, uint _lanId) private{
        uint index = findIndex(_lanId, _previousOwner);
        profile[_previousOwner].assetList[index] = profile[_previousOwner].assetList[profile[_previousOwner].assetList.length - 1];
        delete profile[_previousOwner].assetList[profile[_previousOwner].assetList.length - 1];
        profile[_previousOwner].assetList.length - 1;
    }

    //A function that finds the index of a particular unique number
    function findIndex(uint _id, address _addr) public view returns(uint){
        uint i;
        for(i=0;i<profile[_addr].assetList.length;i++){
            if(profile[_addr].assetList[i] == _id){
                return i;
            }
        }
        return i;
    }

    function withdraw() external returns(bool){
        
        require(_balancesOf[msg.sender] != 0, "You dont have funds to withdraw!");
        uint256 withdrawAmount = _balancesOf[msg.sender];
        _balancesOf[msg.sender] -= withdrawAmount;
        (bool success, ) = payable(msg.sender).call{value: withdrawAmount}("");
        require(success, "failed to send");
        emit Withdraw(msg.sender, withdrawAmount);
        return true;
    }   

    function viewBalance(address _addr) external view returns( uint256){
        return _balancesOf[_addr];
    }

  
   
}