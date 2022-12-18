import WebView from "react-native-webview";
import React, { Component } from "react";
import { View, Text,  ActivityIndicator  } from "react-native";



export default class Paypal extends Component (){

    state = {
      accessToken: null,
      approvalUrl: null,
      paymentId: null,
    }

   componentDidMount() {
      const dataDetail = {
        "intent": "sale",
        "payer": {
          "payment_method": "paypal",
        },
        "transactions": [
          {
      
            "amount": {
              "total": "200",
              "currency": "USD",
              "details": {
                "subtotal": "200",
                "tax": "0",
                "shipping": "0",
                "handling_fee": "0",
                "shipping_discount": "0",
                "insurance": "0",
              },
            },
          },
        ],
        "redirect_urls": {
          "return_url": "https://example.com",
          "cancel_url": "https://example.com",
        },
      };
      fetch("https://api.sandbox.paypal.com/v1/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Bearer A21AAJ7ahXwtU1X3M_91oLUUXTG0vk2qCiG0tqIlzq7dapjjJlzJDASO-yW_UOmbWSim7CFo8uAhRdZKdIwHNAbRYwWe1cdLQ`,
        },
        body: "grant_type=client_credentials",
      })
        .then(res => res.json())
        .then(response => {
          console.log("response====", response);
          this.setState({
            accessToken: response.access_token,
          });
          fetch("https://api.sandbox.paypal.com/v1/payments/payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${response.access_token}`,
            },
            body: JSON.stringify(dataDetail),
          })
            .then((res) => res.json())
            .then((response) => {
              console.log("response", response);
              const { id, links } = response;
              const approvalUrl = links.find(data => data.rel == "approval_url");
              console.log("approvalUrl", approvalUrl);
              this.setState({
                paymentId: id,
                approvalUrl: approvalUrl.href
              });
            })
            .catch((err) => {
              console.log({ ...err });
            });
        })
        .catch((err) => {
          console.log({ ...err });
        });
    }
  
    _onNavigarionStateChange = (webViewState) => {
      console.log("webViewState", webViewState);
      if (webViewState.url.includes("https://example.com/")) {
        this.setState({
          approvalUrl: null,
        });
        const { PayerID, paymentId } = webViewState.url;
  
        fetch(
          `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
          {
            method: "POST",
            body: { payer_id: PayerID },
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.setState.accessToken}`,
            },
          }
        )
          .then(res => res.json())
          .then(response => {
            console.log("res", response);
            if (response.name === "INVALID_RESOURCE_ID") {
              alert("Payment Failed. Please Try Again!");
              this.setState({
                approvalUrl: null,
              });
              this.props.navigation.pop();
            }
          })
          .catch((err) => {
            console.log({ ...err });
          });
      }
    };
  
   render() {
      const { approvalUrl } = this.state;
      return (
        <View style={{ flex: 1 }}>
          {approvalUrl ? (
            <WebView
              style={{ height: "100%", width: "100%", marginTop: 40 }}
              source={{ uri: approvalUrl }}
              onNavigationStateChange={this._onNavigarionStateChange}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={false}
            />
          ) : (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ color: "black", fontSize: 24, alignSelf: "center" }}>
                Do not press back or refresh page
              </Text>
              <ActivityIndicator
                color={"black"}
                size={"large"}
                style={{ alignSelf: "center", marginTop:50 }}
              />
            </View>
          )}
        </View>
      );
    }
  }
   