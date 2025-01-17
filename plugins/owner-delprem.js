const cooldown = 86400000

let handler = async (m, { conn, args }) => {
	let who
	if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : args[0] ? args[0] : ''
	else who = m.quoted ? m.quoted.sender : args[0] ? args[0] : m.chat ? m.chat : ''
	if (!who) return m.reply(`tag orangnya!`)
	let user = global.db.data.users
	let prems = global.db.data.store.prems
	who = who.replace(/\D/g,'') + '@s.whatsapp.net'
	if (!user[who]) return m.reply(`[!] User tidak ada dalam database.`)
	if (!prems.map(v => v.user).includes(who)) return m.reply(`[ ! ] User tidak ada dalam list premium.`)
	global.db.data.store.prems = prems.filter(v => v.user !== who)
	user[who].expired = null
	await conn.sendMessage(m.chat, { text: `Menghapus @${(who || '').replace(/@s\.whatsapp\.net/g, '')} dari list user premium.`, mentions: [who] }, { quoted: m })
}

handler.mengroup = ['delprem <@tag>']
handler.tagsgroup = ['owner']
handler.command = /^(del(ete)?prem(ium)?)$/i

handler.owner = true

export default handler