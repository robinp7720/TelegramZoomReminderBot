export default ctx => {
    if (!ctx.message.reply_to_message)
        return;

    ctx.reply('Mach ich doch immer gerne! :)', {'reply_to_message_id': ctx.message.message_id})
}
