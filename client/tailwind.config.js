/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // 
    colors : {
      "cherryRed": "#D2042D",
      "lightBlue": "#B9E9FC",
      "darkBlue" : "#0B2447",
      "offWhite" : "#F6F1F1",
      "white"  : "#FFFFFF",
      "alphaBlue" : "rgba(85, 110, 230,.18)",
    },
    extend: {
      transitionProperty: {
      },
      boxShadow: {
        "custom": '0px 5px 10px 0px rgba(0, 0, 0, 0.5);'
      },
    },
    backgroundImage : {
      banner : "url(https://images.squarespace-cdn.com/content/v1/5d4cfd87082420000108b311/1566718849902-809OYSILCPJLAKT97XWE/futuristic-technology-abstract-background-beautiful-footage-087637197_prevstill.jpeg?format=2500w);",
      crypto : "url(https://blog.equinix.com/wp-content/uploads/2017/10/blockchain.jpg);",
      avatar : "https://www.google.co.in/url?sa=i&url=https%3A%2F%2Fwww.pngmart.com%2Fimage%2F479979&psig=AOvVaw3QAfwbQlPaaqLQeAa46Rmm&ust=1682672849476000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMCe-f3ayf4CFQAAAAAdAAAAABAE"
    }
  },
  plugins: [],
}

