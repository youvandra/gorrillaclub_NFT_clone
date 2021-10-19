import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

export const StyledButton = styled.button`
	padding: 10px;
	border-radius: 50px;
	border: none;
	background-color: var(--secondary);
	padding: 10px;
	font-weight: bold;
	color: var(--secondary-text);
	width: 100px;
	cursor: pointer;
	box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
	-webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
	-moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
	:active {
		box-shadow: none;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
	}
`

export const StyledRoundButton = styled.button`
	padding: 10px;
	border-radius: 100%;
	border: none;
	padding: 10px;
	font-weight: bold;
	font-size: 15px;
	color: var(--primary-text);
	width: 30px;
	height: 30px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
	-webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
	-moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
	:active {
		box-shadow: none;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
	}
`

export const ResponsiveWrapper = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: stretched;
	width: 50%;
	@media (min-width: 767px) {
		flex-direction: row;
	}
`

export const StyledLogo = styled.img`
	width: 200px;
	@media (min-width: 767px) {
		width: 300px;
	}
	transition: width 0.5s;
	transition: height 0.5s;
`

export const StyledImg = styled.img`
	box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
	border: 4px dashed var(--secondary);
	background-color: var(--accent);
	border-radius: 100%;
	width: 200px;
	@media (min-width: 900px) {
		width: 250px;
	}
	@media (min-width: 1000px) {
		width: 300px;
	}
	transition: width 0.5s;
