import {
  range,
  getNumberOfPages,
  isSequence,
  calcNoOfPages,
  createNewPagesArray,
} from './utils'

/* Testing range */
describe('testing range function', () => {
  test('range fn. Expect range(1, 10) to be an an array of numbers from 1-10 inclusive', () => {
    expect(range(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  test('range fn. Expect range(3, 5) to be an an array of numbers from 3-5 inclusive', () => {
    expect(range(3, 5)).toEqual([3, 4, 5])
  })
})

/* Testing getNumberOfPages */
describe('testing getNumberOfPages function', () => {
  test('getNumberOfPages fn. Expect getNumberOfPages(2021) to be 100', () => {
    expect(getNumberOfPages(2021)).toBe(100)
  })

  test('getNumberOfPages fn. Expect getNumberOfPages(1000) to be 100', () => {
    expect(getNumberOfPages(1000)).toBe(100)
  })

  test('getNumberOfPages fn. Expect getNumberOfPages(860) to be 86', () => {
    expect(getNumberOfPages(860)).toBe(86)
  })

  test('getNumberOfPages fn. Expect getNumberOfPages(863) to be 87', () => {
    expect(getNumberOfPages(863)).toBe(87) // the final page will have 3 results(users)
  })

  test('getNumberOfPages fn. Expect getNumberOfPages(10) to be 1', () => {
    expect(getNumberOfPages(10)).toBe(1) // one page is the minimum
  })

  test('getNumberOfPages fn. Expect getNumberOfPages(8) to be 1', () => {
    expect(getNumberOfPages(8)).toBe(1) // one page is the minimum
  })
})

// testing isSequence
describe('testing isSequence function', () => {
  test('isSequence fn. Expect isSequence([1, 2, 3, 4, 5]) to be an empty array', () => {
    expect(isSequence([1, 2, 3, 4, 5])).toEqual([])
  })

  test('isSequence fn. Expect isSequence([1, 2, 3, 4, 5, 99, 100]) to be an array of 1 element with index 4', () => {
    expect(isSequence([1, 2, 3, 4, 5, 99, 100])).toEqual([4])
  })

  test('isSequence fn. Expect isSequence([1, 2, 8, 9, 10, 11, 12, 99, 100]) to be an array of 2 elements with indexes 1 and 6', () => {
    expect(isSequence([1, 2, 8, 9, 10, 11, 12, 99, 100])).toEqual([1, 6])
  })
})

// testing calcNoOfPages
describe('testing calcNoOfPages(totalUsers, currentPage, windowWidth) function', () => {
  describe('testing calcNoOfPages function with 1 - 10 users(no pagination expected)', () => {
    test('with totalUser = 1, currentPage = 1 and any windowWidth to equal an empty array', () => {
      expect(calcNoOfPages(1, 1, 1000)).toEqual([])
    })

    test('with totalUser = 10, currentPage = 1 and any windowWidth to equal an empty array', () => {
      expect(calcNoOfPages(10, 1, 300)).toEqual([])
    })
  })

  describe('testing calcNoOfPages function with 30 users = 3 pages (pagination expected)', () => {
    test('with totalUser = 30, currentPage = 1 and windowWidth any should equal the array [1, 2, 3]', () => {
      expect(calcNoOfPages(30, 1, 300)).toEqual([1, 2, 3])
    })
  })

  describe('testing calcNoOfPages function with 100 users = 10 pages (pagination expected)', () => {
    test('with totalUser = 100, currentPage = 1 and any windowWidth to equal an array [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]', () => {
      expect(calcNoOfPages(100, 1, 300)).toEqual([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      ])
    })
  })

  describe('testing with 110 users = 11 pages, currentPage = 1 and 700px window width', () => {
    test('with totalUser = 110, currentPage = 1 and windowWidth = 700px to equal an array [1, 2, 3, 4, 5, 11]', () => {
      expect(calcNoOfPages(110, 1, 700)).toEqual([1, 2, 3, 4, 5, 11])
    })

    test('with totalUser = 110, currentPage = 2 and windowWidth = 700px to equal an array [1, 2, 3, 4, 5, 11]', () => {
      expect(calcNoOfPages(110, 2, 700)).toEqual([1, 2, 3, 4, 5, 11])
    })

    test('with totalUser = 110, currentPage = 3 and windowWidth = 700px to equal an array [1, 2, 3, 4, 5, 11]', () => {
      expect(calcNoOfPages(110, 3, 700)).toEqual([1, 2, 3, 4, 5, 11])
    })

    test('with totalUser = 110, currentPage = 11 and windowWidth = 700px to equal an array [1, 7, 8, 9, 10, 11]', () => {
      expect(calcNoOfPages(110, 11, 700)).toEqual([1, 7, 8, 9, 10, 11])
    })

    test('with totalUser = 110, currentPage = 5 and windowWidth = 700px to equal an array [1, 4, 5, 6, 11]', () => {
      expect(calcNoOfPages(110, 5, 700)).toEqual([1, 4, 5, 6, 11])
    })
  })

  describe('Testing the first and last 6 pages with 740 users = 74 pages, with windowWidth = 736px', () => {
    // First 6 pages
    test('with totalUser = 740, currentPage = 1 and windowWidth = 736px to equal an array [1, 2, 3, 4, 5, 74]', () => {
      expect(calcNoOfPages(740, 1, 736)).toEqual([1, 2, 3, 4, 5, 74]) // 6 pages
    })

    test('with totalUser = 740, currentPage = 2 and windowWidth = 736px to equal an array [1, 2, 3, 4, 5, 74]', () => {
      expect(calcNoOfPages(740, 2, 736)).toEqual([1, 2, 3, 4, 5, 74]) // 6 pages
    })

    test('with totalUser = 740, currentPage = 3 and windowWidth = 736px to equal an array [1, 2, 3, 4, 5, 74]', () => {
      expect(calcNoOfPages(740, 3, 736)).toEqual([1, 2, 3, 4, 5, 74]) // 6 pages
    })

    test('with totalUser = 740, currentPage = 4 and windowWidth = 736px to equal an array [1, 3, 4, 5, 74]', () => {
      expect(calcNoOfPages(740, 4, 736)).toEqual([1, 3, 4, 5, 74]) // 5 pages
    })

    test('with totalUser = 740, currentPage = 5 and windowWidth = 736px to equal an array [1, 4, 5, 6, 74]', () => {
      expect(calcNoOfPages(740, 5, 736)).toEqual([1, 4, 5, 6, 74]) // 5 pages
    })

    test('with totalUser = 740, currentPage = 6 and windowWidth = 736px to equal an array [1, 5, 6, 7, 74]', () => {
      expect(calcNoOfPages(740, 6, 736)).toEqual([1, 5, 6, 7, 74]) // 5 pages
    })

    // Last 6 pages starting from the end (74)
    test('with totalUser = 740, currentPage = 74 and windowWidth = 736px to equal an array [1, 70, 71, 72, 73, 74]', () => {
      expect(calcNoOfPages(740, 74, 736)).toEqual([1, 70, 71, 72, 73, 74]) // 6 pages
    })

    test('with totalUser = 740, currentPage = 73 and windowWidth = 736px to equal an array [1, 70, 71, 72, 73, 74]', () => {
      expect(calcNoOfPages(740, 73, 736)).toEqual([1, 70, 71, 72, 73, 74]) // 6 pages
    })

    test('with totalUser = 740, currentPage = 72 and windowWidth = 736px to equal an array [1, 70, 71, 72, 73, 74]', () => {
      expect(calcNoOfPages(740, 72, 736)).toEqual([1, 70, 71, 72, 73, 74]) // 6 pages
    })

    test('with totalUser = 740, currentPage = 71 and windowWidth = 736px to equal an array [1, 70, 71, 72, 74]', () => {
      expect(calcNoOfPages(740, 71, 736)).toEqual([1, 70, 71, 72, 74]) // 5 pages
    })

    test('with totalUser = 740, currentPage = 70 and windowWidth = 736px to equal an array [1, 69, 70, 71, 74]', () => {
      expect(calcNoOfPages(740, 70, 736)).toEqual([1, 69, 70, 71, 74]) // 5 pages
    })

    test('with totalUser = 740, currentPage = 69 and windowWidth = 736px to equal an array [1, 68, 69, 70, 74]', () => {
      expect(calcNoOfPages(740, 69, 736)).toEqual([1, 68, 69, 70, 74]) // 5 pages
    })
  })

  describe('TTesting the first and last 8 pages with 740 users = 74 pages, with windowWidth = 1200px', () => {
    // First 8 pages
    test('with totalUser = 740, currentPage = 1 and windowWidth = 1200px to equal an array [1, 2, 3, 4, 5, 73, 74]', () => {
      expect(calcNoOfPages(740, 1, 1200)).toEqual([1, 2, 3, 4, 5, 73, 74]) // 7 pages
    })

    test('with totalUser = 740, currentPage = 2 and windowWidth = 1200px to equal an array [1, 2, 3, 4, 5, 73, 74]', () => {
      expect(calcNoOfPages(740, 2, 1200)).toEqual([1, 2, 3, 4, 5, 73, 74]) // 7 pages
    })

    test('with totalUser = 740, currentPage = 3 and windowWidth = 1200px to equal an array [1, 2, 3, 4, 5, 73, 74]', () => {
      expect(calcNoOfPages(740, 3, 1200)).toEqual([1, 2, 3, 4, 5, 73, 74]) // 7 pages
    })

    test('with totalUser = 740, currentPage = 4 and windowWidth = 1200px to equal an array [1, 2, 3, 4, 5, 6, 73, 74]', () => {
      expect(calcNoOfPages(740, 4, 1200)).toEqual([1, 2, 3, 4, 5, 6, 73, 74]) // 8 pages
    })

    test('with totalUser = 740, currentPage = 5 and windowWidth = 1200px to equal an array [1, 2, 3, 4, 5, 6, 7, 73, 74]', () => {
      expect(calcNoOfPages(740, 5, 1200)).toEqual([1, 2, 3, 4, 5, 6, 7, 73, 74]) // 9 pages
    })

    test('with totalUser = 740, currentPage = 6 and windowWidth = 1200px to equal an array [1, 2, 3, 4, 5, 6, 7, 8, 73, 74]', () => {
      expect(calcNoOfPages(740, 6, 1200)).toEqual([
        1, 2, 3, 4, 5, 6, 7, 8, 73, 74,
      ]) // 10 pages
    })

    test('with totalUser = 740, currentPage = 7 and windowWidth = 1200px to equal an array [1, 2, 5, 6, 7, 8, 9, 73, 74]', () => {
      expect(calcNoOfPages(740, 7, 1200)).toEqual([1, 2, 5, 6, 7, 8, 9, 73, 74]) // 9 pages
    })

    test('with totalUser = 740, currentPage = 8 and windowWidth = 1200px to equal an array [1, 2, 6, 7, 8, 9, 10, 73, 74]', () => {
      expect(calcNoOfPages(740, 8, 1200)).toEqual([
        1, 2, 6, 7, 8, 9, 10, 73, 74,
      ]) // 9 pages
    })

    // Last 8 pages starting from the end (74)
    test('with totalUser = 740, currentPage = 74 and windowWidth = 1200px to equal an array [1, 2, 70, 71, 72, 73, 74]', () => {
      expect(calcNoOfPages(740, 74, 1200)).toEqual([1, 2, 70, 71, 72, 73, 74]) // 7 pages
    })

    test('with totalUser = 740, currentPage = 73 and windowWidth = 1200px to equal an array [1, 2, 70, 71, 72, 73, 74]', () => {
      expect(calcNoOfPages(740, 73, 1200)).toEqual([1, 2, 70, 71, 72, 73, 74]) // 7 pages
    })

    test('with totalUser = 740, currentPage = 72 and windowWidth = 1200px to equal an array [1, 2, 70, 71, 72, 73, 74]', () => {
      expect(calcNoOfPages(740, 72, 1200)).toEqual([1, 2, 70, 71, 72, 73, 74]) // 7 pages
    })

    test('with totalUser = 740, currentPage = 71 and windowWidth = 1200px to equal an array [1, 2, 69, 70, 71, 72, 73, 74]', () => {
      expect(calcNoOfPages(740, 71, 1200)).toEqual([
        1, 2, 69, 70, 71, 72, 73, 74,
      ]) // 8 pages
    })

    test('with totalUser = 740, currentPage = 70 and windowWidth = 1200px to equal an array [1, 2, 68, 69, 70, 71, 72, 73, 74]', () => {
      expect(calcNoOfPages(740, 70, 1200)).toEqual([
        1, 2, 68, 69, 70, 71, 72, 73, 74,
      ]) // 9 pages
    })

    test('with totalUser = 740, currentPage = 69 and windowWidth = 1200px to equal an array [1, 2, 67, 68, 69, 70, 71, 72, 73, 74]', () => {
      expect(calcNoOfPages(740, 69, 1200)).toEqual([
        1, 2, 67, 68, 69, 70, 71, 72, 73, 74,
      ]) // 10 pages
    })

    test('with totalUser = 740, currentPage = 68 and windowWidth = 1200px to equal an array [1, 2, 66, 67, 68, 69, 70, 73, 74,]', () => {
      expect(calcNoOfPages(740, 68, 1200)).toEqual([
        1, 2, 66, 67, 68, 69, 70, 73, 74,
      ]) // 9 pages
    })

    test('with totalUser = 740, currentPage = 67 and windowWidth = 1200px to equal an array [1, 2, 65, 66, 67, 68, 69, 73, 74,]', () => {
      expect(calcNoOfPages(740, 67, 1200)).toEqual([
        1, 2, 65, 66, 67, 68, 69, 73, 74,
      ]) // 9 pages
    })
  })
}) // END testing calcNoOfPages

// Testing createNewPagesArray fn
describe('Testing createNewPagesArray(noOfPagesArray, indexesArray) fn', () => {
  test('with noOfPagesArray = [1, 2, 65, 66, 67, 68, 69, 73, 74], and indexesArray [1] to equal an array [1, 2, -1, 65, 66, 67, 68, 69, -1, 73, 74,]', () => {
    expect(
      createNewPagesArray([1, 2, 65, 66, 67, 68, 69, 73, 74], [1, 6])
    ).toEqual([1, 2, -1, 65, 66, 67, 68, 69, -1, 73, 74])
  })

  test('with noOfPagesArray = [1, 2, 9, 10, 11, 12, 13, 73, 74], and indexesArray [1, 6] to equal an array [1, 2, -1, 9, 10, 11, 12, 13, -1, 73, 74]', () => {
    expect(
      createNewPagesArray([1, 2, 9, 10, 11, 12, 13, 73, 74], [1, 6])
    ).toEqual([1, 2, -1, 9, 10, 11, 12, 13, -1, 73, 74])
  })

  test('with noOfPagesArray = [1, 2, 5, 6, 7, 8, 9, 73, 74], and indexesArray [6] to equal an array [1, 2, 5, 6, 7, 8, 9, -1, 73, 74]', () => {
    expect(createNewPagesArray([1, 2, 5, 6, 7, 8, 9, 73, 74], [6])).toEqual([
      1, 2, 5, 6, 7, 8, 9, -1, 73, 74,
    ])
  })

  test('with noOfPagesArray = [1, 2, 69, 70, 71, 72, 73, 74], and indexesArray [1] to equal an array [1, 2, -1, 65, 66, 67, 68, 69, 73, 74,]', () => {
    expect(createNewPagesArray([1, 2, 69, 70, 71, 72, 73, 74], [1])).toEqual([
      1, 2, -1, 69, 70, 71, 72, 73, 74,
    ])
  })
})
