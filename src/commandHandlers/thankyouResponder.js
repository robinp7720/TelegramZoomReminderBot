export default ctx => {
    const text = ctx.message.text.toLowerCase();

    if (text.includes("zoomy"))
        return ctx.reply('Mach ich doch immer gerne für dich 😘' + (ctx.message.from.first_name || ctx.message.from.username), {'reply_to_message_id': ctx.message.message_id});

    if (!ctx.message.reply_to_message)
        return;

    ctx.reply('Mach ich doch immer gerne! :)', {'reply_to_message_id': ctx.message.message_id})
}
