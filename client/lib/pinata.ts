"server only"

import { PinataSDK } from "pinata-web3"

export const pinata = new PinataSDK({
    pinataJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4MTg5NDAzNC1iNTVkLTQyMGEtODFhYy1lMjUxOGNmMzc1ZTIiLCJlbWFpbCI6Im9sYW9sdXdhbGF3YWwxOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMjNkNzZhMzg5M2Y5MzMwM2IzYWIiLCJzY29wZWRLZXlTZWNyZXQiOiIxZTFhYjhhOTQyODE4MmNjMDE5NTlmZDQ0ZDI1ODY3ZmMwYWRkYzhiMTE0NmNjMTg1ODZmMGNhZmIzYWNiZjBlIiwiZXhwIjoxNzc4NjkxNTMwfQ.yqxA4MOL52mZiQeWvo27Z4dCoQQGlVkd1s_9E-LTJYM',
    pinataGateway: process.env.PINATA_GATEWAY_URL
})