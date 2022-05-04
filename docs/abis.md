# ABI

이 문서에서는 Solidity JSON ABI 형태의 3pm contract ABI (application binary interface) 들을 기술한다.

## `balanceOf`

지갑 주소를 바탕으로 명시된 token ID의 소유 갯수를 반환한다.

### Input

- address: 사용자의 지갑주소
- id: NFT token ID

### Output

사용자가 소유한 토큰의 갯수

```
{
  inputs: [
    {
      internalType: "address",
      name: "account",
      type: "address"
    },
    {
      internalType: "uint256",
      name: "id",
      type: "uint256"
    }
  ],
  name: "balanceOf",
  outputs: [
    {
      internalType: "uint256",
      name: "",
      type: "uint256"
    }
  ],
  stateMutability: "view",
  type: "function",
  constant: true
}
```
