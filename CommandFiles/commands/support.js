export const meta = {
  name: "support",
  author: "Liane Cagara",
  version: "1.0.0",
  description: "Support Group Chat!",
  otherNames: ["supportgc", "gc"],
  usage: "{prefix}{name}",
  category: "System",
  permissions: [0],
  waitingTime: 5,
  noPrefix: "both",
  whiteList: null,
  noWeb: true,
  ext_plugins: {
    
  }
};

export const style = {
  title: "💗 Support GC",
  titleFont: "bold",
  contentFont: "fancy"
}

import fs from 'fs';
export async function entry({ output, input, api }) {
  const tid = `7200585553382526`;
  api.addUserToGroup(input.senderID, tid, (err) => {
    if (err) {
      output.reply(`❌ Failed to add you to the support group. Possibly you are already in the support group or you cannot be messaged by strangers.`);
    } else {
      output.reply(`✅ Successfully added you to the support group!`);
    }
  });
}