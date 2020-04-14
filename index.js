const Telegraf = require('telegraf')
const TelegrafInlineMenu = require('telegraf-inline-menu')
const config = require('config')
const menu = new TelegrafInlineMenu('такое себе меню')
const orderMenu = require('./food')

menu.urlButton('какая-то ссылка', 'https://elbrusboot.camp/')

let mainMenuToggle = false
menu.toggle('раскрывающийся список', 'a', {
  setFunc: (_ctx, newVal) => {
    mainMenuToggle = newVal
    console.log(newVal);
  },
  isSetFunc: () => mainMenuToggle
})

menu.simpleButton('жми', 'c', {
  doFunc: async ctx => ctx.answerCbQuery('слабовато'),
  hide: () => mainMenuToggle
})

menu.simpleButton('сильнее жми', 'd', {
  doFunc: async ctx => ctx.answerCbQuery('Мощь!'),
  joinLastRow: true,
  hide: () => mainMenuToggle
})

let selectedKey = 'b'
menu.select('s', ['A', 'B', 'C'], {
  setFunc: async (ctx, key) => {
    selectedKey = key
    await ctx.answerCbQuery(`зачем ты нажал ${key}`)
  },
  isSetFunc: (_ctx, key) => key === selectedKey
})

const foodMenu = new TelegrafInlineMenu(' кто что будет поесть?')

const people = { "Артем": {}, "Евграф": {} }
const food = ['кино', 'вино', 'домино']

function personButtonText(_ctx, key) {
  const entry = people[key]
  if (entry && entry.food) {
    return `${key} (${entry.food})`
  }
  return key
}

function foodSelectText(ctx) {
  const person = ctx.match[1]
  const hisChoice = people[person].food
  if (!hisChoice) {
    return `${person}, выбирай что будешь`
  }
  return `${person},  ${hisChoice} - вредно для фигуры`
}

const foodSelectSubmenu = new TelegrafInlineMenu(foodSelectText)
  .toggle('пивка бы', 't', {
    setFunc: (ctx, choice) => {
      const person = ctx.match[1]
      people[person].tee = choice
    },
    isSetFunc: ctx => {
      const person = ctx.match[1]
      return people[person].tee === true
    }
  })
  .select('лучше чаю', food, {
    setFunc: (ctx, key) => {
      const person = ctx.match[1]
      people[person].food = key
    },
    isSetFunc: (ctx, key) => {
      const person = ctx.match[1]
      return people[person].food === key
    }
  })

foodMenu.selectSubmenu('p', () => Object.keys(people), foodSelectSubmenu, {
  textFunc: personButtonText,
  columns: 2
})

foodMenu.question(' добавить еще друга', 'добавь', {
  uniqueIdentifier: '666',
  questionText: 'кто еще любит кушать? ',
  setFunc: (_ctx, key) => {
    people[key] = {}
  }
})

menu.submenu('ЕДА ТУТ', 'еда', foodMenu, {
  hide: () => mainMenuToggle
})

menu.setCommand('funfood')

const bot = new Telegraf(config.get('token'))


const welcoming = `привет, я маленький чат-бот, пиши мне! `;

bot.use(Telegraf.log());
bot.use(orderMenu.init({
  backButtonText: 'назад',
  mainMenuButtonText: 'главное'
}))
bot.use(menu.init({
  backButtonText: 'назад',
  mainMenuButtonText: 'зачем я здесь, хочу обратно'
}))

bot.startPolling();
bot.start((ctx) => ctx.reply(welcoming))
bot.help((ctx) => ctx.reply('send me a stiker'))
bot.command('echo', (ctx) => ctx.reply('Echo'))
bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears('бот', (ctx) => ctx.reply('че'))
bot.hears('дурак', (ctx) => ctx.reply('сам дурак'))
bot.hears('вика', (ctx) => ctx.reply('старается'))
bot.hears('привет', (ctx) => ctx.reply('ну здравствуй'))
bot.on('message', (ctx) => {
  return ctx.reply('еще что скажешь?')
})

bot.hears('как дела', (ctx) => ctx.reply('нормально'))
bot.launch()
