/*
  Test toSnakeCase conversion for admin form data
*/

const toSnakeCase = (obj) => {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) return obj.map(toSnakeCase)
  if (typeof obj !== 'object') return obj
  
  const result = {}
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    result[snakeKey] = toSnakeCase(value)
  }
  return result
}

// Simulate admin form data
const adminFormData = {
  name: 'Test Industry',
  description: 'Test Description',
  longDescription: 'Test Long Description',
  icon: 'FaChartLine',
  imageUrl: '',
  features: ['Feature 1', 'Feature 2'],
  technologies: ['Tech 1', 'Tech 2'],
  order: 5,
  orderIndex: 5,
  isActive: true
}

console.log('Original admin form data:')
console.log(JSON.stringify(adminFormData, null, 2))

console.log('\nAfter toSnakeCase conversion:')
const snakeCaseData = toSnakeCase(adminFormData)
console.log(JSON.stringify(snakeCaseData, null, 2))

// Check specific fields
console.log('\nIcon field:', snakeCaseData.icon)
console.log('Order field:', snakeCaseData.order)
console.log('Order index field:', snakeCaseData.order_index)
