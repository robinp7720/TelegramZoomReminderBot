export default ctx => {
    const text = ctx.message.text.toLowerCase();

    if (!text.includes("zoomy")) return;

    if (text.includes("ich hab dich lieb"))
        return ctx.reply('Ich hab dich auch lieb 😘', {'reply_to_message_id': ctx.message.message_id});

    if (text.includes("ist das wahr"))
        return ctx.reply('Nein', {'reply_to_message_id': ctx.message.message_id});

}
