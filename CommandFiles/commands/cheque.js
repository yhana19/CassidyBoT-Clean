export const meta = {
  name: "cheque",
  description: "Manage your cheques and cash them for money.",
  author: "Liane Cagara",
  version: "1.0.7",
  usage: "{prefix}cheque <action> [amount]",
  category: "Financial Management",
  permissions: [0],
  noPrefix: false,
  waitingTime: 1,
  otherNames: ["check"],
};

export const style = {
  title: "💰 Cheque",
  titleFont: "bold",
  contentFont: "fancy",
};

export async function entry({ input, output, money, args, Inventory, prefix }) {
  const userData = await money.get(input.senderID);
  let userInventory = new Inventory(userData.inventory);
  userData.shadowPower ??= 0;

  let [action = "", ...actionArgs] = args;

  switch (action.toLowerCase()) {
    case "create":
      let amount = parseInt(actionArgs[0]);
      let shadowUsed = false;
      if (!userInventory.has("shadowCoin") && userData.shadowPower <= 0) {
        return output.reply(
          "❕ A **Shadow Coin** 🌑 is required to perform this task.",
        );
      }
      if (userData.shadowPower <= 0) {
        shadowUsed = true;
        userInventory.deleteOne("shadowCoin");
        userData.shadowPower = 6;
      }

      if (isNaN(amount) || amount <= 0) {
        return output.reply(
          `❌ Invalid amount specified. Please provide a valid amount.`,
        );
      }
      if (userData.inventory.length >= 8) {
        return output.reply(`❌ You're carrying too many items!`);
      }

      if (userData.money < amount) {
        return output.reply(
          `❌ You do not have enough money to create a cheque of $${amount}.`,
        );
      }

      const chequeItem = {
        key: `cheque_${amount}`,
        icon: "💵",
        name: `Cheque of $${amount}`,

        flavorText: `A cheque worth $${amount} created by ${userData.name ?? "Chara"}. Cash it to add the amount to your balance.`,
        chequeAmount: Math.floor(amount * 1),
        sellPrice: Math.floor(amount * 0.75),
        type: "cheque",
      };

      userInventory.addOne(chequeItem);
      userData.money -= amount;
      userData.shadowPower -= 1;

      await money.set(input.senderID, {
        inventory: Array.from(userInventory),
        money: userData.money,
        shadowPower: userData.shadowPower,
      });

      return output.reply(
        `✅ Created a cheque worth $${amount}. Your new balance is $${userData.money}.

${shadowUsed ? `❕ Your **shadow coin** has been consumed! (only ${userInventory.getAmount("shadowCoin")} left) Leaving you ${userData.shadowPower}/6 remaining shadow power.` : `❕ Remaining Shadow Power: ${userData.shadowPower}/6`}`,
      );

    case "cash":
      let chequeKey = actionArgs[0];
      if (!String(chequeKey).startsWith("cheque_")) {
        chequeKey = `cheque_${chequeKey}`;
      }
      const itemToCash = userInventory.getOne(chequeKey);

      if (
        !itemToCash ||
        !chequeKey.startsWith("cheque_") ||
        itemToCash?.type !== "cheque"
      ) {
        return output.reply(`❌ No valid cheque found with the specified key.`);
      }

      const chequeAmount = parseInt(itemToCash.chequeAmount);

      if (isNaN(chequeAmount) || chequeAmount <= 0) {
        return output.reply(`❌ The cheque amount is invalid.`);
      }

      userInventory.deleteOne(chequeKey);
      userData.money += chequeAmount;

      await money.set(input.senderID, {
        inventory: Array.from(userInventory),
        money: userData.money,
      });

      return output.reply(
        `✅ Cashed a cheque worth $${chequeAmount}. Your new balance is $${userData.money}.`,
      );

    default:
      return output.reply(
        `❌ Invalid action. Usage:\n\n` +
          `\`${meta.usage.replace("{prefix}", prefix)} create <amount>\`: Create a cheque of the specified amount.\n` +
          `\`${meta.usage.replace("{prefix}", prefix)} cash <cheque_key>\`: Cash a cheque using the specified key and add it to your balance.`,
      );
  }
}