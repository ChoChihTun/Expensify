const add = (a, b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`

// First args: Test description
// Second args: Arrow function in the testing
test('Should add two number', () => {
  // Actual/received result
  const result = add(3, 4);
  // expect(received).toBe(expected)
  expect(result).toBe(7);
});

test('Should greet', () => {
  const result = generateGreeting('CHO');
  expect(result).toBe('Hello CHO!');
});

test('Should generate greeting for no name', () => {
  const result = generateGreeting();
  expect(result).toBe('Hello Anonymous!');
});