`

export const StyledLink = styled.a`
	color: var(--secondary);
	text-decoration: none;
  `

function Mint() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);
  const [mintAmount, setMintAmount] = useState(1)
  const claimNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    setFeedback("Minting your Gorilla Club...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        gasLimit: "285000",
        to: "0xD53ecE799CD3576c8eB4926982256C79d25dce80", // CHANGE YOUR WALLET ADDRESS HERE
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((0.05 * _amount).toString(), "ether"), // YOUR NFT PRICE
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "WOW, you now own a Gorilla Club. go visit Opensea.io to view it."
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };
  const decrementMintAmount = () => {
		let newMintAmount = mintAmount - 1
		if (newMintAmount < 1) {
			newMintAmount = 1
		}
		setMintAmount(newMintAmount)
	}

	const incrementMintAmount = () => {
		let newMintAmount = mintAmount + 1
		if (newMintAmount > 10) {
			newMintAmount = 10
		}
		setMintAmount(newMintAmount)
	}

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);
  
var input = document.getElementById("inputnft");

return (
  <s.Screen>
    <s.Container
      flex={1}
      ai={"center"}
      style={{ padding: 24 }}
      image="/config/images/bg.png"
    >
      {/* <StyledLogo alt={"logo"} src={"/config/images/logo.png"} /> */}
      <s.SpacerXLarge />
      <s.SpacerXLarge />
      <s.SpacerXLarge />
      <s.SpacerXLarge />
      <s.SpacerMedium />

      <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
        {/* <s.Container flex={1} jc={"center"} ai={"center"}>
          <StyledImg
            alt={"example"}
            src={"/config/images/example.gif"}
          />
        </s.Container> */}
        {/* <s.SpacerXLarge flex={1} jc={"center"} ai={"center"} /> */}
        <s.SpacerLarge />
        <s.Container
          flex={2}
          jc={"center"}
          ai={"center"}
          style={{
            backgroundColor: "var(--accent)",
            padding: 24,
            borderRadius: 24,
            border: "4px",
            boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
          }}
        >
          <s.TextTitle
            style={{
              textAlign: "center",
              fontSize: 50,
              fontWeight: "bold",
              color: "var(--accent-text)",
            }}
          >
            Gorilla Club NFT Mint
            {/* {data.totalSupply} / {CONFIG.MAX_SUPPLY} */}
          </s.TextTitle>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            <StyledLink
              target={"_blank"}
              href="" // LINK 
            >
              0x3edc8437dbe93...
            </StyledLink>
          </s.TextDescription>
          <s.SpacerSmall />
          {Number(data.totalSupply) >= 10000 ? (
            <>
              <s.TextTitle
                style={{
                  textAlign: "center",
                  color: "var(--accent-text)",
                }}
              >
                The sale has ended.
              </s.TextTitle>
              <s.TextDescription
                style={{
                  textAlign: "center",
                  color: "var(--accent-text)",
                }}
              >
                You can still find GC on
              </s.TextDescription>
              <s.SpacerSmall />
              <StyledLink
                target={"_blank"}
                href=""
              >
                Opensea
              </StyledLink>
            </>
          ) : (
            <>
              <s.TextTitle
                style={{
                  textAlign: "center",
                  color: "var(--accent-text)",
                }}
              >
                1 NFT costs{" "}
                0.05{" "}
                ETH.
              </s.TextTitle>
              <s.SpacerXSmall />
              <s.TextDescription
                style={{
                  textAlign: "center",
                  color: "var(--accent-text)",
                }}
              >
                Excluding gas fees.
              </s.TextDescription>
              <s.SpacerSmall />
              {blockchain.account === "" ||
              blockchain.smartContract === null ? (
                <s.Container ai={"center"} jc={"center"}>
                  <s.TextDescription
                    style={{
                      textAlign: "center",
                      color: "var(--accent-text)",
                    }}
                  >
                    Connect to the Ethereum{" "}
                    network
                  </s.TextDescription>
                  <s.SpacerSmall />
                  <StyledButton
                    onClick={(e) => {
                      e.preventDefault()
                      dispatch(connect())
                      getData()
                    }}
                  >
                    CONNECT
                  </StyledButton>
                  {/*<StyledButton*/}
                  {/*	onClick={(e) => {*/}
                  {/*		e.preventDefault();*/}
                  {/*		verify('asdf')*/}
                  {/*			.then((v) => {*/}
                  {/*				console.log(v);*/}
                  {/*			});*/}
                  {/*	}}*/}
                  {/*>*/}
                  {/*	TEST*/}
                  {/*</StyledButton>*/}
                  {blockchain.errorMsg !== "" ? (
                    <>
                      <s.SpacerSmall />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {blockchain.errorMsg}
                      </s.TextDescription>
                    </>
                  ) : null}
                </s.Container>
              ) : (
                <>
                  <s.TextDescription
                    style={{
                      textAlign: "center",
                      color: "var(--accent-text)",
                    }}
                  >
                    {feedback}
                  </s.TextDescription>
                  <s.SpacerMedium />
                  <s.Container
                    ai={"center"}
                    jc={"center"}
                    fd={"row"}
                  >
                    <StyledRoundButton
                      style={{ lineHeight: 0.4 }}
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault()
                        decrementMintAmount()
                      }}
                    >
                      -
                    </StyledRoundButton>
                    <s.SpacerMedium />
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {mintAmount}
                    </s.TextDescription>
                    <s.SpacerMedium />
                    <StyledRoundButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault()
                        incrementMintAmount()
                      }}
                    >
                      +
                    </StyledRoundButton>
                  </s.Container>
                  <s.SpacerSmall />
                  <s.Container
                    ai={"center"}
                    jc={"center"}
                    fd={"row"}
                  >
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault()
                        claimNFTs(mintAmount)
                        getData()
                      }}
                    >
                      {claimingNft ? "BUSY" : "BUY"}
                    </StyledButton>
                  </s.Container>
                </>
              )}
            </>
          )}
          <s.SpacerMedium />
        </s.Container>
        <s.SpacerLarge />
        {/* <s.SpacerXLarge flex={1} jc={"center"} ai={"center"} /> */}

        {/* <s.Container flex={1} jc={"center"} ai={"center"}>
          <StyledImg
            alt={"example"}
            src={"/config/images/example.gif"}
            style={{ transform: "scaleX(-1)" }}
          />
        </s.Container> */}
      </ResponsiveWrapper>
      <s.SpacerMedium />
      <s.Container
        jc={"center"}
        ai={"center"}
        style={{ width: "70%" }}
      >
        <s.TextDescription
          style={{
            textAlign: "center",
            color: "var(--primary-text)",
          }}
        >
          Please make sure you are connected to the right network
          (Ethereum Mainnet) and the correct address.
          Please note: Once you make the purchase, you cannot undo
          this action.
        </s.TextDescription>
        {/* <s.SpacerSmall />
        <s.TextDescription
          style={{
            textAlign: "center",
            color: "var(--primary-text)",
          }}
        >
          We have set the gas limit to {CONFIG.GAS_LIMIT} for the
          contract to successfully mint your NFT. We recommend
          that you don't lower the gas limit.
        </s.TextDescription> */}
      </s.Container>
    </s.Container>
  </s.Screen>
)
}

 export default Mint;