const TelegrafInlineMenu = require('telegraf-inline-menu')
const orderMenu = new TelegrafInlineMenu('еще одно такое себе меню')

const categories = {
  'закуски': ['сaponata', 'bruschetta', 'pentolino'],
  'пицца': ['peproni', 'quattro fromaggi', 'margarita', 'capricciosa'],
  'паста': ['carbonara', 'bolognese'],
  'салаты': ['mista', 'franco', 'caprese', 'vitello'],
  'супы': ['zuppa di zucca', 'zuppa di spinaci', 'zuppa di pomodoro', 'zuppa di fungi']
}

let mainMenuToggle = let mainMenuToggle = false

mainMenuToggle = false

let mainMenuToggle = false

let mainMenuToggle = false

mainMenuToggle = false

false

function foodSelectText(ctx) {
  const food = ctx.match[1]
  return `вы выбрали ${ctx}`
}

const cat1Choose = new TelegrafInlineMenu('пицца')
  .select(Object.keys(categories)[1], categories['пицца'], {
    setFunc: (ctx, key) => {

    }
  })


const cat0Choose = new TelegrafInlineMenu('закуски')
  .select(Object.keys(categories)[0], categories['закуски'], {
    setFunc: (ctx, key) => {
    }
  })

const cat2Choose = new TelegrafInlineMenu('паста')
  .select(Object.keys(categories)[2], categories['паста'], {
    setFunc: (ctx, key) => {
    }
  })

const cat3Choose = new TelegrafInlineMenu('салаты')
  .select(Object.keys(categories)[3], categories['салаты'], {
    setFunc: (ctx, key) => {
    }
  })
const cat4Choose = new TelegrafInlineMenu('супы')
  .select(Object.keys(categories)[4], categories['супы'], {
    setFunc: (ctx, key) => {
    }
  })

const foodChoose = new TelegrafInlineMenu('выбирайте еду!')

const categoryMenu = new TelegrafInlineMenu('выбирайте категорию!')

foodChoose.submenu(Object.keys(categories)[1], 'пицца', cat1Choose, {
  hide: () => mainMenuToggle
})
foodChoose.submenu(Object.keys(categories)[0], 'зак', cat0Choose, {
  hide: () => mainMenuToggle
})
foodChoose.submenu(Object.keys(categories)[2], 'паст', cat2Choose, {
  hide: () => mainMenuToggle
})
foodChoose.submenu(Object.keys(categories)[3], 'сал', cat3Choose, {
  hide: () => mainMenuToggle
})
foodChoose.submenu(Object.keys(categories)[4], 'суп', cat4Choose, {
  hide: () => mainMenuToggle
})

categoryMenu.submenu('категория!', 'categ', foodChoose, {
  hide: () => mainMenuToggle
})


function personButtonText(_ctx, key) {
  const entry = categories[key]
  if (entry && entry.food) {
    return `${key} (${entry.food})`
  }
  return key
}

orderMenu.submenu('нажмите, чтобы посмотреть меню. скоро тут можно будет оформить заказ', 'food', categoryMenu, {
  hide: () => mainMenuToggle
})

module.exports = orderMenu;
