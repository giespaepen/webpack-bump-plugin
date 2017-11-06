// Mock fs
jest.mock('fs', () => ({
  readFileSync: () => '{ "version": "1.0.0" }',
  writeFileSync: (target, content) => { global.content = content },
}))
