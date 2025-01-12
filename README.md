# CassidyBoT

CassidyBoT is created by Liane Cagara and is initially a Facebook bot but has evolved into a WebSocket and HTTP API, making it versatile and capable of running on the web or anywhere.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lianecagara/CassidyBoT-Clean.git
   cd CassidyBoT-Clean
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory and add the following:

   ```env
   MONGO_URI="replace with the mongodb uri"
   ```

### Deployment

1. To deploy the bot, simply run:

   ```bash
   npm start
   ```

## Documentation

### Handlers

- **FCA Handler**: Provides functionality for Facebook Chat API.
  - This repo is a fork from the main repo and will have new features bundled faster than the main repo (and may include some bugs).
  - See the main repo [here](https://github.com/Schmavery/facebook-chat-api).

  #### Example Usage

  ```javascript
  const login = require("fb-chat-api-temp");

  // Create simple echo bot
  login({email: "FB_EMAIL", password: "FB_PASSWORD"}, (err, api) => {
      if(err) return console.error(err);

      api.listen((err, message) => {
          api.sendMessage(message.body, message.threadID);
      });
  });
  ```

- **Styler Handler**: A JavaScript utility designed to apply dynamic styling to text content.
  
  #### Example Usage

  ```javascript
  export class Style {
    title = {
      content: "Example Title",
      line_top: "default",
      line_bottom: "20chars",
      text_font: "bold",
      text_kerning: "5",
      text_prefix: "[",
      text_suffix: "]",
      text_trim: true
    },
    content = {
      content: null,
      line_top: "hidden",
      line_bottom: "default",
      text_font: "fancy",
      text_kerning: "3",
      text_prefix: "",
      text_suffix: "",
      text_trim: false,
      number_font: "bold"
    },
    bottomField = {
      content: "Cool Info",
      line_top: "7chars",
      text_font: "fancy_italic",
      text_kerning: "0"
    }
  }
  ```

### Available Fonts

- Ｗｉｄｅｓｐａｃｅ
- 𝐒𝐞𝐫𝐢𝐟
- 𝓗𝓪𝓷𝓭𝔀𝓻𝓲𝓽𝓲𝓷𝓰
- 𝑺𝒄𝒓𝒊𝒑𝒕𝒃𝒐𝒍𝒅
- 𝑆𝑐𝑟𝑖𝑝𝑡
- 𝚃𝚢𝚙𝚎𝚠𝚛𝚒𝚝𝚎𝚛
- 𝗕𝗼𝗹𝗱 
- 𝖥𝖺𝗇𝖼𝗒
- 𝐌𝚘𝚘𝚍𝚢
- 𝘽𝙤𝙡𝙙 𝙄𝙩𝙖𝙡𝙞𝙘
- 𝘍𝘢𝘯𝘤𝘺 𝘐𝘵𝘢𝘭𝘪𝘤
- 𝔻𝕠𝕦𝕓𝕝𝕖 𝕊𝕥𝕣𝕦𝕔𝕜


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to [Schmavery](https://github.com/Schmavery) for the original Facebook Chat API.
