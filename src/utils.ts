// get an array of numbers of a specific range form - to inclusive
function range(from: number, to: number): number[] | [] {
  const range_array = []
  for (let i = from; i <= to; i++) {
    range_array.push(i)
  }
  return range_array
}

/**
 * This is an efford to emulate the pagination logic of github search results.
 * For large screens
 * Pagination visual analysis -> Use Cases:
 * Start (first loaded page: < Previous btn inactive, 7 number elements and the (gap) ... 8 total)
 * < Previous 1 2 3 4 5 ... 99 100 Next >
 * Pressing btn 2 (same as above)
 * < Previous 1 2 3 4 5 ... 99 100 Next >
 * Pressing btn 3 (same as above)
 * < Previous 1 2 3 4 5 ... 99 100 Next >
 * Pressing btn 4 (number 6 btn added, 8 number elements and the ... 9 total)
 * < Previous 1 2 3 4 5 6 ... 99 100 Next > 
 * Pressing btn 5 (number 7 btn added, 9 number elements and the ... 10 total)
 * < Previous 1 2 3 4 5 6 7 ... 99 100 Next >
 * Pressing btn 6 (number 8 btn added, 10 number elements and the ... 11 total)
 * < Previous 1 2 3 4 5 6 7 8 ... 99 100 Next >
 * Pressing btn 7 (number 3 and 4 removed and ... added in place, btn 9 added, 9 number elements and the 2 ... elements 11 total)
 * < Previous 1 2 ... 5 6 7 8 9 ... 99 100 Next >
 * Pressing btn 8 (number 5 removed and ... added in place, btn 10 added, 9 number elements and the 2 ... elements 11 total)
 * < Previous 1 2 ... 6 7 8 9 10 ... 99 100 Next >
 * Pressing btn 9 (number 6 removed and ... added in place, btn 11 added, 9 number elements and the 2 ... elements 11 total)
 * < Previous 1 2 ... 7 8 9 10 11 ... 99 100 Next >
 * Pressing btn 10 (number 7 removed and ... added in place, btn 12 added, 9 number elements and the 2 ... elements 11 total)
 * < Previous 1 2 ... 8 9 10 11 12 ... 99 100 Next >
 * //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 * END of paggination
 * Pressing btn 90 (Start)
 * < Previous 1 2 ... 88 89 90 91 92 ... 99 100 Next >
 * Pressing btn 91 (number 88 removed, btn 93 added, 9 number elements and the 2 ... elements 11 total)
 * < Previous 1 2 ... 89 90 91 92 93 ... 99 100 Next >
 * Pressing btn 92 (number 89 removed, btn 94 added, 9 number elements and the 2 ... elements 11 total)
 * < Previous 1 2 ... 90 91 92 93 94 ... 99 100 Next >
 * Pressing btn 93 (number 90 removed, btn 95 added, 9 number elements and the 2 ... elements 11 total)
 * < Previous 1 2 ... 91 92 93 94 95 ... 99 100 Next >
 * Pressing btn 94 (number 91 removed, btn 96 added, 9 number elements and the 2 ... elements 11 total)
 * < Previous 1 2 ... 92 93 94 95 96 ... 99 100 Next >
 * Pressing btn 95 (number 92 removed and the last gap (the one before the 99, 100), 
 * number 97 and 98 btns added, 10 number elements and the ... 11 total)
 * < Previous 1 2 ... 93 94 95 96 97 98 99 100 Next >
 * Pressing btn 96 (number 93 removed, 9 number elements and the ... 10 total)
 * < Previous 1 2 ... 94 95 96 97 98 99 100 Next >
 * Pressing btn 97 (number 94 removed, 8 number elements and the ... 9 total)
 * < Previous 1 2 ... 95 96 97 98 99 100 Next >
 * Pressing btn 98 (number 95 removed, 7 number elements and the ... 8 total)
 * < Previous 1 2 ... 96 97 98 99 100 Next >
 * Pressing btn 99 (same as above)
 * < Previous 1 2 ... 96 97 98 99 100 Next >
 * Pressing btn 100 (same as above, Next btn inactive) // end of list 
 * < Previous 1 2 ... 96 97 98 99 100 Next >
 * Pagination logic for large screens: 
 * The minimum number of elements are 8 and the maximum are 11 which is the usuall.
 * Condition 1) I always have the first two (1, 2) and the last two (99, 100) digits no matter what.
 * Condition 2) I need to have at least 5 digits grouped together, and one or two 2-digit groups(1st and last).
 * Condition 3) I always need two digits before and two digits after the currently selected number(page).
                This is not true in the cases where the 1st or the 2nd and the 1 before last and last elements are selected.
 * Pagination logic for medium screens (795 - 590): 
 * The minimum number of elements are 8 and the maximum are 11 which is the usuall.
 * Condition 1) I always have the first (1) and the last (100) digits no matter what.
 * Condition 2) I need to have at least 3 digits grouped together, and one or two 2-digit groups(1st and last).
 * Condition 3) I always need 1 digits before and 1 digits after the currently selected number(page).
                This is not true in the cases where the 1st or the 2nd and the 1 before last and last elements are selected.
 * Pagination logic for changes to an input field - but we still need the functions below for other calculations in <Pagination />.
*/

