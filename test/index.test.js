const getFile = require('../index');

const arrayResult =  [
    [
      {
        FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
      }
    ]
  ]


describe('getFile:: ', () => {
    it('Must be function', () => {
        expect(typeof getFile).toBe('function');
    })
    it('Should return array with results of a path', async () => {
        const result = await getFile('./test/filestest/arquivo_one_link')
        expect(result).toEqual(arrayResult);
    })
    it('Should return ["There no links here!"]', async () => {
        const result = await getFile('./test/filestest/arquivo_no_link')
        expect(result).toEqual(['There not links here!']);
    })
    it('Should return "You should pass a filepath valid!" if a "Throw" appears when you passed a invalid filepath', async () => {
        const result = await expect(getFile('./test/filestest/arquivo_no_link/texto1.md'))
        .rejects.toThrow('You should pass a filepath valid!');
    })
})