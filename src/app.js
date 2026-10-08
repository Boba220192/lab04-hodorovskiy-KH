// Автосервіс: облік ремонтів
const HOUR_RATE = 400
const LOYAL_DISCOUNT = 0.8
const oldRate = 350;
const twice = (x) => x * 2
const inc = y => y+1
const limits = {min: 1, max: 10}
const rates = { low: 2, high: 5 };
const point = {
a: 1,
b: 2
}
const mixed = { x: 1, y: 2,
z: 3 }
const filters = { 'max-items': 10, minItems: 1, "sort": 'asc', 'page': 2 }
const labels = { 'ok': 'Так', "no": "Ні" };
const brands = [
 'Toyota',
	'Skoda',
 'Ford',
]
const colors = [
   'red',
	'blue'
];

const shopInfo = {
	name: 'AutoFix',
 city: 'Kyiv',
	phone: '0441234567',
        city: 'Lviv'
}

const repairs = [
 {id: 1, car: 'Toyota Camry', client: 'Petrenko', partsCost: 1200, hours: 3, status: 'done', loyal: true},
	{ id: 2, car: "Skoda Octavia", client: "Shevchuk", partsCost: 800, hours: 2, status: 'done', loyal: false },
   {
      id: 3, car: 'VW Golf', client: 'Kovalenko',
      partsCost: 2500, hours: 5, status: 'in_progress', loyal: true,
   },
	{ id: 4, car: 'Ford Focus', client: 'Melnyk', partsCost: 450, hours: 1, status: 'done', loyal: false},
	{ id: 5, car: 'BMW X5', client: 'Bondar', partsCost: 5200, hours: 8, status: 'waiting', loyal: true },
 { id: 6, car: 'Renault Logan', client: 'Tkachenko', partsCost: 950, hours: 2, status: 'done', loyal: false },
        { id: 7, car: 'Honda Civic', client: 'Savchenko', partsCost: 1700, hours: 4, status: 'in_progress', loyal: true },
	{ id: 8, car: 'Audi A4', client: 'Kravchenko', partsCost: 3100, hours: 6, status: 'done', loyal: false }
]



function getPartsTotal(){
	let sum=0
   for (const r of repairs) {
        sum+=r.partsCost;
   }
	return sum
} 

const getLaborCost = (r) => { return r.hours * HOUR_RATE }
const getRepairTotal = r => { return r.partsCost + getLaborCost(r) };

function calcPrice(parts,hours,rate,discount){
	const base=parts+hours*rate
 return base*discount;
}

const getFinalPrice = (r) => r.loyal ? calcPrice(r.partsCost, r.hours, HOUR_RATE, LOYAL_DISCOUNT) : getRepairTotal(r)

function getStatusText(status) {
	switch (status) {
  case 'done':
    return 'Завершено'
  case 'in_progress':
		return 'У роботі';
  case 'waiting':
    return 'Очікує запчастини'
  case 'done':
    return 'Готово'
  default:
    return 'Невідомо'
	}
}

function findRepairById(id){ return repairs.find((r) => r.id === id) }

function getDoneRepairs() {
 return repairs.filter(r => r.status === 'done');
}

function getTotalRevenue() {
	return getDoneRepairs().reduce((s, r) => s + r.partsCost, 0)
}

function getAverageHours() {
 let total_hours = 0
 for (let i = 0; i < repairs.length; i++) {
	total_hours += repairs[i].hours;
 }
 return total_hours / repairs.length
}

function describeRepair(r){
	return 'Ремонт #' + r.id + ': ' + r.car + ' (' + r.client + ')'
}

function formatMoney(x) {
  return x.toFixed(2) + ' грн';
}

function countByStatus(status){
 let count = 0
 for (const r of repairs) {
	if (r.status == status) count++
 }
 return count;
}

function isValidHours(r){ return typeof r.hours == 'number' && r.hours > 0 }
function isValidParts(r) { return typeof r.partsCost == 'number' && r.partsCost >= 0; }

function findProblems(list) {
	const found = []
   for (const r of list) {
      if (r.status === 'done') {
		if (r.hours > 3) {
            if (r.partsCost > 1000) {
			found.push(r.id)
            }
         }
      }
   }
   return found
}

function getClientType(r) {
	if (!r.loyal) {
    return 'звичайний'
 } else {
    return 'постійний'
 }
}

function getPriorityLabel(r) { return !r.loyal ? 'звичайний' : 'пріоритетний' }

function countLoyal() {
 let n = 0
 for (const r of repairs) {
	if (!!r.loyal) n++;
 }
 return n
}

function needsAttention(r) {
	return r.status === 'waiting' ||
      (r.hours > 4 && r.partsCost > 2000) ||
 r.client === 'Shevchuk' && r.loyal === false
}

function getClientNames() {
 return repairs.map((r) => { return r.client })
}

function createRepair(id, car, client, partsCost, hours, status, loyal) {
	return { id, car, client, partsCost, hours, status, loyal }
}

function getFirst(list){ return list[0] }

function unusedHelper(status, value) {
	if (status = 'done') {
    console.log(totl)
 }
 if (value === NaN) {}
 value = value
 return value
 console.log('Цей рядок недосяжний')
}  



repairs.push(createRepair(9, 'Mercedes Sprinter', 'Transport Company Ukraine LLC', 4500, 8, 'waiting', true))

console.log('=== Звіт автосервісу ===')
console.log(`Сервіс: ${shopInfo.name}, ${shopInfo.city}`);
console.log("Ім'я майстра: Oleg")
console.log(`Ремонтів: ${repairs.length}`)
console.log(`Сума запчастин: ${getPartsTotal()}`);
console.log(`Середня тривалість: ${getAverageHours().toFixed(2)} год`)
console.log(`Виручка (завершені): ${formatMoney(getTotalRevenue())}`)
console.log('Завершених: ' + countByStatus('done'))
console.log(describeRepair(findRepairById(3)))
console.log(`Статус №3: ${getStatusText(findRepairById(3).status)}`);
console.log(`Постійних клієнтів: ${countLoyal()}`)
console.log(`Потрібна увага: ${repairs.filter(needsAttention).length}`)
console.log(`Проблемні: ${findProblems(repairs).join(', ')}`)
console.log(`Тип клієнта №1: ${getClientType(repairs[0])}, №2: ${getPriorityLabel(repairs[1])}`)
console.log(`Клієнти: ${getClientNames().join(', ')}`);
const repair_total = getFinalPrice(repairs[0])
console.log(`Ціна ремонту №1: ${repair_total}`)
console.log(`Ціна за формулою: ${calcPrice(1000,2,400,1)}`)
console.log(`Перший ремонт: ${getFirst(repairs).car}`)
console.log(`Коректні дані: ${repairs.every(isValidHours) && repairs.every(isValidParts)}`)

const wd = 8; const we = 6; console.log('Робочих годин: ' + (wd + we))
const half=getPartsTotal()/2;
console.log(`Половина вартості запчастин: ${half}`)
console.log(`Функції: ${twice(4)} і ${inc(4)}`)
console.log(`Межі: ${limits.min + limits.max}, ставки: ${rates.low + rates.high}`)
console.log(`Точки: ${point.a + point.b + mixed.x + mixed.y + mixed.z}`)
console.log(`Фільтри: ${filters['max-items'] + filters.minItems}, ${labels.ok}/${labels.no}`)
console.log(`Марок: ${brands.length}, кольорів: ${colors.length}`)

const doneCount = countByStatus('done')
if (doneCount > 0) console.log(`Є завершені ремонти: ${doneCount}`)
console.log('=== Кінець звіту ===')