// This function will return and array of numbers that will represent the page numbers or empty array
function calcNoOfPages(
  total_users: number,
  current_page: number,
  window_width: number
): number[] | [] {
  let num_of_pages = 0

  if (total_users >= 1000) {
    num_of_pages = 100 // 100 is the maximum
  } else {
    num_of_pages = Math.ceil(total_users / 10) // e.g 853 = 86 pages // 10 users 10 / 10 = 1 // 8 users 8 / 10 = 1 page // one page is the minimum
  }

  // console.log('num_of_pages start', num_of_pages)
  // if window width is less than 570px we hide the ul element and we show the pagination buttons and input field

  // TODO: DRY
  // if window is between 794 and 570px
  if (window_width >= 590 && window_width < 795) {
    if (num_of_pages === 1) {
      return [] /* empty array -. nothing will be rendered (null) since the condition is the array to have length > 0 */
    } else if (num_of_pages <= 10) {
      return range(1, num_of_pages)
    } else {
      const first_page = 1
      const last_page = num_of_pages

      if (current_page <= 3) {
        return [first_page, ...range(2, 5), last_page]
      }

      if (current_page > num_of_pages - 3) {
        return [first_page, ...range(96, 99), last_page]
      }

      // Covering all other cases
      if (current_page > 3) {
        return Array.from(
          new Set([
            first_page,
            ...range(current_page - 1, current_page + 1),
            last_page,
          ])
        )
      }
    }
  }

  // if num of pages === 1 do not show any page numbers,
  if (num_of_pages === 1) {
    return [] /* empty array -. nothing will be rendered (null) since the condition is the array to have length > 0 */
  } else if (num_of_pages <= 10) {
    return range(1, num_of_pages)
  } else {
    // get pagesNum and get the first two and the last two numbers
    const first_pages = [1, 2]
    const last_pages = [num_of_pages - 1, num_of_pages]
    // calculate the rest of the display elements
    // Covering use cases: btn press 1, 2, 3
    if (current_page <= 3) {
      return [...first_pages, ...range(3, 5), ...last_pages]
    }
    // Covering use cases: btn press 98, 99, 100
    if (current_page > num_of_pages - 3) {
      return [...first_pages, ...range(96, 98), ...last_pages]
    }

    // Covering use cases: btn press 4, 5, 6
    if (current_page <= 6) {
      return Array.from(
        new Set([...first_pages, ...range(3, current_page + 2), ...last_pages])
      )
    }

    // Covering use cases: btn press 95, 96, 97
    if (current_page > num_of_pages - 6) {
      return Array.from(
        new Set([...first_pages, ...range(current_page - 2, 98), ...last_pages])
      )
    }

    // Covering all other cases
    if (current_page > 6) {
      return Array.from(
        new Set([
          ...first_pages,
          ...range(current_page - 2, current_page + 2),
          ...last_pages,
        ])
      )
    }

    return [] // to satisfy typescript
  }
}

/**
 * isSequence returns an empty array if the array numbers are in a sequence
 * and an array of index(es) if the array numbers are not in a sequence
 * it will contain either one or two maximum index(es)
 * @param {Array} array_of_numbers
 */
function isSequence(sequence_array: number[]): number[] | [] {
  const index_array = []
  const prevValue = sequence_array[0]
  for (let i = 0; i < sequence_array.length - 1; i++) {
    if (prevValue + sequence_array[i] === sequence_array[i + 1]) {
      continue
    } else index_array.push(i)
  }
  return index_array
}

function createNewPagesArray(
  no_of_pages_array: number[] | [],
  indexes_array: number[] | []
): number[] | [] {
  // I put an arbitrary value (-1) in the array as a flag to indicate
  // that a gap (...) should be added instead of the number.
  const [first_value, second_value] = indexes_array
  const result_array = []
  for (let i = 0; i < no_of_pages_array.length; i++) {
    if (i === first_value || i === second_value) {
      result_array.push(no_of_pages_array[i])
      result_array.push(-1)
    } else result_array.push(no_of_pages_array[i])
  }
  return result_array
}

export { calcNoOfPages, isSequence, createNewPagesArray }
