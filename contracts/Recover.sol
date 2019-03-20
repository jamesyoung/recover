pragma solidity >=0.4.21 <0.6.0;

contract Recover {
	function recover(bytes32 msgHash, uint8 v, bytes32 r, bytes32 s) public pure returns (address) {
		return ecrecover(msgHash, v, r, s);
	}
}
